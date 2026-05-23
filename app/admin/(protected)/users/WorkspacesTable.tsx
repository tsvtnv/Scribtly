"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

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

export function WorkspacesTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.ownerEmail.toLowerCase().includes(query.toLowerCase())
  );

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

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search by workspace name or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
      <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <tr>
              {["Workspace", "Owner", "Plan", "Sub?", "Scripts (month)", "Total scripts", "Clients", "Created"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Beta</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--color-primary-tint)] transition-colors">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/admin/users/${row.id}`} className="hover:text-primary">
                    {row.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary">{row.ownerEmail}</td>
                <td className="py-3 px-4 text-sm">
                  <select
                    value={row.plan}
                    onChange={(e) => handlePlanChange(row.ownerId, e.target.value)}
                    className="text-xs border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-transparent"
                  >
                    {["FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">{row.hasSubscription ? "✓" : "—"}</td>
                <td className="px-4 py-3">{row.scriptCount}</td>
                <td className="px-4 py-3">{row.totalScripts}</td>
                <td className="px-4 py-3">{row.clientCount}</td>
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                  {new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 text-sm">
                  {row.betaActive
                    ? <span className="text-amber-600 dark:text-amber-400 text-xs">
                        Active (expires {new Date(row.betaExpiresAt!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })})
                      </span>
                    : row.isBetaTester
                      ? <span className="text-gray-400 text-xs">Expired</span>
                      : <span className="text-gray-300 text-xs">—</span>
                  }
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex gap-1 flex-wrap">
                    {!row.betaActive && (
                      <button
                        onClick={() => handleBetaAction(row.ownerId, "grant")}
                        className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                      >
                        Grant Beta
                      </button>
                    )}
                    {row.betaActive && (
                      <>
                        <button
                          onClick={() => handleBetaAction(row.ownerId, "revoke")}
                          className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                        >
                          Revoke
                        </button>
                        <button
                          onClick={() => handleBetaAction(row.ownerId, "extend")}
                          className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200"
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
                <td colSpan={10} className="px-4 py-8 text-center text-text-secondary">
                  No workspaces match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-text-secondary">
        {filtered.length} of {rows.length} workspaces
      </p>
    </div>
  );
}
