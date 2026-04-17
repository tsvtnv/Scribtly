# Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-protected internal admin dashboard at `/admin` showing all workspace/user data, revenue metrics, and platform health — styled with the same components as the main app.

**Architecture:** Separate `app/admin/` route group with its own layout, outside Clerk auth. Auth is a hardcoded HMAC-signed cookie (`admin_session`) checked by Next.js middleware. All data pages are server components querying Prisma directly. One API route handles login.

**Tech Stack:** Next.js 14 App Router, Prisma, `crypto` (Node built-in for HMAC), existing UI components (Card, Button, Input, Badge), Tailwind.

---

## File Map

**Create:**
- `app/admin/layout.tsx` — minimal layout (no Sidebar), just bg + font
- `app/admin/login/page.tsx` — login form (client component)
- `app/admin/page.tsx` — overview: MRR, signups, scripts, plan breakdown
- `app/admin/users/page.tsx` — searchable/sortable workspace table
- `app/admin/users/[id]/page.tsx` — workspace detail: clients, recent scripts, members
- `app/api/admin/auth/route.ts` — POST login → set cookie; DELETE logout
- `lib/adminAuth.ts` — `signAdminToken()`, `verifyAdminToken()`, `requireAdmin()` (for server components)

**Modify:**
- `middleware.ts` — add `/admin/login` and `/api/admin/auth` to public routes; add admin cookie check for `/admin/*`

---

### Task 1: Admin auth helpers + middleware

**Files:**
- Create: `lib/adminAuth.ts`
- Modify: `middleware.ts`

- [ ] **Step 1: Add `ADMIN_SECRET` to `.env.example`**

Add this line to `.env.example`:
```
# Admin — set a long random string
ADMIN_SECRET=your-admin-secret-here
```

- [ ] **Step 2: Create `lib/adminAuth.ts`**

```typescript
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = process.env.ADMIN_SECRET ?? "dev-secret";
const COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

async function hmac(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(sig).toString("hex");
}

export async function signAdminToken(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(ts);
  return `${ts}.${sig}`;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  // Expire after 8 hours
  if (Date.now() - parseInt(ts, 10) > COOKIE_MAX_AGE * 1000) return false;
  const expected = await hmac(ts);
  return expected === sig;
}

export async function requireAdmin() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) redirect("/admin/login");
  const valid = await verifyAdminToken(token);
  if (!valid) redirect("/admin/login");
}

export { COOKIE, COOKIE_MAX_AGE };
```

- [ ] **Step 3: Update `middleware.ts` to pass `/admin/login` and `/api/admin/auth` through Clerk without protecting them, and let `/admin/*` bypass Clerk entirely**

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/pricing",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/login(.*)",
  "/signup(.*)",
  "/api/stripe/webhook",
  "/api/webhooks/clerk",
  "/invite/(.*)",
  "/review/(.*)",
  "/api/review/(.*)",
  "/unsubscribed",
  "/api/user/unsubscribe",
  "/admin(.*)",         // admin has its own cookie auth
  "/api/admin/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
```

- [ ] **Step 4: Commit**

```bash
git add lib/adminAuth.ts middleware.ts .env.example
git commit -m "feat(admin): auth helpers and middleware bypass for /admin routes"
```

---

### Task 2: Login API route + login page

**Files:**
- Create: `app/api/admin/auth/route.ts`
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: Create `app/api/admin/auth/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, verifyAdminToken, COOKIE, COOKIE_MAX_AGE } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  if (!password || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = await signAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}
```

- [ ] **Step 2: Create `app/admin/login/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
      <Card className="w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-lg font-semibold">Admin access</h1>
          <p className="text-sm text-text-secondary mt-0.5">Scribtly internal dashboard</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="text-xs text-danger">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/auth/route.ts app/admin/login/page.tsx
git commit -m "feat(admin): login page and auth API route"
```

---

### Task 3: Admin layout

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/AdminNav.tsx`

