"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trash2, Plus, Wifi, WifiOff, RefreshCw, X, Settings2,
  MapPin, Mail, Crown, Globe, ChevronDown, ChevronUp, RotateCcw, Clock,
} from "lucide-react";

interface Account {
  id: string;
  name: string;
  avatarUrl: string | null;
  headline: string | null;
  email: string | null;
  location: string | null;
  linkedinPublicId: string | null;
  premium: boolean;
  proxyCountry: string | null;
  status: string;
  connSentToday: number;
  dailyConnLimit: number;
  msgSentToday: number;
  dailyMsgLimit: number;
  timezone: string;
  sendWindowStart: number;
  sendWindowEnd: number;
  sendIntervalMinutes: number;
  sendJitterMinutes: number;
  lastSyncAt: string | null;
  createdAt: string;
  unipileAccountId: string;
}

type ConnectStep = "credentials" | "otp" | "done";
type ReconnectStep = "credentials" | "otp" | "done";

interface ConnectState {
  step: ConnectStep;
  email: string;
  password: string;
  otp: string;
  unipileAccountId: string;
  message: string;
  loading: boolean;
  error: string | null;
}

interface ReconnectState {
  accountId: string;
  step: ReconnectStep;
  email: string;
  password: string;
  otp: string;
  unipileAccountId: string;
  message: string;
  loading: boolean;
  error: string | null;
}

interface SettingsState {
  accountId: string;
  premium: boolean;
  connLimit: number;
  msgLimit: number;
  timezone: string;
  windowStart: number;
  windowEnd: number;
  intervalMinutes: number;
  jitterMinutes: number;
  loading: boolean;
}

const isDisconnected = (status: string) => status === "DISCONNECTED" || status === "RECONNECTING";

function statusColor(status: string) {
  if (status === "ACTIVE") return "#22c55e";
  if (status === "RECONNECTING") return "#f59e0b";
  return "#ef4444";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "ACTIVE") return <Wifi size={10} className="mr-1 inline" />;
  if (status === "RECONNECTING") return <RefreshCw size={10} className="mr-1 inline animate-spin" />;
  return <WifiOff size={10} className="mr-1 inline" />;
}

