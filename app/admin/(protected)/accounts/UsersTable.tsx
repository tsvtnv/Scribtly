"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ChevronUp, ChevronDown, ChevronsUpDown, LogIn } from "lucide-react";

interface UserRow {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  disabled: boolean;
  createdAt: string;
  sessionCount: number;
  workspaceCount: number;
  defaultWorkspaceId: string | null;
}

type SortKey = "email" | "createdAt" | "sessionCount" | "workspaceCount";
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown size={12} className="text-text-secondary opacity-40" />;
  return dir === "asc"
    ? <ChevronUp size={12} className="text-[var(--color-primary)]" />
    : <ChevronDown size={12} className="text-[var(--color-primary)]" />;
}

export function UsersTable({ rows }: { rows: UserRow[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let result = rows.filter(
      (r) =>
        r.email.toLowerCase().includes(q) ||
        (r.name ?? "").toLowerCase().includes(q)
    );
    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [rows, query, sortKey, sortDir]);

  async function impersonate(userId: string) {
    setLoading(`imp-${userId}`);
    const res = await fetch(`/api/admin/impersonate/${userId}`, {
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

  async function toggleDisable(userId: string, disabled: boolean) {
    const action = disabled ? "enable" : "disable";
    if (!confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} this account?`)) return;
    setLoading(`dis-${userId}`);
    const res = await fetch(`/api/admin/users/${userId}/disable`, {
      method: "POST",
      credentials: "include",
    });
    setLoading(null);
    if (res.ok) router.refresh();
    else alert(`Failed to ${action} user`);
  }

  const colHeader = (label: string, key: SortKey) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap cursor-pointer select-none hover:text-text-primary transition-colors"
      onClick={() => toggleSort(key)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon active={sortKey === key} dir={sortDir} />
      </span>
    </th>
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by email or name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <tr>
              {colHeader("Email", "email")}
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Verified</th>
              {colHeader("Sessions", "sessionCount")}
              {colHeader("Workspaces", "workspaceCount")}
              {colHeader("Joined", "createdAt")}
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-[var(--color-primary-tint)] transition-colors ${row.disabled ? "opacity-50" : ""}`}
              >
                <td className="px-4 py-3 font-medium text-xs font-mono">{row.email}</td>
                <td className="px-4 py-3 text-text-secondary">{row.name ?? "—"}</td>
                <td className="px-4 py-3">
                  {row.emailVerified ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓</span>
                  ) : (
                    <span className="text-text-secondary">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-text-secondary">{row.sessionCount}</td>
                <td className="px-4 py-3 text-text-secondary">{row.workspaceCount}</td>
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap text-xs">
                  {new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  {row.disabled ? (
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Disabled</span>
                  ) : (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      onClick={() => impersonate(row.id)}
                      disabled={loading !== null || row.disabled}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90 disabled:opacity-40 transition-colors font-medium"
                    >
                      <LogIn size={11} />
                      {loading === `imp-${row.id}` ? "…" : "Login as"}
                    </button>
                    {row.defaultWorkspaceId && (
                      <a
                        href={`/admin/users/${row.defaultWorkspaceId}`}
                        className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-text-secondary hover:text-text-primary transition-colors"
                      >
                        Workspace
                      </a>
                    )}
                    <button
                      onClick={() => toggleDisable(row.id, row.disabled)}
                      disabled={loading !== null}
                      className={`text-xs px-2 py-1 rounded-md font-medium transition-colors disabled:opacity-40 ${
                        row.disabled
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                      }`}
                    >
                      {loading === `dis-${row.id}` ? "…" : row.disabled ? "Enable" : "Disable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-text-secondary text-sm">
                  No users match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-text-secondary">
        Showing {filtered.length} of {rows.length} users
      </p>
    </div>
  );
}
