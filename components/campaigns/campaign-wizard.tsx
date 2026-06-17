"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Account { id: string; name: string; avatarUrl: string | null }
interface WizardProps { accounts: Account[] }

const STEPS = ["Campaign name", "Account", "Type", "Positioning", "Outreach flow"];

const TYPES = [
  { value: "CONNECT_NOTE", label: "Connect + Note", desc: "Connection request with a message" },
  { value: "CONNECT", label: "Connect", desc: "Connection request only" },
  { value: "FIRST_DEGREE", label: "1st-Degree", desc: "Message existing connections" },
] as const;

const VARS = "{{name}} {{company}} {{headline}} {{city}} {{country}}";

export function CampaignWizard({ accounts }: WizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flowTab, setFlowTab] = useState<"connection" | "followups" | "autobook">("connection");

  const [form, setForm] = useState({
    name: "",
    linkedInAccountId: accounts[0]?.id ?? "",
    type: "CONNECT_NOTE" as "CONNECT_NOTE" | "CONNECT" | "FIRST_DEGREE",
    positioningText: "",
    connectionNoteTemplate: "Hey {{name}}, saw you run {{company}} — I'd love to connect.",
    requireApproval: true,
    followUpsEnabled: false,
    followUpCount: 1,
    followUpDelayDays: 3,
    followUpTemplate: "Hey {{name}}, just following up on my last message.",
    autoBookEnabled: false,
    autoBookCtaLink: "",
    autoBookReplyTemplate: "Sounds good! Here's a quick time to chat: {{cta_link}}",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleFinish() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed"); setLoading(false); return; }
    router.push(`/campaigns/${data.id}/overview`);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="h-1 w-full" style={{ background: "var(--bg-subtle)" }}>
          <div className="h-1 transition-all" style={{ width: `${progress}%`, background: "var(--accent)" }} />
        </div>
        <div className="p-8">
          <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            Step {step + 1} of {STEPS.length} · <strong>{STEPS[step]}</strong>
          </p>
          {step === 0 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                What do you want to call this campaign?
              </h2>
              <Input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="e.g. Q3 Agency Outreach"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Which LinkedIn account sends this campaign?
              </h2>
              {accounts.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No LinkedIn accounts connected yet.{" "}
                  <a href="/accounts" className="underline" style={{ color: "var(--accent)" }}>Connect one first.</a>
                </p>
              ) : (
                <div className="space-y-2">
                  {accounts.map(acc => (
                    <button key={acc.id} onClick={() => set("linkedInAccountId", acc.id)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-colors"
                      style={{
                        borderColor: form.linkedInAccountId === acc.id ? "var(--accent)" : "var(--border)",
                        background: form.linkedInAccountId === acc.id ? "rgba(224,120,48,0.06)" : "var(--bg-subtle)",
                      }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: "var(--accent)", color: "#fff" }}>
                        {acc.name.charAt(0)}
                      </div>
                      <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{acc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                How do you want to reach them?
              </h2>
              <div className="space-y-2">
                {TYPES.map(t => (
                  <button key={t.value} onClick={() => set("type", t.value)}
                    className="w-full p-4 rounded-xl border text-left transition-colors"
                    style={{
                      borderColor: form.type === t.value ? "var(--accent)" : "var(--border)",
                      background: form.type === t.value ? "rgba(224,120,48,0.06)" : "var(--bg-subtle)",
                    }}>
                    <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{t.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Tell us about your business
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Helps personalise messages and score leads against your ICP.
              </p>
              <Textarea value={form.positioningText}
                onChange={e => set("positioningText", e.target.value)}
                rows={5}
                placeholder="e.g. We're Octelis, a UK web design agency for tradespeople..."
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
            </div>
          )}
          {step === 4 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Configure your outreach flow
              </h2>
              <div className="flex gap-4">
                <div className="w-44 shrink-0 space-y-1">
                  {[
                    { key: "connection", label: "Connection" },
                    { key: "followups", label: "Follow-ups" },
                    { key: "autobook", label: "Auto Book" },
                  ].map(tab => (
                    <button key={tab.key}
                      onClick={() => setFlowTab(tab.key as typeof flowTab)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-left transition-colors"
                      style={{
                        background: flowTab === tab.key ? "rgba(224,120,48,0.08)" : "transparent",
                        color: flowTab === tab.key ? "var(--accent)" : "var(--text-muted)",
                      }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex-1 border rounded-xl p-4 space-y-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                  {flowTab === "connection" && (
                    <>
                      <div>
                        <Label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          Connection note template
                        </Label>
                        <Textarea value={form.connectionNoteTemplate}
                          onChange={e => set("connectionNoteTemplate", e.target.value)}
                          rows={4} className="mt-1"
                          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use: {VARS}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Require approval</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Review each message before it sends</p>
                        </div>
                        <Switch checked={form.requireApproval} onCheckedChange={v => set("requireApproval", v)} />
                      </div>
                    </>
                  )}
                  {flowTab === "followups" && (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Enable follow-ups</p>
                        <Switch checked={form.followUpsEnabled} onCheckedChange={v => set("followUpsEnabled", v)} />
                      </div>
                      {form.followUpsEnabled && (
                        <>
                          <div className="flex items-center gap-4">
                            <div>
                              <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Count</Label>
                              <Input type="number" min={1} max={5} value={form.followUpCount}
                                onChange={e => set("followUpCount", parseInt(e.target.value))}
                                className="w-20 mt-1"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            </div>
                            <div>
                              <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Send after (days)</Label>
                              <Input type="number" min={1} value={form.followUpDelayDays}
                                onChange={e => set("followUpDelayDays", parseInt(e.target.value))}
                                className="w-20 mt-1"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Follow-up message</Label>
                            <Textarea value={form.followUpTemplate}
                              onChange={e => set("followUpTemplate", e.target.value)}
                              rows={3} className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use: {VARS}</p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {flowTab === "autobook" && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Auto Book</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>AI detects interest and sends booking link</p>
                        </div>
                        <Switch checked={form.autoBookEnabled} onCheckedChange={v => set("autoBookEnabled", v)} />
                      </div>
                      {form.autoBookEnabled && (
                        <>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>CTA link</Label>
                            <Input value={form.autoBookCtaLink}
                              onChange={e => set("autoBookCtaLink", e.target.value)}
                              placeholder="https://book.octelis.com" className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                          </div>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Reply template</Label>
                            <Textarea value={form.autoBookReplyTemplate}
                              onChange={e => set("autoBookReplyTemplate", e.target.value)}
                              rows={3} className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                              Use: {VARS} {"{{cta_link}}"}
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)}
              style={{ color: "var(--text-muted)" }}>Back</Button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)}
              disabled={step === 0 && !form.name.trim()}
              style={{ background: "var(--accent)", color: "#fff" }}>Next</Button>
          ) : (
            <Button onClick={handleFinish} disabled={loading}
              style={{ background: "var(--accent)", color: "#fff" }}>
              {loading ? "Creating…" : "Create campaign"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