const CACHE_KEY = "sp_accounts_v1";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [connect, setConnect] = useState<ConnectState | null>(null);
  const [reconnect, setReconnect] = useState<ReconnectState | null>(null);
  const [settings, setSettings] = useState<SettingsState | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  async function load() {
    const res = await fetch("/api/accounts");
    if (!res.ok) return;
    const data: Account[] = await res.json();
    setAccounts(data);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
  }

  async function syncAccounts() {
    setSyncing(true);
    await fetch("/api/accounts/sync", { method: "POST" });
    await load();
    setSyncing(false);
  }

  useEffect(() => {
    // 1. Show cached accounts instantly (zero latency)
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setAccounts(JSON.parse(cached));
    } catch {}
    // 2. Load fresh from DB immediately (fast — just a DB query)
    // 3. Then sync with Unipile in background (detects disconnections, refreshes pictures)
    load().then(() => syncAccounts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleExpanded(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Connect flow ──────────────────────────────────────────────────────────

  function openConnect() {
    setConnect({ step: "credentials", email: "", password: "", otp: "", unipileAccountId: "", message: "", loading: false, error: null });
  }

  async function handleConnect() {
    if (!connect) return;
    setConnect(c => c && { ...c, loading: true, error: null });
    const res = await fetch("/api/accounts/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: connect.email, password: connect.password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setConnect(c => c && { ...c, loading: false, error: data.error ?? "Connection failed" });
      return;
    }
    if (data.checkpoint) {
      setConnect(c => c && { ...c, loading: false, step: "otp", unipileAccountId: data.account_id, message: data.message });
      return;
    }
    setConnect(c => c && { ...c, loading: false, step: "done" });
    syncAccounts();
  }

  async function handleConnectOtp() {
    if (!connect) return;
    setConnect(c => c && { ...c, loading: true, error: null });
    const res = await fetch("/api/accounts/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: connect.unipileAccountId, code: connect.otp }),
    });
    const data = await res.json();
    if (!res.ok) {
      setConnect(c => c && { ...c, loading: false, error: data.error ?? "Invalid code" });
      return;
    }
    if (data.checkpoint) {
      setConnect(c => c && { ...c, loading: false, otp: "", message: data.message });
      return;
    }
    setConnect(c => c && { ...c, loading: false, step: "done" });
    syncAccounts();
  }

  async function handleConnectResend() {
    if (!connect) return;
    await fetch("/api/accounts/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: connect.unipileAccountId }),
    });
  }

  // ── Reconnect flow ────────────────────────────────────────────────────────

  function openReconnect(acc: Account) {
    setReconnect({ accountId: acc.id, step: "credentials", email: "", password: "", otp: "", unipileAccountId: acc.unipileAccountId, message: "", loading: false, error: null });
  }

  async function handleReconnect() {
    if (!reconnect) return;
    setReconnect(r => r && { ...r, loading: true, error: null });
    const res = await fetch(`/api/accounts/${reconnect.accountId}/reconnect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: reconnect.email, password: reconnect.password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setReconnect(r => r && { ...r, loading: false, error: data.error ?? "Reconnect failed" });
      return;
    }
    if (data.checkpoint) {
      setReconnect(r => r && { ...r, loading: false, step: "otp", unipileAccountId: data.account_id, message: data.message });
      return;
    }
    setReconnect(r => r && { ...r, loading: false, step: "done" });
    syncAccounts();
  }

  async function handleReconnectOtp() {
    if (!reconnect) return;
    setReconnect(r => r && { ...r, loading: true, error: null });
    const res = await fetch(`/api/accounts/${reconnect.accountId}/reconnect-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: reconnect.unipileAccountId, code: reconnect.otp }),
    });
    const data = await res.json();
    if (!res.ok) {
      setReconnect(r => r && { ...r, loading: false, error: data.error ?? "Invalid code" });
      return;
    }
    if (data.checkpoint) {
      setReconnect(r => r && { ...r, loading: false, otp: "", message: data.message });
      return;
    }
    setReconnect(r => r && { ...r, loading: false, step: "done" });
    syncAccounts();
  }

  async function handleReconnectResend() {
    if (!reconnect) return;
    await fetch("/api/accounts/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: reconnect.unipileAccountId }),
    });
  }

  // ── Settings ──────────────────────────────────────────────────────────────

  function openSettings(acc: Account) {
    setSettings({
      accountId: acc.id,
      premium: acc.premium,
      connLimit: acc.dailyConnLimit,
      msgLimit: acc.dailyMsgLimit,
      timezone: acc.timezone,
      windowStart: acc.sendWindowStart,
      windowEnd: acc.sendWindowEnd,
      intervalMinutes: acc.sendIntervalMinutes,
      jitterMinutes: acc.sendJitterMinutes,
      loading: false,
    });
  }

  async function saveSettings() {
    if (!settings) return;
    setSettings(s => s && { ...s, loading: true });
    await fetch(`/api/accounts/${settings.accountId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dailyConnLimit: settings.connLimit,
        dailyMsgLimit: settings.msgLimit,
        timezone: settings.timezone,
        sendWindowStart: settings.windowStart,
        sendWindowEnd: settings.windowEnd,
        sendIntervalMinutes: settings.intervalMinutes,
        sendJitterMinutes: settings.jitterMinutes,
      }),
    });
    setSettings(null);
    load();
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    if (!confirm("Remove this LinkedIn account?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    load();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  function fmtDate(iso: string | null) {
    if (!iso) return "Never";
    return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
  }

  function linkedinUrl(publicId: string) {
    return `https://linkedin.com/in/${publicId}`;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>LinkedIn Accounts</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={syncAccounts}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", background: "var(--bg-base)" }}
            title="Sync with Unipile">
            <RotateCcw size={14} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing…" : "Sync"}
          </button>
          <button
            onClick={openConnect}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}>
            <Plus size={16} />Connect account
          </button>
        </div>
      </div>

      {/* Connect account inline panel */}
      {connect && (
        <div className="rounded-xl border mb-4 p-5"
          style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {connect.step === "otp" ? "Verification required" : connect.step === "done" ? "Connected!" : "Connect LinkedIn account"}
            </p>
            <button onClick={() => setConnect(null)} style={{ color: "var(--text-muted)" }}><X size={16} /></button>
          </div>

          {connect.step === "done" && (
            <p className="text-sm text-green-600 font-medium">Account connected successfully.</p>
          )}

          {connect.step === "credentials" && (
            <div className="space-y-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Your credentials are sent securely to Unipile — we never store them.
              </p>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="email"
                  placeholder="LinkedIn email"
                  value={connect.email}
                  onChange={e => setConnect(c => c && { ...c, email: e.target.value })}
                  className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={connect.password}
                  onChange={e => setConnect(c => c && { ...c, password: e.target.value })}
                  className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                  autoComplete="current-password"
                />
                <button
                  onClick={handleConnect}
                  disabled={connect.loading || !connect.email || !connect.password}
                  className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ background: "var(--accent)", color: "#fff" }}>
                  {connect.loading ? "Connecting…" : "Connect"}
                </button>
              </div>
              {connect.error && <p className="text-xs text-red-600">{connect.error}</p>}
            </div>
          )}

          {connect.step === "otp" && (
            <div className="space-y-3">
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{connect.message || "Enter the verification code sent by LinkedIn."}</p>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  value={connect.otp}
                  onChange={e => setConnect(c => c && { ...c, otp: e.target.value })}
                  className="flex-1 min-w-[140px] px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                />
                <button
                  onClick={handleConnectOtp}
                  disabled={connect.loading || !connect.otp}
                  className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ background: "var(--accent)", color: "#fff" }}>
                  {connect.loading ? "Verifying…" : "Verify"}
                </button>
                <button
                  onClick={handleConnectResend}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)", background: "var(--bg-base)" }}>
                  Resend code
                </button>
              </div>
              {connect.error && <p className="text-xs text-red-600">{connect.error}</p>}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {accounts.length === 0 && !connect && (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No LinkedIn accounts connected</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Connect your LinkedIn account to start sending outreach.
          </p>
          <button
            onClick={openConnect}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}>
            <Plus size={16} />Connect LinkedIn
          </button>
        </div>
      )}

      {/* Account list */}
      {accounts.length > 0 && (
        <div className="space-y-3">
          {accounts.map(acc => {
            const isExpanded = expanded.has(acc.id);
            const isSettingsOpen = settings?.accountId === acc.id;
            const isReconnectOpen = reconnect?.accountId === acc.id;
            const color = statusColor(acc.status);

            return (
              <div key={acc.id}>
                {/* Main card */}
                <div className="rounded-xl border overflow-hidden"
                  style={{
                    borderColor: isDisconnected(acc.status) ? "#ef4444" : "var(--border)",
                    background: "var(--bg-base)",
                  }}>

                  {/* Disconnection banner */}
                  {isDisconnected(acc.status) && (
                    <div className="flex items-center justify-between px-4 py-2.5"
                      style={{ background: "#ef444415", borderBottom: "1px solid #ef444430" }}>
                      <div className="flex items-center gap-2">
                        <WifiOff size={13} style={{ color: "#ef4444" }} />
                        <span className="text-xs font-medium" style={{ color: "#ef4444" }}>
                          Account disconnected — campaigns are paused until you reconnect.
                        </span>
                      </div>
                      <button
                        onClick={() => isReconnectOpen ? setReconnect(null) : openReconnect(acc)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold shrink-0 ml-4"
                        style={{ background: "#ef4444", color: "#fff" }}>
                        <RefreshCw size={11} />Reconnect
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage src={acc.avatarUrl ?? undefined} />
                      <AvatarFallback style={{ background: "var(--bg-subtle)" }}>
                        {acc.name?.charAt(0) ?? "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                          {acc.name}
                        </span>
                        {acc.premium && (
                          <span title="LinkedIn Premium"><Crown size={12} className="text-yellow-500" /></span>
                        )}
                        <Badge variant="outline" className="text-xs"
                          style={{ borderColor: color, color }}>
                          <StatusIcon status={acc.status} />
                          {acc.status}
                        </Badge>
                      </div>
                      {acc.headline && (
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{acc.headline}</p>
                      )}
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {acc.connSentToday}/{acc.dailyConnLimit} connections · {acc.msgSentToday}/{acc.dailyMsgLimit} messages today
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Reconnect button hidden here — shown in the banner above */}
                      <button
                        onClick={() => isSettingsOpen ? setSettings(null) : openSettings(acc)}
                        className="p-2 rounded-md transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="Settings">
                        <Settings2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleExpanded(acc.id)}
                        className="p-2 rounded-md transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="View details">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
                        className="p-2 rounded-md hover:bg-red-50 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="Remove account">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="pt-3 pb-4 px-4 border-t grid grid-cols-2 gap-x-6 gap-y-2"
                      style={{ borderColor: "var(--border)" }}>
                      {acc.email && (
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <Mail size={12} className="shrink-0" />
                          <span className="truncate">{acc.email}</span>
                        </div>
                      )}
                      {acc.location && (
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate">{acc.location}</span>
                        </div>
                      )}
                      {acc.proxyCountry && (
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <Globe size={12} className="shrink-0" />
                          <span>Proxy: {acc.proxyCountry}</span>
                        </div>
                      )}
                      {acc.linkedinPublicId && (
                        <div className="flex items-center gap-2 text-xs">
                          <a
                            href={linkedinUrl(acc.linkedinPublicId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate underline"
                            style={{ color: "var(--accent)" }}>
                            View LinkedIn profile
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Clock size={12} className="shrink-0" />
                        <span>Last sync: {fmtDate(acc.lastSyncAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Clock size={12} className="shrink-0" />
                        <span>Added: {fmtDate(acc.createdAt)}</span>
                      </div>
                      <div className="col-span-2 text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
                        ID: {acc.unipileAccountId}
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings panel */}
                {isSettingsOpen && settings && (
                  <div className="rounded-xl border mt-1 p-4"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Account settings</p>
                      <button onClick={() => setSettings(null)} style={{ color: "var(--text-muted)" }}><X size={14} /></button>
                    </div>

                    {/* Premium protection banner */}
                    <div className="mb-4 px-3 py-2 rounded-lg text-xs"
                      style={{ background: settings.premium ? "#fef9c3" : "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                      {settings.premium
                        ? "LinkedIn Premium detected — safe limits applied to protect your account."
                        : "Free LinkedIn account — conservative limits applied to protect your account."}
                    </div>

                    <div className="space-y-5">
                      {/* Daily limits */}
                      <div>
                        <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Daily limits</p>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Connection requests</label>
                              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.connLimit}/day</span>
                            </div>
                            <input
                              type="range" min={1} max={settings.premium ? 80 : 25} value={settings.connLimit}
                              onChange={e => setSettings(s => s && { ...s, connLimit: Number(e.target.value) })}
                              className="w-full"
                            />
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {settings.premium ? "Safe zone: 40–50/day · Max: 80" : "Safe zone: 10–15/day · Max: 25"}
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Messages</label>
                              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.msgLimit}/day</span>
                            </div>
                            <input
                              type="range" min={1} max={settings.premium ? 200 : 75} value={settings.msgLimit}
                              onChange={e => setSettings(s => s && { ...s, msgLimit: Number(e.target.value) })}
                              className="w-full"
                            />
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {settings.premium ? "Safe zone: 100–150/day · Max: 200" : "Safe zone: 30–50/day · Max: 75"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Scheduling */}
                      <div>
                        <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Send schedule</p>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Timezone</label>
                            <select
                              value={settings.timezone}
                              onChange={e => setSettings(s => s && { ...s, timezone: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border text-sm"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
                              <optgroup label="Europe">
                                <option value="Europe/London">London (GMT/BST)</option>
                                <option value="Europe/Paris">Paris (CET/CEST)</option>
                                <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                                <option value="Europe/Amsterdam">Amsterdam (CET/CEST)</option>
                                <option value="Europe/Stockholm">Stockholm (CET/CEST)</option>
                                <option value="Europe/Zurich">Zurich (CET/CEST)</option>
                                <option value="Europe/Madrid">Madrid (CET/CEST)</option>
                                <option value="Europe/Warsaw">Warsaw (CET/CEST)</option>
                              </optgroup>
                              <optgroup label="Americas">
                                <option value="America/New_York">New York (ET)</option>
                                <option value="America/Chicago">Chicago (CT)</option>
                                <option value="America/Denver">Denver (MT)</option>
                                <option value="America/Los_Angeles">Los Angeles (PT)</option>
                                <option value="America/Toronto">Toronto (ET)</option>
                                <option value="America/Vancouver">Vancouver (PT)</option>
                                <option value="America/Sao_Paulo">São Paulo (BRT)</option>
                              </optgroup>
                              <optgroup label="Asia / Pacific">
                                <option value="Asia/Dubai">Dubai (GST)</option>
                                <option value="Asia/Kolkata">Mumbai/Delhi (IST)</option>
                                <option value="Asia/Singapore">Singapore (SGT)</option>
                                <option value="Asia/Tokyo">Tokyo (JST)</option>
                                <option value="Asia/Seoul">Seoul (KST)</option>
                                <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                              </optgroup>
                            </select>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-1">
                              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Window opens</label>
                              <select
                                value={settings.windowStart}
                                onChange={e => setSettings(s => s && { ...s, windowStart: Number(e.target.value) })}
                                className="w-full px-3 py-2 rounded-lg border text-sm"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
                                {Array.from({ length: 18 }, (_, i) => i + 5).map(h => (
                                  <option key={h} value={h}>{h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex-1">
                              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Window closes</label>
                              <select
                                value={settings.windowEnd}
                                onChange={e => setSettings(s => s && { ...s, windowEnd: Number(e.target.value) })}
                                className="w-full px-3 py-2 rounded-lg border text-sm"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
                                {Array.from({ length: 18 }, (_, i) => i + 6).map(h => (
                                  <option key={h} value={h}>{h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Min gap between sends</label>
                              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.intervalMinutes} min</span>
                            </div>
                            <input
                              type="range" min={5} max={120} step={5} value={settings.intervalMinutes}
                              onChange={e => setSettings(s => s && { ...s, intervalMinutes: Number(e.target.value) })}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Random jitter</label>
                              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>+ up to {settings.jitterMinutes} min</span>
                            </div>
                            <input
                              type="range" min={0} max={30} step={1} value={settings.jitterMinutes}
                              onChange={e => setSettings(s => s && { ...s, jitterMinutes: Number(e.target.value) })}
                              className="w-full"
                            />
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                              Sends spaced {settings.intervalMinutes}–{settings.intervalMinutes + settings.jitterMinutes} min apart
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={saveSettings}
                      disabled={settings.loading}
                      className="mt-5 px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
                      style={{ background: "var(--accent)", color: "#fff" }}>
                      {settings.loading ? "Saving…" : "Save settings"}
                    </button>
                  </div>
                )}

                {/* Reconnect panel */}
                {isReconnectOpen && reconnect && (
                  <div className="rounded-xl border mt-1 p-4"
                    style={{ borderColor: "#ef4444", background: "#ef444408" }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                        {reconnect.step === "otp" ? "Verification required" : "Re-enter LinkedIn credentials"}
                      </p>
                      <button onClick={() => setReconnect(null)} style={{ color: "var(--text-muted)" }}><X size={14} /></button>
                    </div>

                    {reconnect.step === "credentials" && (
                      <div className="flex gap-2 flex-wrap">
                        <input
                          type="email"
                          placeholder="LinkedIn email"
                          value={reconnect.email}
                          onChange={e => setReconnect(r => r && { ...r, email: e.target.value })}
                          className="flex-1 min-w-[180px] px-3 py-1.5 rounded-lg border text-sm"
                          style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={reconnect.password}
                          onChange={e => setReconnect(r => r && { ...r, password: e.target.value })}
                          className="flex-1 min-w-[160px] px-3 py-1.5 rounded-lg border text-sm"
                          style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                        />
                        <button
                          onClick={handleReconnect}
                          disabled={reconnect.loading || !reconnect.email || !reconnect.password}
                          className="px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
                          style={{ background: "#ef4444", color: "#fff" }}>
                          {reconnect.loading ? "Reconnecting…" : "Reconnect"}
                        </button>
                      </div>
                    )}

                    {reconnect.step === "otp" && (
                      <div className="space-y-2">
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {reconnect.message || "Enter the verification code sent by LinkedIn."}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="123456"
                            value={reconnect.otp}
                            onChange={e => setReconnect(r => r && { ...r, otp: e.target.value })}
                            className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg border text-sm"
                            style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
                          />
                          <button
                            onClick={handleReconnectOtp}
                            disabled={reconnect.loading || !reconnect.otp}
                            className="px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
                            style={{ background: "#ef4444", color: "#fff" }}>
                            {reconnect.loading ? "Verifying…" : "Verify"}
                          </button>
                          <button
                            onClick={handleReconnectResend}
                            className="px-3 py-1.5 rounded-lg text-sm"
                            style={{ border: "1px solid #ef444440", color: "#ef4444", background: "transparent" }}>
                            Resend
                          </button>
                        </div>
                      </div>
                    )}

                    {reconnect.error && (
                      <p className="text-xs mt-2 text-red-600">{reconnect.error}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
