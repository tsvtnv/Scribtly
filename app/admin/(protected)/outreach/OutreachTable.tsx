"use client";

import React, { useState, useMemo } from "react";
import type { SerializedLead } from "./page";
import { LeadDetailPanel } from "./LeadDetailPanel";

const STATUS_COLORS: Record<string, string> = {
  NOT_CONTACTED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  CONTACTED_VIA_FORM: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  CONTACTED_VIA_EMAIL: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  SKIPPED_DUPLICATE: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  SKIPPED_NO_CONTACT_METHOD: "bg-gray-100 text-gray-500",
  SKIPPED_NOT_RELEVANT: "bg-gray-100 text-gray-500",
  SKIPPED_POLICY_BLOCKS_OUTREACH: "bg-orange-100 text-orange-700",
  NEEDS_MANUAL_REVIEW: "bg-red-100 text-red-700",
  FAILED: "bg-red-200 text-red-800",
};

const ALL_STATUSES = [
  "NOT_CONTACTED",
  "CONTACTED_VIA_FORM",
  "CONTACTED_VIA_EMAIL",
  "SKIPPED_DUPLICATE",
  "SKIPPED_NO_CONTACT_METHOD",
  "SKIPPED_NOT_RELEVANT",
  "SKIPPED_POLICY_BLOCKS_OUTREACH",
  "NEEDS_MANUAL_REVIEW",
  "FAILED",
];

const ALL_CONTACT_METHODS = ["RESEND_EMAIL", "WEBSITE_FORM", "MANUAL"];

type SortKey = "agencyName" | "fitScore" | "totalVisits" | "totalTimeOnSiteSeconds" | "signedUpAt" | "lastVisitAt";
type SortDir = "asc" | "desc";