- [ ] **Step 1: Create `app/admin/AdminNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Workspaces", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex flex-col w-52 min-h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
      <div className="px-5 pt-6 pb-4">
        <div className="text-lg font-semibold tracking-tight">Scribtly</div>
        <div className="text-xs text-danger font-medium mt-0.5">Admin</div>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium"
                  : "text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)]"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-3 border-t border-[var(--color-border)]">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-md text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Create `app/admin/layout.tsx`**

```tsx
import { requireAdmin } from "@/lib/adminAuth";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      <AdminNav />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/layout.tsx app/admin/AdminNav.tsx
git commit -m "feat(admin): layout with sidebar nav and logout"
```

---

### Task 4: Overview page (MRR + platform stats)

**Files:**
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Create `app/admin/page.tsx`**

```tsx
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/adminAuth";

const PLAN_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 5,
  PRO: 19,
  AGENCY: 49,
  ENTERPRISE: 0, // custom
};

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-xs text-text-secondary mt-1">{sub}</div>}
    </Card>
  );
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const [
    workspaces,
    totalScripts,
    scriptsToday,
    scriptsThisWeek,
    newWorkspacesToday,
    newWorkspacesThisWeek,
  ] = await Promise.all([
    prisma.workspace.findMany({ select: { plan: true, stripeSubscriptionId: true } }),
    prisma.script.count(),
    prisma.script.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.script.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: weekStart } } }),
  ]);

  const planCounts: Record<string, number> = { FREE: 0, BASIC: 0, PRO: 0, AGENCY: 0, ENTERPRISE: 0 };
  let mrr = 0;
  for (const ws of workspaces) {
    planCounts[ws.plan] = (planCounts[ws.plan] ?? 0) + 1;
    if (ws.stripeSubscriptionId) mrr += PLAN_PRICE[ws.plan] ?? 0;
  }

  const totalWorkspaces = workspaces.length;
  const paying = workspaces.filter((w) => w.stripeSubscriptionId).length;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Overview</h1>
      <p className="text-sm text-text-secondary mb-8">Platform health at a glance</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Est. MRR" value={`£${mrr.toLocaleString()}`} sub={`${paying} paying`} />
        <StatCard label="Workspaces" value={totalWorkspaces.toString()} sub={`+${newWorkspacesToday} today · +${newWorkspacesThisWeek} this week`} />
        <StatCard label="Total scripts" value={totalScripts.toLocaleString()} sub={`${scriptsToday} today · ${scriptsThisWeek} this week`} />
        <StatCard label="Conversion" value={totalWorkspaces ? `${((paying / totalWorkspaces) * 100).toFixed(1)}%` : "0%"} sub="free → paid" />
      </div>

      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-4">Plan breakdown</h2>
        <div className="grid grid-cols-5 gap-3 text-center">
          {(["FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"] as const).map((plan) => (
            <div key={plan} className="space-y-1">
              <div className="text-2xl font-semibold">{planCounts[plan]}</div>
              <div className="text-xs text-text-secondary uppercase tracking-wide">{plan}</div>
              {PLAN_PRICE[plan] > 0 && (
                <div className="text-xs text-text-secondary">£{(planCounts[plan] * PLAN_PRICE[plan]).toLocaleString()}/mo</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/page.tsx
git commit -m "feat(admin): overview page with MRR, signups, script counts, plan breakdown"
```

---

### Task 5: Workspaces table page

**Files:**
- Create: `app/admin/users/page.tsx`
- Create: `app/admin/users/WorkspacesTable.tsx`

- [ ] **Step 1: Create `app/admin/users/WorkspacesTable.tsx`** (client component for search)

```tsx
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
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
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
                  {new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No workspaces match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-text-secondary">{filtered.length} of {rows.length} workspaces</p>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/admin/users/page.tsx`**

```tsx
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { WorkspacesTable } from "./WorkspacesTable";

export default async function AdminUsersPage() {
  await requireAdmin();

  const workspaces = await prisma.workspace.findMany({
    include: {
      owner: { select: { email: true } },
      _count: { select: { scripts: true, clients: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = workspaces.map((ws) => ({
    id: ws.id,
    name: ws.name,
    ownerEmail: ws.owner.email,
    plan: ws.plan,
    scriptCount: ws.scriptCount,
    totalScripts: ws._count.scripts,
    clientCount: ws._count.clients,
    hasSubscription: !!ws.stripeSubscriptionId,
    createdAt: ws.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Workspaces</h1>
      <p className="text-sm text-text-secondary mb-8">{rows.length} total workspaces</p>
      <WorkspacesTable rows={rows} />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/users/page.tsx app/admin/users/WorkspacesTable.tsx
git commit -m "feat(admin): workspaces table with live search"
```

---

### Task 6: Workspace detail page

**Files:**
- Create: `app/admin/users/[id]/page.tsx`

- [ ] **Step 1: Create `app/admin/users/[id]/page.tsx`**

```tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { Card } from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";

export default async function AdminWorkspaceDetailPage({ params }: { params: { id: string } }) {
  await requireAdmin();

  const ws = await prisma.workspace.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { email: true, name: true, createdAt: true } },
      members: { include: { user: { select: { email: true, name: true } } } },
      clients: { select: { id: true, name: true, niche: true, primaryPlatform: true, createdAt: true } },
      scripts: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, title: true, platform: true, status: true, wordCount: true, createdAt: true },
      },
      _count: { select: { scripts: true, clients: true } },
    },
  });

  if (!ws) notFound();

  const fields: [string, string][] = [
    ["Plan", ws.plan],
    ["Owner email", ws.owner.email],
    ["Owner name", ws.owner.name ?? "—"],
    ["Script count (month)", ws.scriptCount.toString()],
    ["Total scripts", ws._count.scripts.toString()],
    ["Total clients", ws._count.clients.toString()],
    ["Stripe customer ID", ws.stripeCustomerId ?? "—"],
    ["Stripe subscription ID", ws.stripeSubscriptionId ?? "—"],
    ["Script reset date", ws.scriptCountResetAt.toLocaleDateString("en-GB")],
    ["Created", ws.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Link href="/admin/users" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-4">
        <ArrowLeft size={14} /> All workspaces
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-1">{ws.name}</h1>
      <p className="text-sm text-text-secondary mb-6">{ws.id}</p>

      {/* Core info */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Details</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-text-secondary">{k}</dt>
              <dd className="text-sm font-medium break-all">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Members */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Team members ({ws.members.length})</h2>
        {ws.members.length === 0 ? (
          <p className="text-sm text-text-secondary">No members</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.members.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.user.email}</td>
                  <td className="py-2 text-text-secondary">{m.user.name ?? "—"}</td>
                  <td className="py-2">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Clients */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Clients ({ws.clients.length})</h2>
        {ws.clients.length === 0 ? (
          <p className="text-sm text-text-secondary">No clients yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Niche</th>
                <th className="pb-2 font-medium">Platform</th>
                <th className="pb-2 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.clients.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 font-medium">{c.name}</td>
                  <td className="py-2 text-text-secondary">{c.niche}</td>
                  <td className="py-2">{c.primaryPlatform}</td>
                  <td className="py-2 text-text-secondary">{new Date(c.createdAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Recent scripts */}
      <Card>
        <h2 className="text-sm font-semibold mb-3">Recent scripts (last 20 of {ws._count.scripts})</h2>
        {ws.scripts.length === 0 ? (
          <p className="text-sm text-text-secondary">No scripts yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Platform</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Words</th>
                <th className="pb-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.scripts.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 font-medium max-w-xs truncate">{s.title}</td>
                  <td className="py-2 text-text-secondary">{s.platform}</td>
                  <td className="py-2">{s.status}</td>
                  <td className="py-2 text-text-secondary">{s.wordCount ?? "—"}</td>
                  <td className="py-2 text-text-secondary whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/admin/users/[id]/page.tsx"
git commit -m "feat(admin): workspace detail page with members, clients, recent scripts"
```

---

### Task 7: Typecheck + final commit

- [ ] **Step 1: Run typecheck**

```bash
npx tsc --noEmit
```

Expected: 0 errors. If there are errors, fix them (most likely missing `requireAdmin` import or a Prisma field name mismatch).

- [ ] **Step 2: Add `ADMIN_SECRET` reminder in `.env.example` comment**

Verify `.env.example` has the `ADMIN_SECRET` line added in Task 1. Also add it to your local `.env.local` with a real value:
```
ADMIN_SECRET=pick-a-long-random-string-here
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(admin): complete admin dashboard — overview, workspaces table, workspace detail"
```
