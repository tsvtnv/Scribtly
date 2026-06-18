"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Campaign {
  id: string;
  name: string;
  status: string;
  type: string;
  requireApproval: boolean;
  connectionNoteTemplate: string | null;
  followUpsEnabled: boolean;
  followUpCount: number;
  followUpDelayDays: number;
  followUpTemplate: string | null;
  autoBookEnabled: boolean;
  autoBookCtaLink: string | null;
  autoBookReplyTemplate: string | null;
  positioningText: string | null;
}

interface Toast { id: number; message: string; ok: boolean }

const VARS = ["{{name}}", "{{company}}", "{{headline}}", "{{city}}", "{{country}}"];

function VarHints({ onInsert }: { onInsert: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {VARS.map(v => (
        <button key={v} type="button" onClick={() => onInsert(v)}
          className="text-xs px-2 py-0.5 rounded border transition-colors hover:opacity-80"
          style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--bg-subtle)" }}>
          {v}
        </button>
      ))}
    </div>
  );
}

export default function CampaignSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [form, setForm] = useState<Campaign | null>(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [requeueing, setRequeueing] = useState(false);

  function showToast(message: string, ok: boolean) {
    const tid = Date.now();
    setToasts(prev => [...prev, { id: tid, message, ok }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== tid)), 3000);
  }

  useEffect(() => {
    fetch(`/api/campaigns/${id}`).then(r => r.json()).then(setForm);
  }, [id]);

  function set<K extends keyof Campaign>(key: K, value: Campaign[K]) {
    setForm(f => f ? { ...f, [key]: value } : f);
  }

  function insertInto(key: "connectionNoteTemplate" | "followUpTemplate" | "autoBookReplyTemplate", v: string) {
    setForm(f => {
      if (!f) return f;
      const current = (f[key] ?? "") as string;
      return { ...f, [key]: current + v };
    });
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          requireApproval: form.requireApproval,
          connectionNoteTemplate: form.connectionNoteTemplate,
          followUpsEnabled: form.followUpsEnabled,
          followUpCount: form.followUpCount,
          followUpDelayDays: form.followUpDelayDays,
          followUpTemplate: form.followUpTemplate,
          autoBookEnabled: form.autoBookEnabled,
          autoBookCtaLink: form.autoBookCtaLink,
          autoBookReplyTemplate: form.autoBookReplyTemplate,
          positioningText: form.positioningText,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setForm(updated);
        showToast("Settings saved", true);
      } else {
        showToast("Failed to save", false);
      }
    } finally {
      setSaving(false);
    }
  }

  async function requeueSkipped() {
    setRequeueing(true);
    try {
      const res = await fetch(`/api/campaigns/${id}/requeue-skipped`, { method: "POST" });
      const data = await res.json();
      if (res.ok) showToast(`Re-queued ${data.count} skipped leads`, true);
      else showToast("Failed to re-queue", false);
    } finally {
      setRequeueing(false);
    }
  }

  if (!form) return (
    <div className="flex items-center justify-center h-32">
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading…</p>
    </div>
  );

  return (
    <div className="max-w-2xl space-y-8">
      {/* Campaign name */}
      <section className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>General</h3>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Campaign name</label>
          <Input value={form.name} onChange={e => set("name", e.target.value)}
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Require approval</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Review each message before it sends</p>
          </div>
          <button type="button" onClick={() => set("requireApproval", !form.requireApproval)}
            className="relative w-10 h-5 rounded-full transition-colors shrink-0"
            style={{ background: form.requireApproval ? "var(--accent)" : "var(--border)" }}>
            <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
              style={{ left: form.requireApproval ? "calc(100% - 18px)" : "2px" }} />
          </button>
        </div>
      </section>

      {/* Connection note */}
      <section className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Connection note</h3>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Message template</label>
          <Textarea rows={5}
            value={form.connectionNoteTemplate ?? ""}
            onChange={e => set("connectionNoteTemplate", e.target.value)}
            placeholder="Hi {{name}}, I noticed you work at {{company}}…"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", resize: "vertical" }} />
          <VarHints onInsert={v => insertInto("connectionNoteTemplate", v)} />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>LinkedIn connection notes are capped at 300 characters.</p>
        </div>
      </section>

      {/* Follow-ups */}
      <section className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Follow-ups</h3>
          <button type="button" onClick={() => set("followUpsEnabled", !form.followUpsEnabled)}
            className="relative w-10 h-5 rounded-full transition-colors shrink-0"
            style={{ background: form.followUpsEnabled ? "var(--accent)" : "var(--border)" }}>
            <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
              style={{ left: form.followUpsEnabled ? "calc(100% - 18px)" : "2px" }} />
          </button>
        </div>
        {form.followUpsEnabled && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Number of follow-ups</label>
                <Input type="number" min={1} max={5}
                  value={form.followUpCount}
                  onChange={e => set("followUpCount", parseInt(e.target.value) || 1)}
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Delay (days after connection)</label>
                <Input type="number" min={1}
                  value={form.followUpDelayDays}
                  onChange={e => set("followUpDelayDays", parseInt(e.target.value) || 1)}
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Follow-up message template</label>
              <Textarea rows={5}
                value={form.followUpTemplate ?? ""}
                onChange={e => set("followUpTemplate", e.target.value)}
                placeholder="Hey {{name}}, just wanted to follow up…"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", resize: "vertical" }} />
              <VarHints onInsert={v => insertInto("followUpTemplate", v)} />
            </div>
          </div>
        )}
      </section>

      {/* Auto-book */}
      <section className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Auto-book</h3>
          <button type="button" onClick={() => set("autoBookEnabled", !form.autoBookEnabled)}
            className="relative w-10 h-5 rounded-full transition-colors shrink-0"
            style={{ background: form.autoBookEnabled ? "var(--accent)" : "var(--border)" }}>
            <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
              style={{ left: form.autoBookEnabled ? "calc(100% - 18px)" : "2px" }} />
          </button>
        </div>
        {form.autoBookEnabled && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Booking link</label>
              <Input value={form.autoBookCtaLink ?? ""} onChange={e => set("autoBookCtaLink", e.target.value)}
                placeholder="https://cal.com/yourname"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Auto-book message template</label>
              <Textarea rows={4}
                value={form.autoBookReplyTemplate ?? ""}
                onChange={e => set("autoBookReplyTemplate", e.target.value)}
                placeholder="Hey {{name}}, here's a link to book a quick call: {{cta_link}}"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", resize: "vertical" }} />
              <VarHints onInsert={v => insertInto("autoBookReplyTemplate", v)} />
            </div>
          </div>
        )}
      </section>

      {/* ICP positioning */}
      <section className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>ICP positioning</h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Describe your ideal buyer — used when scoring leads.</p>
        </div>
        <Textarea rows={3}
          value={form.positioningText ?? ""}
          onChange={e => set("positioningText", e.target.value)}
          placeholder="An AI agency that builds automations for small business owners (5-50 employees)…"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", resize: "vertical" }} />
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Lead queue</h3>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Leads auto-skipped by the ICP scorer (score &lt; 40) can be re-queued for outreach.
        </p>
        <Button variant="outline" size="sm" onClick={requeueing ? undefined : requeueSkipped} disabled={requeueing}
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          {requeueing ? "Re-queuing…" : "Re-queue skipped leads"}
        </Button>
      </section>

      <div className="flex justify-end pb-8">
        <Button onClick={save} disabled={saving}
          style={{ background: "var(--accent)", color: "#fff" }}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg"
            style={{ background: t.ok ? "#166534" : "#7f1d1d", color: "#fff" }}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
