"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalLeads: number; totalSent: number; totalReplied: number; responseRate: string;
  campaigns: Array<{ id: string; name: string; status: string; leads: number; contacted: number; accepted: number; replied: number }>;
  recentEvents: Array<{ id: string; type: string; createdAt: string }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(setStats);
  }, []);

  if (!stats) return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="rounded-xl border p-6 h-24 animate-pulse"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        ))}
      </div>
    </div>
  );

  const CARDS = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "Messages Sent", value: stats.totalSent },
    { label: "Replies", value: stats.totalReplied },
    { label: "Response Rate", value: `${stats.responseRate}%` },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CARDS.map(card => (
          <div key={card.label} className="rounded-xl border p-5"
            style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>{card.label}</p>
            <p className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="px-5 py-3 border-b font-semibold text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Campaign Performance
        </div>
        {stats.campaigns.length === 0 ? (
          <div className="p-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
            No campaigns yet.{" "}
            <Link href="/campaigns/new" className="underline" style={{ color: "var(--accent)" }}>Create one.</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-subtle)" }}>
                <tr>
                  {["Campaign","Leads","Contacted","Accepted","Replied"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.campaigns.map((c, i) => (
                  <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
                    <td className="px-4 py-3">
                      <Link href={`/campaigns/${c.id}/overview`}
                        className="font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{c.leads}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{c.contacted}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{c.accepted}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{c.replied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent Activity</p>
        {stats.recentEvents.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet.</p>
        ) : (
          <ul className="space-y-2">
            {stats.recentEvents.map(ev => (
              <li key={ev.id} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <span style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ")}</span>
                <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>
                  {new Date(ev.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
