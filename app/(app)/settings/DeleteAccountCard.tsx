"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function DeleteAccountCard() {
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirm !== "DELETE") return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to delete account.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        This will permanently delete your account, all your workspaces, and cancel any active subscriptions. This cannot be undone.
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm">Type <span className="font-mono font-semibold">DELETE</span> to confirm.</p>
        <Input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="DELETE"
          className="max-w-xs"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={confirm !== "DELETE" || loading}
        className="w-fit"
      >
        {loading ? "Deleting..." : "Delete account"}
      </Button>
    </div>
  );
}
