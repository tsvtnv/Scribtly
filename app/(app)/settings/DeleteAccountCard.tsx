"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export function DeleteAccountCard() {
  const { signOut } = useClerk();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (confirm !== "DELETE") return;
    setBusy(true);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.push(body.error || "Delete failed", "error");
        return;
      }
      await signOut({ redirectUrl: "/" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="border-danger/30">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-danger mb-2">Danger zone</h2>
      <p className="text-sm text-text-secondary dark:text-dark-muted mb-3">
        Delete your account and everything associated with it. This cannot be undone.
      </p>
      {!open ? (
        <Button variant="danger" size="sm" onClick={() => setOpen(true)}>Delete account</Button>
      ) : (
        <div className="space-y-2">
          <p className="text-xs">Type <strong>DELETE</strong> to confirm.</p>
          <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <div className="flex items-center gap-2">
            <Button variant="danger" size="sm" loading={busy} disabled={confirm !== "DELETE"} onClick={onDelete}>
              Permanently delete
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setOpen(false); setConfirm(""); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
