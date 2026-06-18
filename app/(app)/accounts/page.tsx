"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Plus, Wifi, WifiOff, RefreshCw, X, Settings2 } from "lucide-react";

interface Account {
  id: string;
  name: string;
  avatarUrl: string | null;
  headline: string | null;
  status: string;
  connSentToday: number;
  dailyConnLimit: number;
  msgSentToday: number;
  dailyMsgLimit: number;
}

interface ReconnectState {
  accountId: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [reconnect, setReconnect] = useState<ReconnectState | null>(null);
  const [editLimitId, setEditLimitId] = useState<string | null>(null);
  const [limitValue, setLimitValue] = useState(20);
  const connectUrl = process.env.NEXT_PUBLIC_CONNECT_URL ?? "http://localhost:3000";

  async function load() {
    const res = await fetch("/api/accounts");
    if (res.ok) setAccounts(await res.json());
  }

  useEffect(() => {
    fetch("/api/accounts/sync", { method: "POST" }).finally(() => load());
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this LinkedIn account?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    load();
  }

  function openReconnect(id: string) {
    setReconnect({ accountId: id, email: "", password: "", loading: false, error: null });
  }

  function openEditLimit(acc: Account) {
    setEditLimitId(acc.id);
    setLimitValue(acc.dailyConnLimit);
  }

  async function saveLimit(id: string) {
    await fetch(`/api/accounts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dailyConnLimit: limitValue }),
    });
    setEditLimitId(null);
    load();
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
    setReconnect(null);
    load();
  }

  const isDisconnected = (status: string) => status === "DISCONNECTED" || status === "RECONNECTING";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>LinkedIn Accounts</h1>
        <a href={`${connectUrl}/connect/linkedin`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "var(--accent)", color: "#fff" }}>
          <Plus size={16} />Connect account
        </a>
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No LinkedIn accounts connected</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Connect your LinkedIn account to start sending outreach.
          </p>
          <a href={`${connectUrl}/connect/linkedin`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Connect LinkedIn
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.id}>
              <div className="rounded-xl border p-4 flex items-center gap-4"
                style={{
                  borderColor: isDisconnected(acc.status) ? "#ef4444" : "var(--border)",
                  background: "var(--bg-base)",
                }}>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={acc.avatarUrl ?? undefined} />
                  <AvatarFallback style={{ background: "var(--bg-subtle)" }}>
                    {acc.name?.charAt(0) ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {acc.name}
                    </span>
                    <Badge variant="outline" className="text-xs"
                      style={{
                        borderColor: acc.status === "ACTIVE" ? "#22c55e" : "#ef4444",
                        color: acc.status === "ACTIVE" ? "#22c55e" : "#ef4444",
                      }}>
                      {acc.status === "ACTIVE"
                        ? <Wifi size={10} className="mr-1 inline" />
                        : <WifiOff size={10} className="mr-1 inline" />}
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
                <div className="flex items-center gap-1">
                  {isDisconnected(acc.status) && (
                    <button
                      onClick={() => reconnect?.accountId === acc.id ? setReconnect(null) : openReconnect(acc.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                      style={{ background: "#ef444420", color: "#ef4444" }}>
                      <RefreshCw size={12} />
                      Reconnect
                    </button>
                  )}
                  <button
                    onClick={() => editLimitId === acc.id ? setEditLimitId(null) : openEditLimit(acc)}
                    className="p-2 rounded-md transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    title="Edit daily limits">
                    <Settings2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(acc.id)}
                    className="p-2 rounded-md hover:bg-red-50 transition-colors"
                    style={{ color: "var(--text-muted)" }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Inline daily limit editor */}
              {editLimitId === acc.id && (
                <div className="rounded-xl border mt-1 p-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      Daily connection limit
                    </p>
                    <button onClick={() => setEditLimitId(null)} style={{ color: "var(--text-muted)" }}>
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={limitValue}
                      onChange={e => setLimitValue(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold w-8 text-center" style={{ color: "var(--text-primary)" }}>
                      {limitValue}
                    </span>
                  </div>
                  <p className="text-xs mt-1 mb-3" style={{ color: "var(--text-muted)" }}>
                    Max 30/day · LinkedIn safe zone is 15–25
                  </p>
                  <button
                    onClick={() => saveLimit(acc.id)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium"
                    style={{ background: "var(--accent)", color: "#fff" }}>
                    Save
                  </button>
                </div>
              )}

              {/* Inline reconnect form */}
              {reconnect?.accountId === acc.id && (
                <div className="rounded-xl border mt-1 p-4"
                  style={{ borderColor: "#ef4444", background: "#ef444408" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                      Re-enter LinkedIn credentials to reconnect
                    </p>
                    <button onClick={() => setReconnect(null)} style={{ color: "var(--text-muted)" }}>
                      <X size={14} />
                    </button>
                  </div>
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
                  {reconnect.error && (
                    <p className="text-xs mt-2" style={{ color: "#ef4444" }}>{reconnect.error}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
