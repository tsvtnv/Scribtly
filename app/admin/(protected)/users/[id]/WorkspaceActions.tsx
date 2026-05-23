"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, RotateCcw, PauseCircle, PlayCircle, Trash2 } from "lucide-react";

interface Props {
  workspaceId: string;
  ownerId: string;
  ownerEmail: string;
  suspended: boolean;
}

export function WorkspaceActions({ workspaceId, ownerId, ownerEmail, suspended }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function impersonate() {
    setLoading("impersonate");
    const res = await fetch(`/api/admin/impersonate/${ownerId}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Failed to impersonate user");
      setLoading(null);
    }
  }

  async function resetQuota() {
    if (!confirm("Reset this workspace's monthly script quota to 0?")) return;
    setLoading("quota");
    const res = await fetch(`/api/admin/workspaces/${workspaceId}/quota-reset`, {
      method: "POST",
      credentials: "include",
    });
    setLoading(null);
    if (res.ok) router.refresh();
    else alert("Failed to reset quota");
  }

  async function toggleSuspend() {
    const action = suspended ? "unsuspend" : "suspend";
    if (!confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} this workspace?`)) return;
    setLoading("suspend");
    const res = await fetch(`/api/admin/workspaces/${workspaceId}/suspend`, {
      method: "POST",
      credentials: "include",
    });
    setLoading(null);
    if (res.ok) router.refresh();
    else alert(`Failed to ${action} workspace`);
  }

  async function deleteWorkspace() {
    if (!confirm(`PERMANENTLY delete workspace? This cannot be undone.\n\nType the workspace owner email to confirm: ${ownerEmail}`)) return;
    const input = prompt(`Type "${ownerEmail}" to confirm deletion:`);
    if (input !== ownerEmail) {
      alert("Email didn't match — deletion cancelled.");
      return;
    }
    setLoading("delete");
    const res = await fetch(`/api/admin/workspaces/${workspaceId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      window.location.href = "/admin/users";
    } else {
      alert("Failed to delete workspace");
      setLoading(null);
    }
  }

  const btn = (
    label: string,
    onClick: () => void,
    key: string,
    variant: "primary" | "warning" | "danger" | "default"
  ) => {
    const colors = {
      primary: "bg-[var(--color-primary)] text-white hover:opacity-90",
      warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50",
      danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50",
      default: "bg-[var(--color-surface)] border border-[var(--color-border)] text-text-primary hover:bg-[var(--color-primary-tint)]",
    };
    return (
      <button
        key={key}
        onClick={onClick}
        disabled={loading !== null}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 ${colors[variant]}`}
      >
        {loading === key ? <span className="animate-spin">⟳</span> : null}
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={impersonate}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-primary)] text-white hover:opacity-90 transition-colors disabled:opacity-50"
      >
        <LogIn size={13} />
        {loading === "impersonate" ? "Logging in…" : "Login as user"}
      </button>

      <button
        onClick={resetQuota}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-text-primary hover:bg-[var(--color-primary-tint)] transition-colors disabled:opacity-50"
      >
        <RotateCcw size={13} />
        {loading === "quota" ? "Resetting…" : "Reset quota"}
      </button>

      <button
        onClick={toggleSuspend}
        disabled={loading !== null}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 ${
          suspended
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200"
            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50"
        }`}
      >
        {suspended ? <PlayCircle size={13} /> : <PauseCircle size={13} />}
        {loading === "suspend" ? "Saving…" : suspended ? "Unsuspend" : "Suspend"}
      </button>

      <button
        onClick={deleteWorkspace}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
      >
        <Trash2 size={13} />
        {loading === "delete" ? "Deleting…" : "Delete workspace"}
      </button>
    </div>
  );
}
