# Talisman-Style UI Reskin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin ScribtlyProspecting to match Talisman's clean white minimal aesthetic: white sidebar with bold active indicator, page header bar, wider stat cards with sublabels, Recharts line chart on dashboard, and restructured campaign cards.

**Architecture:** Pure UI changes across 6 files. No new dependencies needed (recharts already installed). The dashboard API gains a `dailyActivity` field computed server-side in JS by grouping existing message/event records by date. All other changes are component layout and CSS variable updates.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4, shadcn/ui, recharts, lucide-react

## Global Constraints

- Keep `--accent: #E07830` — brand colour, do not change
- Do not add new npm dependencies — recharts is already installed
- Do not touch any API routes other than `app/api/dashboard/route.ts`
- Do not change any backend logic, only the dashboard stats response shape
- Inline `style={{}}` props are acceptable alongside Tailwind when targeting CSS variables
- No TypeScript `any` — keep all types explicit

---

## File Map

| File | Change |
|---|---|
| `app/globals.css` | Remove beige from layout, keep only as component-level token |
| `components/layout/sidebar.tsx` | White bg, bold+left-border active state, remove logo border-b |
| `components/layout/page-header.tsx` | **NEW** — client component: pathname→title, sticky header bar |
| `app/(app)/layout.tsx` | Import and render `PageHeader` above `<main>` |
| `app/api/dashboard/route.ts` | Add `dailyActivity: {date,sent,replied}[]` to response |
| `app/(app)/dashboard/page.tsx` | Wider stat cards with sublabels + Recharts LineChart |
| `app/(app)/campaigns/page.tsx` | Restructure campaign card: info / stats / actions rows |

---

### Task 1: Update global CSS tokens

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `--bg-subtle` no longer used as sidebar/layout background; kept as component token

- [ ] **Step 1: Replace globals.css**

```css
@import "tailwindcss";

:root {
  --bg-base: #FFFFFF;
  --bg-subtle: #F5F5F5;
  --text-primary: #0F0F12;
  --text-muted: #6B7280;
  --accent: #E07830;
  --accent-hover: #C4652A;
  --border: #E5E7EB;
  --dark: #1A1A1A;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  border-color: var(--border);
}
```

- [ ] **Step 2: Verify**

Start the dev server (`npm run dev`) and open any page. Confirm the beige sidebar background is gone — sidebar should now be white. Confirm borders are still visible (light gray).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: switch design tokens to clean white/gray palette"
```

---

### Task 2: Reskin sidebar

**Files:**
- Modify: `components/layout/sidebar.tsx`

**Interfaces:**
- Consumes: `--accent`, `--border`, `--text-primary`, `--text-muted` CSS variables
- Produces: `<Sidebar>` and `<MobileSidebarTrigger>` with white background + bold/left-border active state

- [ ] **Step 1: Replace sidebar.tsx**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Send, Inbox, Users, Zap, Settings, LogOut, Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Send },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/accounts", label: "Accounts", icon: Users },
];

const configure = [
  { href: "/automation", label: "Automation", icon: Zap },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ pathname }: { pathname: string }) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6">
        <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
          Scribtly
        </span>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
              style={{
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: active ? 600 : 400,
                borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                background: "transparent",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
        <div className="pt-4 pb-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}>Configure</p>
        </div>
        {configure.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
              style={{
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: active ? 600 : 400,
                borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                background: "transparent",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full transition-colors hover:bg-red-50"
          style={{ color: "var(--text-muted)" }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="hidden md:flex flex-col w-56 shrink-0 min-h-screen border-r"
      style={{ background: "#ffffff", borderColor: "var(--border)" }}
    >
      <NavLinks pathname={pathname} />
    </aside>
  );
}

export function MobileSidebarTrigger() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden p-2 bg-transparent border-0 cursor-pointer"
        style={{ color: "var(--text-primary)" }}
      >
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-56"
        style={{ background: "#ffffff", borderColor: "var(--border)" }}
      >
        <NavLinks pathname={pathname} />
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 2: Verify**

Open the app. Confirm sidebar is white. Click Dashboard — nav item should be bold with an orange left bar. Click Campaigns — same. No orange background fill on any nav item.

- [ ] **Step 3: Commit**

```bash
git add components/layout/sidebar.tsx
git commit -m "style: white sidebar with bold+left-border active nav state"
```

---

### Task 3: Add page header bar

**Files:**
- Create: `components/layout/page-header.tsx`
- Modify: `app/(app)/layout.tsx`

**Interfaces:**
- Produces: `<PageHeader>` client component that reads `usePathname()`, maps route to title, renders sticky bar
- Consumes: `MobileSidebarTrigger` from sidebar (kept for mobile)

- [ ] **Step 1: Create components/layout/page-header.tsx**

```tsx
"use client";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/campaigns": "Campaigns",
  "/inbox": "Inbox",
  "/accounts": "Accounts",
  "/automation": "Automation",
  "/settings": "Settings",
};