function fmt(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function SortIndicator({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 opacity-30">↕</span>;
  return <span className="ml-1">{dir === "asc" ? "↑" : "↓"}</span>;
}

export function OutreachTable({ leads }: { leads: SerializedLead[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [contactMethodFilter, setContactMethodFilter] = useState("");
  const [signedUpFilter, setSignedUpFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [fitScoreFilter, setFitScoreFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const uniqueCountries = useMemo(
    () =>
      Array.from(new Set(leads.map((l) => l.country).filter(Boolean))).sort() as string[],
    [leads]
  );

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(
    () =>
      leads
        .filter((l) => {
          if (nameFilter && !l.agencyName.toLowerCase().includes(nameFilter.toLowerCase())) return false;
          if (statusFilter && l.outreachStatus !== statusFilter) return false;
          if (contactMethodFilter && l.contactMethod !== contactMethodFilter) return false;
          if (signedUpFilter === "yes" && !l.signedUp) return false;
          if (signedUpFilter === "no" && l.signedUp) return false;
          if (countryFilter && l.country !== countryFilter) return false;
          if (fitScoreFilter && String(l.fitScore ?? "") !== fitScoreFilter) return false;
          return true;
        })
        .sort((a, b) => {
          if (!sortKey) return 0;
          let av: number | string | null = null;
          let bv: number | string | null = null;
          if (sortKey === "agencyName") { av = a.agencyName; bv = b.agencyName; }
          else if (sortKey === "fitScore") { av = a.fitScore ?? -1; bv = b.fitScore ?? -1; }
          else if (sortKey === "totalVisits") { av = a.totalVisits; bv = b.totalVisits; }
          else if (sortKey === "totalTimeOnSiteSeconds") { av = a.totalTimeOnSiteSeconds; bv = b.totalTimeOnSiteSeconds; }
          else if (sortKey === "signedUpAt") { av = a.signedUpAt ? new Date(a.signedUpAt).getTime() : -1; bv = b.signedUpAt ? new Date(b.signedUpAt).getTime() : -1; }
          else if (sortKey === "lastVisitAt") { av = a.lastVisitAt ? new Date(a.lastVisitAt).getTime() : -1; bv = b.lastVisitAt ? new Date(b.lastVisitAt).getTime() : -1; }
          if (av === null || bv === null) return 0;
          if (typeof av === "string" && typeof bv === "string") {
            return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
          }
          return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
        }),
    [leads, nameFilter, statusFilter, contactMethodFilter, signedUpFilter, countryFilter, fitScoreFilter, sortKey, sortDir]
  );

  const selectClass =
    "px-2 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        <input
          type="text"
          placeholder="Search agency…"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary min-w-[160px]"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <select value={contactMethodFilter} onChange={(e) => setContactMethodFilter(e.target.value)} className={selectClass}>
          <option value="">All Contact Methods</option>
          {ALL_CONTACT_METHODS.map((m) => (
            <option key={m} value={m}>{m.replace(/_/g, " ")}</option>
          ))}
        </select>
        <select value={signedUpFilter} onChange={(e) => setSignedUpFilter(e.target.value)} className={selectClass}>
          <option value="">Signed Up: All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className={selectClass}>
          <option value="">All Countries</option>
          {uniqueCountries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={fitScoreFilter} onChange={(e) => setFitScoreFilter(e.target.value)} className={selectClass}>
          <option value="">All Fit Scores</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={String(n)}>{n}</option>
          ))}
        </select>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        Showing {filtered.length} of {leads.length} leads
      </p>

      <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-xs min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase tracking-wider">
            <tr>
              {(
                [
                  { label: "Agency", key: "agencyName" as SortKey },
                  { label: "Fit", key: "fitScore" as SortKey },
                ] as const
              ).map(({ label, key }) => (
                <th
                  key={label}
                  onClick={() => handleSort(key)}
                  className="px-3 py-3 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {label}
                  <SortIndicator active={sortKey === key} dir={sortDir} />
                </th>
              ))}
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Via</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Delivered</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Opened</th>
              <th
                onClick={() => handleSort("totalVisits")}
                className="px-3 py-3 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
              >
                Visits<SortIndicator active={sortKey === "totalVisits"} dir={sortDir} />
              </th>
              <th
                onClick={() => handleSort("totalTimeOnSiteSeconds")}
                className="px-3 py-3 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
              >
                Time<SortIndicator active={sortKey === "totalTimeOnSiteSeconds"} dir={sortDir} />
              </th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Form</th>
              <th
                onClick={() => handleSort("signedUpAt")}
                className="px-3 py-3 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
              >
                Signed Up<SortIndicator active={sortKey === "signedUpAt"} dir={sortDir} />
              </th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Country</th>
              <th
                onClick={() => handleSort("lastVisitAt")}
                className="px-3 py-3 text-left font-medium whitespace-nowrap cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
              >
                Last Seen<SortIndicator active={sortKey === "lastVisitAt"} dir={sortDir} />
              </th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((lead) => (
              <React.Fragment key={lead.id}>
                <tr
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-3 py-3 font-medium whitespace-nowrap">{lead.agencyName}</td>
                  <td className="px-3 py-3">{lead.fitScore ?? "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {lead.contactMethod === "RESEND_EMAIL" ? "📧 Email"
                      : lead.contactMethod === "WEBSITE_FORM" ? "🌐 Form"
                      : lead.contactMethod === "MANUAL" ? "✍️ Manual"
                      : "—"}
                  </td>
                  <td className="px-3 py-3">{lead.emailDelivered ? "✓" : "—"}</td>
                  <td className="px-3 py-3">{lead.emailOpenedAt ? "✓" : "—"}</td>
                  <td className="px-3 py-3">{lead.totalVisits || "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {lead.totalTimeOnSiteSeconds ? fmt(lead.totalTimeOnSiteSeconds) : "—"}
                  </td>
                  <td className="px-3 py-3">
                    {lead.signupFormStartedAt
                      ? (lead.signupFormAbandonedAt ? "🚪 Left" : "✓")
                      : "—"}
                  </td>
                  <td className="px-3 py-3">{lead.signedUp ? "✅" : "—"}</td>
                  <td className="px-3 py-3">{lead.country ?? "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {lead.lastVisitAt ? new Date(lead.lastVisitAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.outreachStatus] ?? ""}`}>
                      {lead.outreachStatus.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
                {expanded === lead.id && (
                  <tr>
                    <td colSpan={12} className="px-3 pb-3">
                      <LeadDetailPanel lead={lead} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-gray-400">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
