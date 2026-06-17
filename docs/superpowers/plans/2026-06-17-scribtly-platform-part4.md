# Scribtly LinkedIn Outreach Platform — Implementation Plan (Part 4 of 4)

> Continues from Part 3. Tasks 9–14: Inbox, Dashboard, Settings + Automation, Worker, Marketing Page, Docker.

---

## Task 9: Inbox

**Files:**
- Create: `app/api/inbox/route.ts`
- Create: `app/api/inbox/[id]/route.ts`
- Create: `app/(app)/inbox/page.tsx`

**Interfaces:**
- Produces: `GET /api/inbox` → conversations list, `GET /api/inbox/:id` → messages thread

- [ ] **Step 1: Write `app/api/inbox/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      lead: {
        select: {
          name: true, company: true, avatarUrl: true, icpScore: true,
          campaign: { select: { id: true, name: true } },
        },
      },
      messages: { orderBy: { sentAt: "desc" }, take: 1 },
    },
    orderBy: { lastMessageAt: "desc" },
  });

  return NextResponse.json(conversations);
}
```

- [ ] **Step 2: Write `app/api/inbox/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: {
      lead: {
        select: {
          name: true, headline: true, company: true, location: true,
          avatarUrl: true, profileUrl: true, icpScore: true,
          campaign: { select: { id: true, name: true } },
        },
      },
      messages: { orderBy: { sentAt: "asc" } },
    },
  });

  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.conversation.update({ where: { id }, data: { hasUnread: false } });

  return NextResponse.json(conversation);
}
```

- [ ] **Step 3: Write `app/(app)/inbox/page.tsx`**