function getTitle(pathname: string): string {
  for (const [prefix, title] of Object.entries(TITLES)) {
    if (pathname.startsWith(prefix)) return title;
  }
  return "Scribtly";
}

export function PageHeader() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <div
      className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 border-b"
      style={{ background: "#ffffff", borderColor: "var(--border)" }}
    >
      <PanelLeft size={18} style={{ color: "var(--text-muted)" }} />
      <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h1>
    </div>
  );
}
```

- [ ] **Step 2: Update app/(app)/layout.tsx**

```tsx
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Sidebar, MobileSidebarTrigger } from "@/components/layout/sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { AppFooter } from "@/components/layout/app-footer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen" style={{ background: "#ffffff" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b md:hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <MobileSidebarTrigger />
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</span>
        </div>
        {/* Desktop page header */}
        <div className="hidden md:block">
          <PageHeader />
        </div>
        <main className="flex-1 px-6 py-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Remove h1 from dashboard page**

In `app/(app)/dashboard/page.tsx`, remove this line (the title is now in the header bar):
```tsx
<h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
```

- [ ] **Step 4: Remove h1 from campaigns page**

In `app/(app)/campaigns/page.tsx`, remove this line:
```tsx
<h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Campaigns</h1>
```

- [ ] **Step 5: Verify**

Navigate to /dashboard. A sticky header bar should appear at the top of the content area showing `⊟ Dashboard`. Navigate to /campaigns — it should show `⊟ Campaigns`. On mobile, the old top bar still shows.

- [ ] **Step 6: Commit**

```bash
git add components/layout/page-header.tsx app/(app)/layout.tsx app/(app)/dashboard/page.tsx app/(app)/campaigns/page.tsx
git commit -m "feat: add sticky page header bar with route-derived title"
```

---

### Task 4: Add dailyActivity to dashboard API

**Files:**
- Modify: `app/api/dashboard/route.ts`

**Interfaces:**
- Produces: `dailyActivity: Array<{ date: string; sent: number; replied: number }>` — 14 entries, newest last, date format `"YYYY-MM-DD"`

- [ ] **Step 1: Replace app/api/dashboard/route.ts**

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wid = user.workspaceId;

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [totalLeads, totalSent, totalReplied, campaigns, recentEvents, sentMessages, replyEvents] =
    await Promise.all([
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
      prisma.message.findMany({
        where: {
          campaign: { workspaceId: wid },
          status: "SENT",
          sentAt: { gte: fourteenDaysAgo },
        },
        select: { sentAt: true },
      }),
      prisma.event.findMany({
        where: {
          workspaceId: wid,
          type: "REPLY_RECEIVED",
          createdAt: { gte: fourteenDaysAgo },
        },
        select: { createdAt: true },
      }),
    ]);

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

  const dailyActivity: Array<{ date: string; sent: number; replied: number }> = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const sent = sentMessages.filter(
      m => m.sentAt != null && m.sentAt.toISOString().split("T")[0] === dateStr
    ).length;
    const replied = replyEvents.filter(
      e => e.createdAt.toISOString().split("T")[0] === dateStr
    ).length;
    dailyActivity.push({ date: dateStr, sent, replied });
  }

  return NextResponse.json({
    totalLeads,
    totalSent,
    totalReplied,
    responseRate,
    campaigns: campaignStats,
    recentEvents,
    dailyActivity,
  });
}
```

- [ ] **Step 2: Verify**

Visit `http://localhost:3000/api/dashboard` in the browser (while logged in). Confirm the response JSON includes a `dailyActivity` array with 14 objects, each having `date`, `sent`, and `replied` fields.

- [ ] **Step 3: Commit**

```bash
git add app/api/dashboard/route.ts
git commit -m "feat: add dailyActivity 14-day breakdown to dashboard API"
```

---

### Task 5: Redesign dashboard page

**Files:**
- Modify: `app/(app)/dashboard/page.tsx`

**Interfaces:**
- Consumes: `dailyActivity: Array<{ date: string; sent: number; replied: number }>` from dashboard API (added in Task 4)
- Consumes: `recharts` — `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip`, `ResponsiveContainer`, `CartesianGrid`

- [ ] **Step 1: Replace app/(app)/dashboard/page.tsx**

