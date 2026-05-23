"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface Row {
  id: string;
  ownerId: string;
  name: string;
  ownerEmail: string;
  plan: string;
  scriptCount: number;
  totalScripts: number;
  clientCount: number;
  hasSubscription: boolean;
  createdAt: string;
  isBetaTester: boolean;
  betaActive: boolean;
  betaExpiresAt: string | null;
}

const PLAN_BADGE: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  BASIC: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PRO: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  AGENCY: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
  ENTERPRISE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

type SortKey = "name" | "plan" | "scriptCount" | "totalScripts" | "clientCount" | "createdAt";
type SortDir = "asc" | "desc";

function SortIcon({ col, active, dir }: { col: string; active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown size={12} className="text-text-secondary opacity-40" />;
  return dir === "asc"
    ? <ChevronUp size={12} className="text-[var(--color-primary)]" />
    : <ChevronDown size={12} className="text-[var(--color-primary)]" />;
}

export function WorkspacesTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [planFilter, setPlanFilter] = useState<string>("ALL");
  const router = useRouter();

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    let result = rows.filter(
      (r) =>
        (planFilter === "ALL" || r.plan === planFilter) &&
        (r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.ownerEmail.toLowerCase().includes(query.toLowerCase()))
    );
    result = [...result].sort((a, b) => {
      let av: string | number = a[sortKey] as string | number;
      let bv: string | number = b[sortKey] as string | number;
      if (sortKey === "plan") {
        const order = { FREE: 0, BASIC: 1, PRO: 2, AGENCY: 3, ENTERPRISE: 4 };
        av = order[a.plan as keyof typeof order] ?? 0;
        bv = order[b.plan as keyof typeof order] ?? 0;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [rows, query, planFilter, sortKey, sortDir]);

  async function handleBetaAction(ownerId: string, action: "grant" | "revoke" | "extend") {
    const res = await fetch(`/api/admin/users/${ownerId}/beta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action }),
    });
    if (res.ok) router.refresh();
  }

  async function handlePlanChange(ownerId: string, plan: string) {
    const res = await fetch(`/api/admin/users/${ownerId}/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ plan }),
    });
    if (res.ok) router.refresh();
  }

  const colHeader = (label: string, key: SortKey) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap cursor-pointer select-none hover:text-text-primary transition-colors"
      onClick={() => toggleSort(key)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon col={key} active={sortKey === key} dir={sortDir} />
      </span>
    </th>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by workspace name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1.5 flex-wrap">
          {["ALL", "FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"].map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                planFilter === p
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] text-text-secondary hover:text-text-primary"
              }`}
            >
              {p === "ALL" ? "All plans" : p}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <tr>
              {colHeader("Workspace", "name")}
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">
                Owner
              </th>
              {colHeader("Plan", "plan")}
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">
                Sub
              </th>
              {colHeader("Scripts/mo", "scriptCount")}
              {colHeader("Total scripts", "totalScripts")}
              {colHeader("Clients", "clientCount")}
              {colHeader("Joined", "createdAt")}
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">
                Beta
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--color-primary-tint)] transition-colors">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/admin/users/${row.id}`} className="hover:text-[var(--color-primary)] transition-colors">
                    {row.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{row.ownerEmail}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.plan}
                    onChange={(e) => handlePlanChange(row.ownerId, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer transition-colors ${PLAN_BADGE[row.plan] ?? ""}`}
                  >
                    {["FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {row.hasSubscription ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓</span>
                  ) : (
                    <span className="text-text-secondary">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{row.scriptCount}</td>
                <td className="px-4 py-3 text-text-secondary">{row.totalScripts}</td>
                <td className="px-4 py-3 text-text-secondary">{row.clientCount}</td>
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap text-xs">
                  {new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-sm">
                  {row.betaActive ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">
                      Active · {new Date(row.betaExpiresAt!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  ) : row.isBetaTester ? (
                    <span className="text-xs text-text-secondary">Expired</span>
                  ) : (
                    <span className="text-xs text-text-secondary">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {!row.betaActive && (
                      <button
                        onClick={() => handleBetaAction(row.ownerId, "grant")}
                        className="text-xs px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors font-medium"
                      >
                        Grant Beta
                      </button>
                    )}
                    {row.betaActive && (
                      <>
                        <button
                          onClick={() => handleBetaAction(row.ownerId, "revoke")}
                          className="text-xs px-2 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 transition-colors font-medium"
                        >
                          Revoke
                        </button>
                        <button
                          onClick={() => handleBetaAction(row.ownerId, "extend")}
                          className="text-xs px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 transition-colors font-medium"
                        >
                          +30d
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-text-secondary text-sm">
                  No workspaces match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-text-secondary">
        Showing {filtered.length} of {rows.length} workspaces
      </p>
    </div>
  );
}
