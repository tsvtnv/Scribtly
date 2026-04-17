"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { relativeDate } from "@/lib/utils";

export interface PendingInvite {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
}

export function PendingInvitesList({ invites }: { invites: PendingInvite[] }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function resend(email: string) {
    setBusy(email);
    try {
      const res = await fetch("/api/workspace/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.push("Invite resent", "success");
        router.refresh();
      } else {
        toast.push("Resend failed", "error");
      }
    } finally {
      setBusy(null);
    }
  }

  async function revoke(id: string) {
    if (!confirm("Revoke this invite?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/workspace/invites/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.push("Invite revoked", "success");
        router.refresh();
      } else {
        toast.push("Revoke failed", "error");
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-2">
      {invites.map((i) => (
        <div key={i.id} className="flex items-center gap-3 p-2.5 rounded-md border-hair border-[var(--color-border)]">
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{i.email}</div>
            <div className="text-xs text-text-secondary dark:text-dark-muted">
              Sent {relativeDate(i.createdAt)} · Expires in {Math.max(0, Math.ceil((new Date(i.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}d
            </div>
          </div>
          <Button size="sm" variant="secondary" loading={busy === i.email} onClick={() => resend(i.email)}>
            Resend
          </Button>
          <Button size="sm" variant="ghost" loading={busy === i.id} onClick={() => revoke(i.id)}>
            Revoke
          </Button>
        </div>
      ))}
    </div>
  );
}
