"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

interface Row {
  id: string;
  name: string;
  ownerEmail: string;
  plan: string;
  scriptCount: number;
  totalScripts: number;
  clientCount: number;
  hasSubscription: boolean;
  createdAt: string;
}

export function WorkspacesTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.ownerEmail.toLowerCase().includes(query.toLowerCase())
  );

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
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-tint)] text-primary">
                    {row.plan}
                  </span>
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
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-text-secondary">
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
