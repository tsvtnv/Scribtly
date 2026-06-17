"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface Approval {
  id: string; content: string; type: string;
  lead: { name: string; company: string | null; avatarUrl: string | null; icpScore: number | null };
}

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>([]);

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/approvals`);
    if (res.ok) setApprovals(await res.json());
  }

  useEffect(() => { load(); }, [id]);

  async function approve(msgId: string) {
    await fetch(`/api/messages/${msgId}/approve`, { method: "POST" });
    load();
  }

  async function reject(msgId: string) {
    await fetch(`/api/messages/${msgId}/reject`, { method: "POST" });
    load();
  }

  if (approvals.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
        <p className="font-medium" style={{ color: "var(--text-primary)" }}>All caught up</p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages pending approval.</p>
      </div>
    );
  }

  return (
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
            <Button size="sm" onClick={() => approve(a.id)} style={{ background: "var(--accent)", color: "#fff" }}>Approve & send</Button>
            <Button size="sm" variant="outline" onClick={() => reject(a.id)} style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>Skip</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
