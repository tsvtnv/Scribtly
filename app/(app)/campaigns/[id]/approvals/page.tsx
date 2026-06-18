"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Clock } from "lucide-react";

interface Approval {
  id: string;
  content: string;
  type: string;
  scheduledFor?: string; // set optimistically after approval
  lead: { name: string; company: string | null; avatarUrl: string | null; icpScore: number | null };
}

interface Toast { id: number; message: string; ok: boolean }

function formatScheduledTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `today at ${time}`;
  if (isTomorrow) return `tomorrow at ${time}`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + ` at ${time}`;
}

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [bulkLoading, setBulkLoading] = useState(false);
  const [minScore, setMinScore] = useState(70);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, ok: boolean) {
    const tid = Date.now();
    setToasts(prev => [...prev, { id: tid, message, ok }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== tid)), 4000);
  }

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/approvals`);
    if (res.ok) setApprovals(await res.json());
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function approve(msgId: string, name: string) {
    setLoading(prev => ({ ...prev, [msgId]: true }));
    try {
      const res = await fetch(`/api/messages/${msgId}/approve`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setApprovals(prev =>
          prev.map(a => a.id === msgId ? { ...a, scheduledFor: data.scheduledFor } : a)
        );
        showToast(`Scheduled for ${formatScheduledTime(data.scheduledFor)}`, true);
        // Remove from queue after a brief moment to show the scheduled time
        setTimeout(() => load(), 2000);
      } else {
        showToast("Failed to schedule — try again", false);
      }
    } catch {
      showToast("Network error — try again", false);
    } finally {
      setLoading(prev => ({ ...prev, [msgId]: false }));
    }
  }

  async function reject(msgId: string) {
    setLoading(prev => ({ ...prev, [msgId]: true }));
    try {
      await fetch(`/api/messages/${msgId}/reject`, { method: "POST" });
    } finally {
      setLoading(prev => ({ ...prev, [msgId]: false }));
      load();
    }
  }

  async function bulkApprove(minIcpScore?: number) {
    setBulkLoading(true);
    try {
      const res = await fetch(`/api/campaigns/${id}/approvals/bulk-approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(minIcpScore !== undefined ? { minIcpScore } : {}),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.approved === 0) {
          showToast("No messages matched the filter", false);
        } else {
          const firstStr = data.firstSlot ? ` — first send ${formatScheduledTime(data.firstSlot)}` : "";
          showToast(`${data.approved} message${data.approved === 1 ? "" : "s"} scheduled${firstStr}`, true);
          load();
        }
      } else {
        showToast("Bulk approve failed — try again", false);
      }
    } catch {
      showToast("Network error — try again", false);
    } finally {
      setBulkLoading(false);
    }
  }

  return (
    <>
      {/* Toast stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg max-w-sm"
            style={{
              background: t.ok ? "#16a34a" : "#dc2626",
              color: "#fff",
              animation: "fadeIn 0.15s ease",
            }}>
            {t.message}
          </div>
        ))}
      </div>

      {approvals.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>All caught up</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages pending approval.</p>
        </div>
      ) : (
        <>
          {/* Bulk action bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Button
              size="sm"
              disabled={bulkLoading}
              onClick={() => bulkApprove()}
              style={{ background: "var(--accent)", color: "#fff", opacity: bulkLoading ? 0.6 : 1 }}>
              {bulkLoading ? "Scheduling…" : `Approve all (${approvals.length})`}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Approve ICP ≥</span>
              <input
                type="number"
                min={0} max={100}
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded-md border text-sm text-center"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
              />
              <Button
                size="sm"
                variant="outline"
                disabled={bulkLoading}
                onClick={() => bulkApprove(minScore)}
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                Approve
              </Button>
            </div>
          </div>

          {/* Message cards */}
          <div className="space-y-3">
            {approvals.map(a => (
              <div key={a.id} className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={a.lead.avatarUrl ?? undefined} />
                    <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                      {a.lead.name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.lead.name}</p>
                    {a.lead.company && (
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.lead.company}</p>
                    )}
                  </div>
                  {a.lead.icpScore !== null && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded border"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      ICP {a.lead.icpScore}
                    </span>
                  )}
                </div>

                <p className="text-sm p-3 rounded-lg mb-3"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                  {a.content}
                </p>

                {a.scheduledFor ? (
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "#16a34a" }}>
                    <Clock size={12} />
                    Scheduled for {formatScheduledTime(a.scheduledFor)}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={loading[a.id]}
                      onClick={() => approve(a.id, a.lead.name)}
                      style={{ background: "var(--accent)", color: "#fff", opacity: loading[a.id] ? 0.6 : 1 }}>
                      {loading[a.id] ? "Scheduling…" : "Approve & schedule"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loading[a.id]}
                      onClick={() => reject(a.id)}
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      Skip
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
