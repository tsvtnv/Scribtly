"use client";

import { useState } from "react";
import type { ReferralLead, ReferralEvent } from "@prisma/client";
import { LeadDetailPanel } from "./LeadDetailPanel";

type LeadWithEvents = ReferralLead & { events: ReferralEvent[] };

const STATUS_COLORS: Record<string, string> = {
  NOT_CONTACTED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  CONTACTED_VIA_FORM: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  CONTACTED_VIA_EMAIL: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  SKIPPED_DUPLICATE: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  SKIPPED_NOT_RELEVANT: "bg-gray-100 text-gray-500",
  SKIPPED_POLICY_BLOCKS_OUTREACH: "bg-orange-100 text-orange-700",
  NEEDS_MANUAL_REVIEW: "bg-red-100 text-red-700",
  FAILED: "bg-red-200 text-red-800",
};

function fmt(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export function OutreachTable({ leads }: { leads: LeadWithEvents[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const filtered = leads.filter(
    (l) =>
      !filter ||
      l.agencyName.toLowerCase().includes(filter.toLowerCase()) ||
      (l.country ?? "").toLowerCase().includes(filter.toLowerCase()) ||
      l.outreachStatus.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by agency, country, or status…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-full max-w-sm px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase tracking-wider">
            <tr>
              {["Agency", "Fit", "Via", "Delivered", "Opened", "Visits", "Time", "Form", "Signed Up", "Country", "Last Seen", "Status"].map((h) => (
                <th key={h} className="px-3 py-3 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((lead) => (
              <>
                <tr
                  key={lead.id}
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-3 py-3 font-medium whitespace-nowrap">{lead.agencyName}</td>
                  <td className="px-3 py-3">{lead.fitScore ?? "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {lead.contactMethod === "RESEND_EMAIL" ? "📧 Email"
                      : lead.contactMethod === "WEBSITE_FORM" ? "🌐 Form"
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
                  <tr key={`${lead.id}-detail`}>
                    <td colSpan={12} className="px-3 pb-3">
                      <LeadDetailPanel lead={lead} />
                    </td>
                  </tr>
                )}
              </>
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
