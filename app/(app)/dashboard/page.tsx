"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface DailyPoint { date: string; sent: number; replied: number }

interface Stats {
  totalLeads: number;
  totalSent: number;
  totalReplied: number;
  responseRate: string;
  dailyActivity: DailyPoint[];
  campaigns: Array<{
    id: string; name: string; status: string;
    leads: number; contacted: number; accepted: number; replied: number;
  }>;
  recentEvents: Array<{ id: string; type: string; createdAt: string }>;
}

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "#22c55e",
  DRAFT: "#9ca3af",
  PAUSED: "#f59e0b",
  COMPLETED: "#9ca3af",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="space-y-4">
        <div className="flex border rounded-xl overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="flex-1 p-6 h-28 animate-pulse border-r last:border-r-0"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  const totalContacted = stats.campaigns.reduce((a, c) => a + c.contacted, 0);

  const CARDS = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      sub: "imported leads",
      ratio: stats.totalLeads > 0 ? totalContacted / stats.totalLeads : 0,
    },
    {
      label: "Messages Sent",
      value: stats.totalSent,
      sub: "total delivered",
      ratio: null,
    },
    {
      label: "Replies",
      value: stats.totalReplied,
      sub: "conversations started",
      ratio: null,
    },
    {
      label: "Response Rate",
      value: `${stats.responseRate}%`,
      sub: "of messages sent",
      ratio: null,
    },
  ];

  const chartData = (stats.dailyActivity ?? []).map(d => ({
    day: d.date.slice(5),
    Sent: d.sent,
    Replies: d.replied,
  }));

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div
        className="flex border rounded-xl overflow-hidden"
        style={{ borderColor: "var(--border)", background: "#ffffff" }}
      >
        {CARDS.map((card) => (
          <div
            key={card.label}
            className="flex-1 p-6 border-r last:border-r-0"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
              {card.label}
            </p>
            <p className="text-4xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {card.value}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {card.sub}
            </p>
            {card.ratio !== null && card.ratio > 0 && (
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(card.ratio * 100, 100)}%`, background: "var(--accent)" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Activity line chart */}
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "var(--border)", background: "#ffffff" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Activity</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#8b5cf6" }} />
              Sent
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              Replies
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -32 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
                background: "#ffffff",
              }}
            />
            <Line type="monotone" dataKey="Sent" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Replies" stroke="var(--accent)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign performance */}
      <div
        className="rounded-xl border"
        style={{ borderColor: "var(--border)", background: "#ffffff" }}
      >
        <div
          className="px-5 py-3 border-b font-semibold text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        >
          Campaign Performance
        </div>
        {stats.campaigns.length === 0 ? (
          <div className="p-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
            No campaigns yet.{" "}
            <Link href="/campaigns/new" className="underline" style={{ color: "var(--accent)" }}>
              Create one.
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {stats.campaigns.map(c => (
              <div key={c.id} className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: STATUS_DOT[c.status] ?? "#9ca3af" }}
                  />
                  <Link
                    href={`/campaigns/${c.id}/overview`}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.name}
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "leads", value: c.leads },
                    { label: "contacted", value: c.contacted },
                    { label: "accepted", value: c.accepted },
                    { label: "replied", value: c.replied },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "var(--border)", background: "#ffffff" }}
      >
        <p className="font-semibold mb-4 text-sm" style={{ color: "var(--text-primary)" }}>Recent Activity</p>
        {stats.recentEvents.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet.</p>
        ) : (
          <div className="space-y-2">
            {stats.recentEvents.map(ev => (
              <div
                key={ev.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ")}</span>
                <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>
                  {new Date(ev.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
