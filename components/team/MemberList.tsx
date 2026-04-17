"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import { relativeDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export interface MemberEntry {
  id: string;
  role: "OWNER" | "MEMBER";
  joinedAt: string;
  email: string;
  name: string | null;
  isCurrentUser: boolean;
}

export function MemberList({ members }: { members: MemberEntry[] }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Remove this member?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/workspace/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.push("Member removed", "success");
        router.refresh();
      } else {
        toast.push("Remove failed", "error");
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-2">
      {members.map((m) => (
        <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-md border-hair border-[var(--color-border)]">
          <ClientAvatar name={m.name || m.email} color="#7F77DD" size={32} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{m.name || m.email}</div>
            <div className="text-xs text-text-secondary dark:text-dark-muted truncate">{m.email}</div>
          </div>
          <div className="text-xs text-text-secondary dark:text-dark-muted">
            Joined {relativeDate(m.joinedAt)}
          </div>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-neutral-bg dark:bg-dark-elevated">
            {m.role}
          </span>
          {m.role !== "OWNER" && !m.isCurrentUser ? (
            <Button size="sm" variant="ghost" loading={busy === m.id} onClick={() => remove(m.id)}>
              Remove
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