```typescript
"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";

interface Conversation {
  id: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  hasUnread: boolean;
  lead: {
    name: string; company: string | null; avatarUrl: string | null; icpScore: number | null;
    campaign: { id: string; name: string };
  };
  messages: Array<{ direction: string; content: string }>;
}

interface ConversationDetail {
  id: string;
  lead: {
    name: string; headline: string | null; company: string | null; location: string | null;
    avatarUrl: string | null; profileUrl: string; icpScore: number | null;
    campaign: { id: string; name: string };
  };
  messages: Array<{ id: string; content: string; direction: string; sentAt: string }>;
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<ConversationDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetch("/api/inbox").then(r => r.json()).then(setConversations);
  }, []);

  async function selectConversation(id: string) {
    setLoadingDetail(true);
    const res = await fetch(`/api/inbox/${id}`);
    if (res.ok) setSelected(await res.json());
    setLoadingDetail(false);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, hasUnread: false } : c));
  }

  return (
    <div className="flex h-[calc(100vh-120px)] rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}>
      {/* Left: conversation list */}
      <div className="w-80 shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="px-4 py-3 border-b font-semibold text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Inbox
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <p className="p-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
              No conversations yet. Start a campaign to receive replies.
            </p>
          )}
          {conversations.map(conv => (
            <button key={conv.id} onClick={() => selectConversation(conv.id)}
              className="w-full flex items-start gap-3 px-4 py-3 border-b text-left hover:bg-gray-50 transition-colors"
              style={{
                borderColor: "var(--border)",
                background: selected?.id === conv.id ? "rgba(224,120,48,0.06)" : undefined,
              }}>
              <div className="relative shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={conv.lead.avatarUrl ?? undefined} />
                  <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 13 }}>
                    {conv.lead.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conv.hasUnread && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--accent)" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                    {conv.lead.name}
                  </span>
                  {conv.lastMessageAt && (
                    <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                      {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: false })}
                    </span>
                  )}
                </div>
                {conv.lead.company && (
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{conv.lead.company}</p>
                )}
                {conv.lastMessagePreview && (
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {conv.lastMessagePreview}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: thread + profile */}
      {selected ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <div className="px-5 py-3 border-b flex items-center gap-3"
              style={{ borderColor: "var(--border)" }}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={selected.lead.avatarUrl ?? undefined} />
                <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                  {selected.lead.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{selected.lead.name}</p>
                {selected.lead.company && (
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.lead.company}</p>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {selected.messages.map(msg => (
                <div key={msg.id}
                  className={`flex ${msg.direction === "OUTBOUND" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-xs px-3 py-2 rounded-2xl text-sm"
                    style={{
                      background: msg.direction === "OUTBOUND" ? "var(--accent)" : "var(--bg-subtle)",
                      color: msg.direction === "OUTBOUND" ? "#fff" : "var(--text-primary)",
                    }}>
                    {msg.content}
                    <p className={`text-xs mt-1 ${msg.direction === "OUTBOUND" ? "opacity-70" : ""}`}
                      style={{ color: msg.direction === "OUTBOUND" ? "#fff" : "var(--text-muted)" }}>
                      {new Date(msg.sentAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div className="w-56 shrink-0 border-l p-4 space-y-3"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <Avatar className="w-14 h-14 mx-auto">
              <AvatarImage src={selected.lead.avatarUrl ?? undefined} />
              <AvatarFallback style={{ background: "var(--bg-base)", fontSize: 18 }}>
                {selected.lead.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{selected.lead.name}</p>
              {selected.lead.headline && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{selected.lead.headline}</p>
              )}
            </div>
            {selected.lead.icpScore !== null && (
              <div className="text-center">
                <Badge style={{
                  background: "transparent",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                }}>
                  ICP {selected.lead.icpScore}
                </Badge>
              </div>
            )}
            <div className="space-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
              {selected.lead.company && <p>🏢 {selected.lead.company}</p>}
              {selected.lead.location && <p>📍 {selected.lead.location}</p>}
              <p>📋 {selected.lead.campaign.name}</p>
            </div>
            <a href={selected.lead.profileUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs underline" style={{ color: "var(--accent)" }}>
              <ExternalLink size={11} />LinkedIn profile
            </a>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p style={{ color: "var(--text-muted)" }}>Select a conversation</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/inbox/ app/\(app\)/inbox/
git commit -m "feat: inbox — conversation list and thread view"
```

---

## Task 10: Dashboard + Settings + Automation Log

**Files:**
- Create: `app/(app)/dashboard/page.tsx` (replace stub)
- Create: `app/(app)/settings/page.tsx`
- Create: `app/(app)/automation/page.tsx`
- Create: `app/api/dashboard/route.ts`
- Create: `app/api/automation/route.ts`
- Create: `app/api/settings/route.ts`

- [ ] **Step 1: Write `app/api/dashboard/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { subDays } from "date-fns";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wid = user.workspaceId;

  const [totalLeads, totalSent, totalReplied, campaigns, recentEvents] = await Promise.all([
    prisma.lead.count({ where: { workspaceId: wid } }),
    prisma.message.count({ where: { campaign: { workspaceId: wid }, status: "SENT" } }),
    prisma.lead.count({ where: { workspaceId: wid, status: "REPLIED" } }),
    prisma.campaign.findMany({
      where: { workspaceId: wid },
      include: { _count: { select: { leads: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.event.findMany({
      where: { workspaceId: wid },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  // Last 30 days chart data
  const thirtyDaysAgo = subDays(new Date(), 30);
  const chartEvents = await prisma.event.groupBy({
    by: ["createdAt"],
    where: { workspaceId: wid, createdAt: { gte: thirtyDaysAgo }, type: { in: ["message_sent", "lead_replied"] } },
    _count: true,
  });

  const responseRate = totalSent > 0 ? ((totalReplied / totalSent) * 100).toFixed(1) : "0";

  const campaignStats = await Promise.all(
    campaigns.map(async c => {
      const [contacted, accepted, replied] = await Promise.all([
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: "REPLIED" } }),
      ]);
      return { id: c.id, name: c.name, status: c.status, leads: c._count.leads, contacted, accepted, replied };
    })
  );

  return NextResponse.json({
    totalLeads, totalSent, totalReplied, responseRate,
    campaigns: campaignStats, recentEvents, chartEvents,
  });
}
```

- [ ] **Step 2: Write `app/(app)/dashboard/page.tsx`**

```typescript
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Stats {
  totalLeads: number; totalSent: number; totalReplied: number; responseRate: string;
  campaigns: Array<{ id: string; name: string; status: string; leads: number; contacted: number; accepted: number; replied: number }>;
  recentEvents: Array<{ id: string; type: string; createdAt: string }>;
}

const STAT_CARDS = (s: Stats) => [
  { label: "Total Leads", value: s.totalLeads },
  { label: "Messages Sent", value: s.totalSent },
  { label: "Replies", value: s.totalReplied },
  { label: "Response Rate", value: `${s.responseRate}%` },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(setStats);
  }, []);

  if (!stats) return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="rounded-xl border p-6 h-24"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS(stats).map(card => (
          <div key={card.label} className="rounded-xl border p-5"
            style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>{card.label}</p>
            <p className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder — real chart data requires aggregating events by day */}
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Activity</p>
        <div className="h-40 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
          <p className="text-sm">Chart data builds as outreach runs.</p>
        </div>
      </div>

      {/* Campaign performance */}
      <div className="rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="px-5 py-3 border-b font-semibold text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Campaign Performance
        </div>
        {stats.campaigns.length === 0 ? (
          <div className="p-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
            No campaigns yet. <Link href="/campaigns/new" className="underline" style={{ color: "var(--accent)" }}>Create one.</Link>
          </div>
        ) : (
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
        )}
      </div>

      {/* Recent activity */}
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
```

- [ ] **Step 3: Write automation log page**

`app/api/automation/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const logs = await prisma.automationLog.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { startedAt: "desc" },
    take: 100,
  });
  return NextResponse.json(logs);
}
```

`app/(app)/automation/page.tsx`:

```typescript
"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Log {
  id: string; taskType: string; status: string; result: string | null; startedAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  COMPLETED: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
  EXECUTING: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  FAILED: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
};

export default function AutomationPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetch("/api/automation").then(r => r.json()).then(setLogs);
    const interval = setInterval(() => {
      fetch("/api/automation").then(r => r.json()).then(setLogs);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Automation</h1>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--bg-subtle)" }}>
            <tr>
              {["Task","Status","Result","Started"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                No automation tasks yet. Activate a campaign to start.
              </td></tr>
            )}
            {logs.map((log, i) => {
              const style = STATUS_STYLE[log.status] ?? { bg: "transparent", color: "var(--text-muted)" };
              return (
                <tr key={log.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
                  <td className="px-4 py-3">
                    <code className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                      {log.taskType.toLowerCase().replace(/_/g, "-")}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{ background: style.bg, color: style.color }}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <span className="truncate block text-xs" style={{ color: "var(--text-muted)" }}>
                      {log.result ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatDistanceToNow(new Date(log.startedAt), { addSuffix: true })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write settings page**

`app/api/settings/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).optional(),
  workspaceName: z.string().min(1).optional(),
  allowDuplicateLeads: z.boolean().optional(),
  skipLowIcpLeads: z.boolean().optional(),
});

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [userRecord, workspace] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.workspace.findUnique({ where: { id: user.workspaceId } }),
  ]);
  return NextResponse.json({ user: userRecord, workspace });
}

export async function PATCH(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, workspaceName, allowDuplicateLeads, skipLowIcpLeads } = parsed.data;

  await Promise.all([
    name ? prisma.user.update({ where: { id: user.id }, data: { name } }) : null,
    (workspaceName || allowDuplicateLeads !== undefined || skipLowIcpLeads !== undefined)
      ? prisma.workspace.update({
          where: { id: user.workspaceId },
          data: { name: workspaceName, allowDuplicateLeads, skipLowIcpLeads },
        })
      : null,
  ]);

  return NextResponse.json({ success: true });
}
```

`app/(app)/settings/page.tsx`:

```typescript
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Settings {
  user: { id: string; name: string | null; email: string };
  workspace: { name: string; allowDuplicateLeads: boolean; skipLowIcpLeads: boolean };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setSettings);
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: settings.user.name,
        workspaceName: settings.workspace.name,
        allowDuplicateLeads: settings.workspace.allowDuplicateLeads,
        skipLowIcpLeads: settings.workspace.skipLowIcpLeads,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!settings) return <div style={{ color: "var(--text-muted)" }}>Loading…</div>;

  function updateUser(k: keyof typeof settings.user, v: string) {
    setSettings(s => s ? { ...s, user: { ...s.user, [k]: v } } : s);
  }
  function updateWs(k: keyof typeof settings.workspace, v: string | boolean) {
    setSettings(s => s ? { ...s, workspace: { ...s.workspace, [k]: v } } : s);
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Changes save when you click Save.</p>
      </div>

      {/* Profile */}
      <section className="space-y-4">
        <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Profile</h2>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Name</Label>
          <Input value={settings.user.name ?? ""} onChange={e => updateUser("name", e.target.value)}
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        </div>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Email</Label>
          <Input value={settings.user.email} disabled
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", opacity: 0.6 }} />
        </div>
      </section>

      {/* Organisation */}
      <section className="space-y-4">
        <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Organisation</h2>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Workspace name</Label>
          <Input value={settings.workspace.name} onChange={e => updateWs("name", e.target.value)}
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Allow duplicate leads across campaigns</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              When off, a lead can only exist in one active campaign at a time.
            </p>
          </div>
          <Switch checked={settings.workspace.allowDuplicateLeads}
            onCheckedChange={v => updateWs("allowDuplicateLeads", v)} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Skip low ICP leads</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Leads scored below 40 are never contacted.
            </p>
          </div>
          <Switch checked={settings.workspace.skipLowIcpLeads}
            onCheckedChange={v => updateWs("skipLowIcpLeads", v)} />
        </div>
      </section>

      <Button onClick={save} disabled={saving} style={{ background: "var(--accent)", color: "#fff" }}>
        {saved ? "Saved!" : saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/\(app\)/dashboard/ app/\(app\)/settings/ app/\(app\)/automation/ app/api/dashboard/ app/api/automation/ app/api/settings/
git commit -m "feat: dashboard, settings, and automation log pages"
```

---

## Task 11: Worker Pipeline

**Files:**
- Create: `worker/index.ts`
- Create: `worker/enrich.ts`
- Create: `worker/score.ts`
- Create: `worker/send.ts`
- Create: `worker/sync-inbox.ts`
- Create: `worker/reset-limits.ts`
- Create: `app/api/worker/tick/route.ts`
- Create: `worker/Dockerfile`

**Interfaces:**
- Produces: background worker that calls `POST /api/worker/tick` every 2 minutes

- [ ] **Step 1: Write `app/api/worker/tick/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { fillTemplate, parseLocation } from "@/lib/templates";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function verifySecret(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.WORKER_SECRET}`;
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: string[] = [];

  // 1. Reset daily limits at midnight
  const accounts = await prisma.linkedInAccount.findMany();
  for (const acc of accounts) {
    const resetDate = new Date(acc.limitsResetAt);
    const now = new Date();
    if (now.getDate() !== resetDate.getDate() || now.getMonth() !== resetDate.getMonth()) {
      await prisma.linkedInAccount.update({
        where: { id: acc.id },
        data: { connSentToday: 0, msgSentToday: 0, limitsResetAt: now },
      });
      await log(acc.workspaceId, "RESET_DAILY_LIMITS", "COMPLETED", "Limits reset");
    }
  }

  // 2. Enrich leads (NEW → ENRICHED)
  const newLeads = await prisma.lead.findMany({
    where: { status: "NEW" },
    include: { campaign: { include: { linkedInAccount: true } } },
    take: 10,
  });

  for (const lead of newLeads) {
    const logId = await log(lead.workspaceId, "ENRICH_LEAD", "EXECUTING", null);
    try {
      const profile = await unipile.getProfile(
        lead.campaign.linkedInAccount.unipileAccountId,
        lead.linkedInProfileId
      );
      const loc = parseLocation(profile.location);
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          headline: profile.headline ?? lead.headline,
          company: profile.company_name ?? lead.company,
          location: profile.location ?? lead.location,
          avatarUrl: profile.profile_picture_url ?? lead.avatarUrl,
          status: "ENRICHED",
          enrichedAt: new Date(),
        },
      });
      await completeLog(logId, "COMPLETED", `Enriched ${lead.name}`);
      results.push(`enriched:${lead.id}`);
    } catch (err) {
      await completeLog(logId, "FAILED", String(err));
    }
  }

  // 3. Score leads (ENRICHED → QUEUED)
  const enrichedLeads = await prisma.lead.findMany({
    where: { status: "ENRICHED" },
    include: { campaign: { select: { positioningText: true } } },
    take: 10,
  });

  for (const lead of enrichedLeads) {
    const logId = await log(lead.workspaceId, "SCORE_LEAD", "EXECUTING", null);
    try {
      const positioning = lead.campaign.positioningText ?? "A UK web design agency";
      const prompt = `You are scoring a LinkedIn lead for ICP fit. Score from 0-100.

Business positioning: ${positioning}

Lead:
- Name: ${lead.name}
- Headline: ${lead.headline ?? "unknown"}
- Company: ${lead.company ?? "unknown"}
- Location: ${lead.location ?? "unknown"}

Reply with only a JSON object: {"score": <number 0-100>, "reason": "<one sentence>"}`;

      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "{}";
      const parsed = JSON.parse(text.match(/\{.*\}/s)?.[0] ?? "{}");
      const score = typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 50;

      const workspace = await prisma.workspace.findUnique({ where: { id: lead.workspaceId } });
      const skip = workspace?.skipLowIcpLeads && score < 40;

      await prisma.lead.update({
        where: { id: lead.id },
        data: { icpScore: score, status: skip ? "SKIPPED" : "QUEUED" },
      });
      await completeLog(logId, "COMPLETED", `Score: ${score}${skip ? " (skipped, low ICP)" : ""}`);
      results.push(`scored:${lead.id}:${score}`);
    } catch (err) {
      await prisma.lead.update({ where: { id: lead.id }, data: { status: "QUEUED", icpScore: 50 } });
      await completeLog(logId, "FAILED", String(err));
    }
  }

  // 4. Send messages (QUEUED → CONTACTED or PENDING_APPROVAL)
  const activeCampaigns = await prisma.campaign.findMany({
    where: { status: "ACTIVE" },
    include: { linkedInAccount: true },
  });

  for (const campaign of activeCampaigns) {
    const acc = campaign.linkedInAccount;
    const remaining = acc.dailyConnLimit - acc.connSentToday;
    if (remaining <= 0) continue;

    const queuedLeads = await prisma.lead.findMany({
      where: { campaignId: campaign.id, status: "QUEUED" },
      orderBy: { icpScore: "desc" },
      take: Math.min(remaining, 5),
    });

    for (const lead of queuedLeads) {
      if (!campaign.connectionNoteTemplate) continue;
      const logId = await log(lead.workspaceId, "SEND_MESSAGE", "EXECUTING", null);
      try {
        const loc = parseLocation(lead.location);
        const content = fillTemplate(campaign.connectionNoteTemplate, {
          name: lead.name.split(" ")[0],
          company: lead.company,
          headline: lead.headline,
          city: loc.city,
          country: loc.country,
        });

        if (campaign.requireApproval) {
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "PENDING_APPROVAL",
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "PENDING_APPROVAL" } });
          await completeLog(logId, "COMPLETED", `Queued for approval: ${lead.name}`);
        } else {
          await unipile.sendConnectionRequest(acc.unipileAccountId, lead.linkedInProfileId,
            campaign.type === "CONNECT_NOTE" ? content : undefined);
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "SENT", sentAt: new Date(),
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "CONTACTED", contactedAt: new Date() } });
          await prisma.linkedInAccount.update({ where: { id: acc.id }, data: { connSentToday: { increment: 1 } } });
          await prisma.event.create({
            data: { workspaceId: lead.workspaceId, campaignId: campaign.id, leadId: lead.id, type: "message_sent" },
          });
          await completeLog(logId, "COMPLETED", `Sent to ${lead.name}`);
          results.push(`sent:${lead.id}`);
        }
      } catch (err) {
        await completeLog(logId, "FAILED", String(err));
      }
    }
  }

  // 5. Follow-up check
  for (const campaign of activeCampaigns.filter(c => c.followUpsEnabled && c.followUpTemplate)) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - campaign.followUpDelayDays);

    const acceptedLeads = await prisma.lead.findMany({
      where: {
        campaignId: campaign.id,
        status: "ACCEPTED",
        acceptedAt: { lte: cutoff },
        messages: { none: { type: "FOLLOWUP" } },
      },
      take: 5,
    });

    for (const lead of acceptedLeads) {
      const loc = parseLocation(lead.location);
      const content = fillTemplate(campaign.followUpTemplate!, {
        name: lead.name.split(" ")[0],
        company: lead.company,
        headline: lead.headline,
        city: loc.city,
        country: loc.country,
      });

      await prisma.message.create({
        data: {
          leadId: lead.id, campaignId: campaign.id,
          type: "FOLLOWUP", content,
          status: campaign.requireApproval ? "PENDING_APPROVAL" : "PENDING_APPROVAL",
        },
      });
    }
  }

  // 6. Sync inbox
  const allAccounts = await prisma.linkedInAccount.findMany({ where: { status: "ACTIVE" } });
  for (const acc of allAccounts) {
    const logId = await log(acc.workspaceId, "SYNC_INBOX", "EXECUTING", null);
    try {
      const inbox = await unipile.getInbox(acc.unipileAccountId);
      for (const thread of inbox.items) {
        const lead = await prisma.lead.findFirst({
          where: { campaign: { linkedInAccountId: acc.id } },
          // Match by conversation attendee — simplified; real match uses LinkedIn ID
        });

        await prisma.conversation.upsert({
          where: { unipileThreadId: thread.id },
          create: {
            workspaceId: acc.workspaceId,
            leadId: lead?.id ?? "_placeholder_",
            unipileThreadId: thread.id,
            lastMessageAt: new Date(thread.last_message_at),
            lastMessagePreview: thread.last_message_text?.slice(0, 100),
            hasUnread: thread.unread,
          },
          update: {
            lastMessageAt: new Date(thread.last_message_at),
            lastMessagePreview: thread.last_message_text?.slice(0, 100),
            hasUnread: thread.unread,
          },
        }).catch(() => {});
      }
      await completeLog(logId, "COMPLETED", `Synced ${inbox.items.length} threads`);
    } catch (err) {
      await completeLog(logId, "FAILED", String(err));
    }
  }

  return NextResponse.json({ ok: true, results });
}

