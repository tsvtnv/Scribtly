"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Script, ScriptStatus, Plan } from "@prisma/client";
import { Copy, FileDown, CheckCircle, Send, Trash2, Share2, Link, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ScriptActionsProps {
  script: Script & { shareToken?: string | null; shareEnabled?: boolean }
  plan: Plan
}

export function ScriptActions({ script, plan }: ScriptActionsProps) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [shareEnabled, setShareEnabled] = useState(script.shareEnabled ?? false);
  const [shareToken, setShareToken] = useState(script.shareToken ?? null);
  const [shareOpen, setShareOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    if (shareToken) setShareUrl(`${window.location.origin}/review/${shareToken}`)
  }, [shareToken])

  const canPdf = plan === "PRO" || plan === "AGENCY";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

  async function enableShare() {
    setBusy("share");
    const res = await fetch(`/api/scripts/${script.id}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    });
    setBusy(null);
    if (!res.ok) { toast.push("Failed to create share link", "error"); return; }
    const data = await res.json() as { shareToken: string; shareEnabled: boolean };
    setShareEnabled(true);
    setShareToken(data.shareToken);
    const url = `${window.location.origin}/review/${data.shareToken}`;
    const copied = await navigator.clipboard.writeText(url).then(() => true).catch(() => false);
    toast.push(copied ? "Link copied!" : "Share enabled — copy the link below", "success");
  }

  async function disableShare() {
    setBusy("share-disable");
    const res = await fetch(`/api/scripts/${script.id}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    });
    setBusy(null);
    if (!res.ok) { toast.push("Failed to disable sharing", "error"); return; }
    setShareEnabled(false);
    setShareOpen(false);
    toast.push("Sharing disabled", "success");
  }

  async function copyLink() {
    if (!shareToken) return;
    const url = `${window.location.origin}/review/${shareToken}`;
    const copied = await navigator.clipboard.writeText(url).then(() => true).catch(() => false);
    toast.push(copied ? "Link copied!" : "Could not copy — link shown above", "success");
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] py-3">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap items-center gap-2">
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

      {/* Share button */}
      <div className="relative" ref={dropdownRef}>
        {!shareEnabled ? (
          <Button
            variant="secondary"
            size="sm"
            loading={busy === "share"}
            onClick={enableShare}
          >
            <Share2 size={14} /> Share with client
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShareOpen(v => !v)}
            >
              <Share2 size={14} /> Shared
            </Button>
            {shareOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg p-3 flex flex-col gap-2 z-50">
                <div className="flex items-center gap-2">
                  <Link size={12} className="text-text-secondary dark:text-dark-muted flex-shrink-0" />
                  <span className="text-xs text-text-secondary dark:text-dark-muted truncate flex-1">{shareUrl}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={copyLink}>
                  <Copy size={12} /> Copy link
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  loading={busy === "share-disable"}
                  onClick={disableShare}
                >
                  <X size={12} /> Disable sharing
                </Button>
              </div>
            )}
          </>
        )}
      </div>

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
    </div>
  );
}
