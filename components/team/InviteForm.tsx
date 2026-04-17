"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function InviteForm({ seatsRemaining }: { seatsRemaining: number }) {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/workspace/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await res.json();
      if (!res.ok) {
        if (body.code === "seat_cap_reached") {
          toast.push("All team seats are used. Remove a member or pending invite first.", "error");
        } else {
          toast.push(body.error || "Invite failed", "error");
        }
        return;
      }
      toast.push("Invite sent", "success");
      setEmail("");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (seatsRemaining <= 0) {
    return (
      <p className="text-sm text-text-secondary dark:text-dark-muted">
        No seats remaining. Remove a member or pending invite to free up a seat.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input
        type="email"
        placeholder="teammate@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" loading={busy}>
        Send invite
      </Button>
    </form>
  );
}
