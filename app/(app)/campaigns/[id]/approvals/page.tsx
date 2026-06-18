"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface Approval {
  id: string; content: string; type: string;
  lead: { name: string; company: string | null; avatarUrl: string | null; icpScore: number | null };
}

interface Toast { id: number; message: string; ok: boolean }

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, ok: boolean) {
    const tid = Date.now();
    setToasts(prev => [...prev, { id: tid, message, ok }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== tid)), 3000);
  }

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/approvals`);
    if (res.ok) setApprovals(await res.json());
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [id]);

  async function approve(msgId: string, name: string) {
    setLoading(prev => ({ ...prev, [msgId]: true }));
    try {
      const res = await fetch(`/api/messages/${msgId}/approve`, { method: "POST" });
      if (res.ok) {
        showToast(`Sent to ${name}`, true);
      } else {
        showToast("Failed to send — try again", false);
      }
    } catch {
      showToast("Network error — try again", false);
    } finally {
      setLoading(prev => ({ ...prev, [msgId]: false }));
      load();
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

  return (
    <>
      {/* Toast stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg"
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
        <div className="rounded-xl border p-12 text-center" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>All caught up</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages pending approval.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map(a => (
            <div key={a.id} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={a.lead.avatarUrl ?? undefined} />
                  <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>{a.lead.name?.charAt(0) ?? "?"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.lead.name}</p>
                  {a.lead.company && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.lead.company}</p>}
                </div>
                {a.lead.icpScore !== null && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    ICP {a.lead.icpScore}
                  </span>
                )}
              </div>
              <p className="text-sm p-3 rounded-lg mb-3" style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                {a.content}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={loading[a.id]}
                  onClick={() => approve(a.id, a.lead.name)}
                  style={{ background: "var(--accent)", color: "#fff", opacity: loading[a.id] ? 0.6 : 1 }}
                >
                  {loading[a.id] ? "Sending…" : "Approve & send"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading[a.id]}
                  onClick={() => reject(a.id)}
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  Skip
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