```tsx
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

  const CARDS = [
    { label: "Total Leads", value: stats.totalLeads, sub: "imported leads", ratio: stats.totalLeads > 0 ? stats.campaigns.reduce((a, c) => a + c.contacted, 0) / stats.totalLeads : 0 },
    { label: "Messages Sent", value: stats.totalSent, sub: "total delivered", ratio: null },
    { label: "Replies", value: stats.totalReplied, sub: "conversations started", ratio: null },
    { label: "Response Rate", value: `${stats.responseRate}%`, sub: "of messages sent", ratio: null },
  ];

  const chartData = stats.dailyActivity.map(d => ({
    day: d.date.slice(5), // "MM-DD"
    Sent: d.sent,
    Replies: d.replied,
  }));

  return (
    <div className="space-y-6">
      {/* Stat cards — horizontal with border separators */}
      <div
        className="flex border rounded-xl overflow-hidden"
        style={{ borderColor: "var(--border)", background: "#ffffff" }}
      >
        {CARDS.map((card, i) => (
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
```

- [ ] **Step 2: Verify**

Open /dashboard. Confirm:
- 4 stat cards in a single bordered row with separators (not a gap grid)
- Numbers are large (`text-4xl`), sublabels visible below
- A line chart renders below the stats (may be flat if no data yet — that's fine)
- Recent activity items are bordered cards, not a bullet list

- [ ] **Step 3: Commit**

```bash
git add app/(app)/dashboard/page.tsx
git commit -m "feat: redesign dashboard with wide stat cards and recharts activity chart"
```

---

### Task 6: Restructure campaign cards

**Files:**
- Modify: `app/(app)/campaigns/page.tsx`

**Interfaces:**
- Consumes: same `/api/campaigns` response as before (no API change needed)

- [ ] **Step 1: Replace app/(app)/campaigns/page.tsx**

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Plus, Pause, Play, Pencil, Trash2 } from "lucide-react";

interface Campaign {
  id: string; name: string; status: string; type: string; createdAt: string;
  linkedInAccount: { name: string };
  stats: { leads: number; contacted: number; accepted: number; replied: number };
}

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "#22c55e",
  DRAFT: "#9ca3af",
  PAUSED: "#f59e0b",
  COMPLETED: "#9ca3af",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await fetch("/api/campaigns");
    if (res.ok) setCampaigns(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(id: string) {
    await fetch(`/api/campaigns/${id}/activate`, { method: "POST" });
    load();
  }

  async function deleteCampaign(id: string) {
    if (!confirm("Delete this campaign and all its leads?")) return;
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Search campaigns…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
          style={{ borderColor: "var(--border)", background: "#ffffff" }}
        />
        <Link
          href="/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-auto"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <Plus size={16} />New campaign
        </Link>
      </div>

      {filtered.length === 0 && (
        <div
          className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "#ffffff" }}
        >
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No campaigns yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Create your first campaign to start reaching out.
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            New campaign
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(c => (
          <div
            key={c.id}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)", background: "#ffffff" }}
          >
            {/* Top: name + account */}
            <div className="px-5 pt-4 pb-3">
              <div className="flex items-center gap-2 mb-0.5">
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
              <p className="text-xs ml-4" style={{ color: "var(--text-muted)" }}>
                {c.linkedInAccount.name} · {c.type.replace("_", " ")}
              </p>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-0 border-t border-b px-5 py-4"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { label: "leads", value: c.stats.leads },
                { label: "contacted", value: c.stats.contacted },
                { label: "accepted", value: c.stats.accepted },
                { label: "replied", value: c.stats.replied },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Bottom: date + actions */}
            <div className="flex items-center justify-between px-5 py-2.5">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(c.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStatus(c.id)}
                  className="p-1.5 rounded hover:bg-gray-50"
                  style={{ color: "var(--text-muted)" }}
                  title={c.status === "ACTIVE" ? "Pause" : "Activate"}
                >
                  {c.status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <Link
                  href={`/campaigns/${c.id}/overview`}
                  className="p-1.5 rounded hover:bg-gray-50"
                  style={{ color: "var(--text-muted)" }}
                  title="Edit"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="p-1.5 rounded hover:bg-red-50"
                  style={{ color: "var(--text-muted)" }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Open /campaigns. Each campaign card should now have three distinct rows:
1. Status dot + name + account/type (top)
2. Stats grid — leads / contacted / accepted / replied with numbers above labels (middle, bordered)
3. Creation date on left, action icons on right (bottom)

- [ ] **Step 3: Commit**

```bash
git add app/(app)/campaigns/page.tsx
git commit -m "style: restructure campaign cards to match Talisman layout"
```

---

## Done

All 6 tasks complete. The platform should now have:
- White sidebar with bold + orange left-bar active indicator
- Sticky page header bar showing current page title
- Wide stat cards in a bordered horizontal row with sublabels
- Recharts line chart (Sent vs Replies, last 14 days)
- Campaign cards with info / stats / actions rows