async function log(workspaceId: string, taskType: string, status: string, result: string | null) {
  const entry = await prisma.automationLog.create({
    data: { workspaceId, taskType: taskType as never, status: status as never, result },
  });
  return entry.id;
}

async function completeLog(id: string, status: string, result: string) {
  await prisma.automationLog.update({
    where: { id },
    data: { status: status as never, result, completedAt: new Date() },
  });
}
```

- [ ] **Step 2: Write `worker/index.ts`**

```typescript
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const WORKER_SECRET = process.env.WORKER_SECRET ?? "";
const INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

async function tick() {
  console.log(`[worker] tick at ${new Date().toISOString()}`);
  try {
    const res = await fetch(`${APP_URL}/api/worker/tick`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WORKER_SECRET}` },
    });
    const data = await res.json();
    console.log(`[worker] done:`, data);
  } catch (err) {
    console.error(`[worker] error:`, err);
  }
}

tick();
setInterval(tick, INTERVAL_MS);
```

- [ ] **Step 3: Write `worker/Dockerfile`**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "tsx", "worker/index.ts"]
```

- [ ] **Step 4: Commit**

```bash
git add app/api/worker/ worker/
git commit -m "feat: worker pipeline — enrich, score, send, follow-ups, inbox sync"
```

---

## Task 12: Marketing Page + Docker Deployment

**Files:**
- Create: `app/(marketing)/page.tsx`
- Create: `app/(marketing)/layout.tsx`
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `nixpacks.toml` (optional Coolify hint)

- [ ] **Step 1: Write `app/(marketing)/layout.tsx`**

```typescript
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `app/(marketing)/page.tsx`**

```typescript
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Scribtly</span>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}
          className="text-sm font-medium px-4 py-2 rounded-lg"
          style={{ background: "var(--accent)", color: "#fff" }}>
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24">
        <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight"
          style={{ color: "var(--text-primary)" }}>
          LinkedIn outreach that{" "}
          <span style={{ color: "var(--accent)" }}>books meetings</span>
        </h1>
        <p className="mt-6 text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
          Find your ideal customers on LinkedIn, send personalised connection requests at scale,
          and turn replies into booked calls — automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <a href="https://book.octelis.com"
            className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
            style={{ background: "var(--accent)" }}
            onMouseOver={e => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseOut={e => (e.currentTarget.style.background = "var(--accent)")}>
            Book a call to get access
          </a>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
          Invite-only. No self-serve signup.
        </p>
      </main>

      {/* Features */}
      <section className="px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Smart Prospecting", body: "Describe your ideal customer in plain English. We find them on LinkedIn and score each lead against your ICP." },
            { title: "Personalised at scale", body: "Connection notes and follow-ups use real profile data — name, company, headline, city. No mail-merge feel." },
            { title: "Inbox that converts", body: "All replies in one place. Auto Book detects interest and sends your Calendly link before you even open the app." },
          ].map(f => (
            <div key={f.title} className="rounded-xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        Powered by{" "}
        <a href="https://octelis.com" target="_blank" rel="noopener noreferrer"
          className="underline" style={{ color: "var(--accent)" }}>
          octelis.com
        </a>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Write `Dockerfile` (app container)**

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 4: Update `next.config.ts` to enable standalone output**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "**.licdn.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Write `docker-compose.yml`**

```yaml
version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      DIRECT_URL: ${DIRECT_URL}
      UNIPILE_DSN: ${UNIPILE_DSN}
      UNIPILE_API_TOKEN: ${UNIPILE_API_TOKEN}
      WORKER_SECRET: ${WORKER_SECRET}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      NEXT_PUBLIC_APP_URL: ${NEXT_PUBLIC_APP_URL}
      NEXT_PUBLIC_CONNECT_URL: ${NEXT_PUBLIC_CONNECT_URL}
      NODE_ENV: production
    restart: unless-stopped

  worker:
    build:
      context: .
      dockerfile: worker/Dockerfile
    environment:
      NEXT_PUBLIC_APP_URL: ${NEXT_PUBLIC_APP_URL}
      WORKER_SECRET: ${WORKER_SECRET}
    depends_on:
      - app
    restart: unless-stopped
```

- [ ] **Step 6: Run DB migration in production**

Before first deploy, run:
```bash
DATABASE_URL="your-prod-db-url" npx prisma migrate deploy
```

On Coolify, set this as a deploy hook command.

- [ ] **Step 7: Final end-to-end smoke test**

1. `npm run dev` — visit http://localhost:3000 → marketing page
2. Visit http://localhost:3000/signup → create account
3. Visit http://localhost:3000/dashboard → stats all zero
4. Visit http://localhost:3000/accounts → no accounts
5. Connect LinkedIn via connect.scribtly.com/linkedin (or localhost:3000/connect/linkedin)
6. Visit http://localhost:3000/campaigns/new → complete 5-step wizard
7. Open campaign → Leads tab → Smart Prospecting → enter query → preview profiles
8. Import leads → automation log shows ENRICH_LEAD tasks within 2 min
9. Approvals tab → if requireApproval=true, messages appear for review
10. Inbox → synced conversations appear after worker runs

- [ ] **Step 8: Commit everything**

```bash
git add .
git commit -m "feat: marketing page, Docker deployment, complete platform"
```

---

## Coolify Deployment Checklist

1. Create new project in Coolify
2. Add `app` service — Docker Compose source, select `app` service
3. Add `worker` service — same compose file, select `worker` service
4. Set all env vars from `.env.example` in Coolify UI
5. Add domain `app.scribtly.com` → app service port 3000
6. Add domain `connect.scribtly.com` → app service port 3000 (same container, middleware routes)
7. Add domain `scribtly.com` → app service port 3000
8. In Cloudflare: set `scribtly.com`, `app.scribtly.com`, `connect.scribtly.com` → Coolify IP, proxy on
9. Deploy
10. Run `prisma migrate deploy` via Coolify terminal or SSH
