"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Script, ScriptStatus, Plan } from "@prisma/client";
import { Copy, FileDown, CheckCircle, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function ScriptActions({
  script,
  plan,
}: {
  script: Script;
  plan: Plan;
}) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const canPdf = plan === "PRO" || plan === "AGENCY";

  async function copy() {
    try {
      await navigator.clipboard.writeText(script.content);
      toast.push("Copied to clipboard", "success");
    } catch {
      toast.push("Copy failed", "error");
    }
  }

  async function setStatus(status: ScriptStatus) {
    setBusy(status);
    const res = await fetch(`/api/scripts/${script.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    if (res.ok) {
      toast.push(`Marked as ${status.toLowerCase()}`, "success");
      router.refresh();
    } else {
      toast.push("Update failed", "error");
    }
  }

  async function remove() {
    setBusy("delete");
    const res = await fetch(`/api/scripts/${script.id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) {
      toast.push("Deleted", "success");
      router.push("/scripts");
    } else {
      toast.push("Delete failed", "error");
    }
  }

  return (
    <div className="sticky bottom-0 bg-[var(--color-surface)] border-t-hair border-[var(--color-border)] -mx-6 md:-mx-10 px-6 md:px-10 py-3 flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onClick={copy}>
        <Copy size={14} /> Copy
      </Button>
      {canPdf ? (
        <a href={`/api/export/pdf/${script.id}`} target="_blank" rel="noreferrer">
          <Button variant="secondary" size="sm">
            <FileDown size={14} /> PDF
          </Button>
        </a>
      ) : null}
      {script.status !== "FINAL" ? (
        <Button variant="secondary" size="sm" loading={busy === "FINAL"} onClick={() => setStatus("FINAL")}>
          <CheckCircle size={14} /> Mark final
        </Button>
      ) : null}
      {script.status !== "SENT" ? (
        <Button variant="secondary" size="sm" loading={busy === "SENT"} onClick={() => setStatus("SENT")}>
          <Send size={14} /> Mark sent
        </Button>
      ) : null}
      <div className="ml-auto flex items-center gap-2">
        {confirmDelete ? (
          <>
            <span className="text-xs text-text-secondary">Sure?</span>
            <Button variant="danger" size="sm" loading={busy === "delete"} onClick={remove}>
              Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={14} /> Delete
          </Button>
        )}
      </div>
    </div>
  );
}
