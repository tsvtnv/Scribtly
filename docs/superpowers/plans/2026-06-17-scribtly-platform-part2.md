# Scribtly LinkedIn Outreach Platform — Implementation Plan (Part 2 of 4)

> Continues from Part 1. Tasks 4–7: App Shell, LinkedIn Accounts, Campaign Wizard, Smart Prospecting.

---

## Task 4: App Shell (Sidebar + Layout)

**Files:**
- Create: `components/layout/sidebar.tsx`
- Create: `components/layout/app-footer.tsx`
- Create: `app/(app)/layout.tsx`
- Create: `app/(app)/dashboard/page.tsx` (stub)

**Interfaces:**
- Consumes: `validateRequest()` from `lib/auth.ts`
- Produces: sidebar nav with Dashboard/Campaigns/Inbox/Accounts/Automation/Settings links; "Powered by octelis.com" footer

- [ ] **Step 1: Write `components/layout/sidebar.tsx`**

```typescript
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Send, Inbox, Users, Zap, Settings, LogOut
} from "lucide-react";

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

export function Sidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 min-h-screen border-r"
      style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
          Scribtly
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                color: active ? "var(--accent)" : "var(--text-muted)",
                background: active ? "rgba(224,120,48,0.08)" : "transparent",
              }}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}

        <div className="pt-4 pb-1">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}>Configure</p>
        </div>

        {configure.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                color: active ? "var(--accent)" : "var(--text-muted)",
                background: active ? "rgba(224,120,48,0.08)" : "transparent",
              }}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 rounded-md text-sm w-full transition-colors hover:bg-red-50"
          style={{ color: "var(--text-muted)" }}>
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Write `components/layout/app-footer.tsx`**

```typescript
export function AppFooter() {
  return (
    <footer className="px-6 py-3 border-t text-xs text-right"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
      Powered by{" "}
      <a href="https://octelis.com" target="_blank" rel="noopener noreferrer"
        className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
        octelis.com
      </a>
    </footer>
  );
}
```

- [ ] **Step 3: Write `app/(app)/layout.tsx`**

```typescript
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { AppFooter } from "@/components/layout/app-footer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write stub `app/(app)/dashboard/page.tsx`**

```typescript
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
      <p style={{ color: "var(--text-muted)" }}>Coming soon — campaigns first.</p>
    </div>
  );
}
```

- [ ] **Step 5: Add mobile sidebar toggle — update `components/layout/sidebar.tsx`**

Add a hamburger-accessible mobile sheet. At the top of the file add:

```typescript
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
```

Export a `MobileSidebarTrigger` component:

```typescript
export function MobileSidebarTrigger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2" style={{ color: "var(--text-primary)" }}>
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-56"
        style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
```

Extract the inner nav into `SidebarContent` and use it in both `Sidebar` and `MobileSidebarTrigger`. Update `app/(app)/layout.tsx` to show `MobileSidebarTrigger` in a top bar on mobile:

```typescript
<div className="flex-1 flex flex-col min-w-0">
  <div className="flex items-center gap-3 px-4 py-3 border-b md:hidden"
    style={{ borderColor: "var(--border)" }}>
    <MobileSidebarTrigger />
    <span className="font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</span>
  </div>
  <main className="flex-1 p-4 md:p-6">{children}</main>
  <AppFooter />
</div>
```

- [ ] **Step 6: Verify layout**

Visit http://localhost:3000/dashboard after logging in. Confirm sidebar shows with nav items and "Powered by octelis.com" footer. Resize to mobile, confirm hamburger appears.

- [ ] **Step 7: Commit**

```bash
git add components/layout/ app/\(app\)/
git commit -m "feat: app shell — sidebar nav, mobile layout, Octelis footer"
```

---

## Task 5: LinkedIn Accounts + connect.scribtly.com

**Files:**
- Create: `lib/unipile.ts`
- Create: `app/connect/linkedin/page.tsx`
- Create: `app/api/accounts/route.ts`
- Create: `app/api/accounts/[id]/route.ts`
- Create: `app/(app)/accounts/page.tsx`

**Interfaces:**
- Produces: `unipile` client from `lib/unipile.ts` with `createAccount()`, `getAccount()`, `searchPeople()`, `getProfile()`, `sendConnectionRequest()`, `sendMessage()`, `getInbox()`, `getMessages()`
- Produces: `GET /api/accounts` → `LinkedInAccount[]`, `DELETE /api/accounts/:id`

- [ ] **Step 1: Write `lib/unipile.ts`**

```typescript
const BASE_URL = `https://${process.env.UNIPILE_DSN}`;
const TOKEN = process.env.UNIPILE_API_TOKEN!;

const headers = {
  "X-API-KEY": TOKEN,
  "Content-Type": "application/json",
};

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unipile ${method} ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export interface UnipileAccount {
  id: string;
  name: string;
  avatar_url?: string;
  headline?: string;
  type: string;
}

export interface UnipilePerson {
  id: string;
  public_identifier: string;
  first_name: string;
  last_name: string;
  headline?: string;
  location?: string;
  profile_picture_url?: string;
  company_name?: string;
  profile_url: string;
}

export const unipile = {
  async createAccount(email: string, password: string): Promise<{ id: string }> {
    return req("POST", "/api/v1/accounts", {
      provider: "LINKEDIN",
      username: email,
      password,
    });
  },

  async getAccount(accountId: string): Promise<UnipileAccount> {
    return req("GET", `/api/v1/accounts/${accountId}`);
  },

  async deleteAccount(accountId: string): Promise<void> {
    await req("DELETE", `/api/v1/accounts/${accountId}`);
  },

  async searchPeople(accountId: string, query: string, limit = 15): Promise<{ items: UnipilePerson[] }> {
    return req("POST", `/api/v1/linkedin/search/people`, {
      account_id: accountId,
      query,
      limit,
    });
  },

  async getProfile(accountId: string, profileId: string): Promise<UnipilePerson> {
    return req("GET", `/api/v1/linkedin/profile/${profileId}?account_id=${accountId}`);
  },

  async sendConnectionRequest(
    accountId: string,
    profileId: string,
    message?: string
  ): Promise<{ id: string }> {
    return req("POST", `/api/v1/linkedin/invitation`, {
      account_id: accountId,
      linkedin_member_urn: profileId,
      message,
    });
  },

  async sendMessage(
    accountId: string,
    threadId: string,
    text: string
  ): Promise<{ id: string }> {
    return req("POST", `/api/v1/chats/${threadId}/messages`, {
      account_id: accountId,
      text,
    });
  },

  async getInbox(accountId: string, cursor?: string): Promise<{
    items: Array<{
      id: string;
      last_message_at: string;
      last_message_text: string;
      attendees: Array<{ id: string; name: string; avatar_url?: string }>;
      unread: boolean;
    }>;
    cursor?: string;
  }> {
    const qs = cursor ? `?cursor=${cursor}` : "";
    return req("GET", `/api/v1/chats?account_id=${accountId}${qs}`);
  },

  async getMessages(accountId: string, threadId: string): Promise<{
    items: Array<{
      id: string;
      text: string;
      sender_id: string;
      created_at: string;
    }>;
  }> {
    return req("GET", `/api/v1/chats/${threadId}/messages?account_id=${accountId}`);
  },
};
```

- [ ] **Step 2: Write `app/api/accounts/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accounts = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(accounts);
}
```

- [ ] **Step 3: Write `app/api/accounts/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await unipile.deleteAccount(account.unipileAccountId);
  } catch {
    // continue even if Unipile fails
  }

  await prisma.linkedInAccount.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Write `app/api/accounts/connect/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { email, password } = parsed.data;

  const created = await unipile.createAccount(email, password);
  const profile = await unipile.getAccount(created.id);

  const account = await prisma.linkedInAccount.create({
    data: {
      workspaceId: user.workspaceId,
      unipileAccountId: created.id,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      headline: profile.headline,
      limitsResetAt: new Date(),
    },
  });

  return NextResponse.json(account);
}
```

- [ ] **Step 5: Write `app/connect/linkedin/page.tsx`**

```typescript
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConnectLinkedInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/accounts/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to connect account");
      setLoading(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      window.location.href = `${appUrl}/accounts`;
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--bg-subtle)" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Connect LinkedIn</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Your credentials are sent securely to Unipile
          </p>
        </div>

        {success ? (
          <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
            <CardContent className="pt-6 text-center">
              <p className="text-green-600 font-medium">LinkedIn account connected!</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Redirecting back to accounts…</p>
            </CardContent>
          </Card>
        ) : (
          <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
            <CardHeader>
              <CardTitle style={{ color: "var(--text-primary)" }}>LinkedIn credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label style={{ color: "var(--text-muted)" }}>LinkedIn email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "var(--text-muted)" }}>LinkedIn password</Label>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full"
                  style={{ background: "var(--accent)", color: "#fff" }}>
                  {loading ? "Connecting…" : "Connect account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <p className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
          Powered by <a href="https://octelis.com" className="underline">octelis.com</a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Write `app/(app)/accounts/page.tsx`**

```typescript
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Plus, Wifi, WifiOff } from "lucide-react";

interface Account {
  id: string;
  name: string;
  avatarUrl: string | null;
  headline: string | null;
  status: string;
  connSentToday: number;
  dailyConnLimit: number;
  msgSentToday: number;
  dailyMsgLimit: number;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const connectUrl = process.env.NEXT_PUBLIC_CONNECT_URL ?? "http://localhost:3000";

  async function load() {
    const res = await fetch("/api/accounts");
    if (res.ok) setAccounts(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this LinkedIn account?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>LinkedIn Accounts</h1>
        <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
          <a href={`${connectUrl}/linkedin`}>
            <Plus size={16} className="mr-2" />
            Connect account
          </a>
        </Button>
      </div>

      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
        {accounts.length} / ∞ accounts
      </p>

      {accounts.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No LinkedIn accounts connected</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Connect your LinkedIn account to start sending outreach.
          </p>
          <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
            <a href={`${connectUrl}/linkedin`}>Connect LinkedIn</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.id} className="rounded-xl border p-4 flex items-center gap-4"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
              <Avatar className="w-12 h-12">
                <AvatarImage src={acc.avatarUrl ?? undefined} />
                <AvatarFallback style={{ background: "var(--bg-subtle)" }}>
                  {acc.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {acc.name}
                  </span>
                  <Badge variant="outline" className="text-xs"
                    style={{ borderColor: acc.status === "ACTIVE" ? "#22c55e" : "var(--border)",
                      color: acc.status === "ACTIVE" ? "#22c55e" : "var(--text-muted)" }}>
                    {acc.status === "ACTIVE" ? <Wifi size={10} className="mr-1" /> : <WifiOff size={10} className="mr-1" />}
                    {acc.status}
                  </Badge>
                </div>
                {acc.headline && (
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{acc.headline}</p>
                )}
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {acc.connSentToday}/{acc.dailyConnLimit} conn · {acc.msgSentToday}/{acc.dailyMsgLimit} msg today
                </p>
              </div>
              <button onClick={() => handleDelete(acc.id)}
                className="p-2 rounded-md hover:bg-red-50 transition-colors"
                style={{ color: "var(--text-muted)" }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add lib/unipile.ts app/connect/ app/api/accounts/ app/\(app\)/accounts/
git commit -m "feat: LinkedIn accounts — connect via Unipile, accounts page"
```

---

## Task 6: Campaign CRUD + 5-Step Wizard

**Files:**
- Create: `app/api/campaigns/route.ts`
- Create: `app/api/campaigns/[id]/route.ts`
- Create: `app/api/campaigns/[id]/activate/route.ts`
- Create: `components/campaigns/campaign-wizard.tsx`
- Create: `app/(app)/campaigns/page.tsx`
- Create: `app/(app)/campaigns/new/page.tsx`
- Create: `app/(app)/campaigns/[id]/page.tsx`

**Interfaces:**
- Produces: `GET /api/campaigns` → `Campaign[]`, `POST /api/campaigns` → `Campaign`, `PATCH /api/campaigns/:id`, `DELETE /api/campaigns/:id`, `POST /api/campaigns/:id/activate`

- [ ] **Step 1: Write `app/api/campaigns/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  linkedInAccountId: z.string(),
  type: z.enum(["CONNECT_NOTE", "CONNECT", "FIRST_DEGREE"]),
  positioningText: z.string().optional(),
  connectionNoteTemplate: z.string().optional(),
  requireApproval: z.boolean().default(true),
  followUpsEnabled: z.boolean().default(false),
  followUpCount: z.number().int().min(1).max(5).default(1),
  followUpDelayDays: z.number().int().min(1).default(3),
  followUpTemplate: z.string().optional(),
  autoBookEnabled: z.boolean().default(false),
  autoBookCtaLink: z.string().url().optional().or(z.literal("")),
  autoBookReplyTemplate: z.string().optional(),
});

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const campaigns = await prisma.campaign.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      linkedInAccount: { select: { name: true, avatarUrl: true } },
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const enriched = await Promise.all(
    campaigns.map(async (c) => {
      const [contacted, accepted, replied] = await Promise.all([
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: "REPLIED" } }),
      ]);
      return { ...c, stats: { leads: c._count.leads, contacted, accepted, replied } };
    })
  );

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const account = await prisma.linkedInAccount.findFirst({
    where: { id: parsed.data.linkedInAccountId, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const campaign = await prisma.campaign.create({
    data: { ...parsed.data, workspaceId: user.workspaceId },
  });

  return NextResponse.json(campaign, { status: 201 });
}
```

- [ ] **Step 2: Write `app/api/campaigns/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"]).optional(),
  connectionNoteTemplate: z.string().optional(),
  requireApproval: z.boolean().optional(),
  followUpsEnabled: z.boolean().optional(),
  followUpCount: z.number().int().optional(),
  followUpDelayDays: z.number().int().optional(),
  followUpTemplate: z.string().optional(),
  autoBookEnabled: z.boolean().optional(),
  autoBookCtaLink: z.string().optional(),
  autoBookReplyTemplate: z.string().optional(),
  positioningText: z.string().optional(),
});

async function getCampaign(id: string, workspaceId: string) {
  return prisma.campaign.findFirst({ where: { id, workspaceId } });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await getCampaign(id, user.workspaceId);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const updated = await prisma.campaign.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await getCampaign(id, user.workspaceId);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Write `app/api/campaigns/[id]/activate/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.campaign.update({
    where: { id },
    data: { status: campaign.status === "ACTIVE" ? "PAUSED" : "ACTIVE" },
  });
  return NextResponse.json(updated);
}
```

- [ ] **Step 4: Write `components/campaigns/campaign-wizard.tsx`**

This is a multi-step form. The full component:

```typescript
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Account { id: string; name: string; avatarUrl: string | null }

interface WizardProps { accounts: Account[] }

const STEPS = ["Campaign name", "Account", "Type", "Positioning", "Outreach flow"];

const TYPES = [
  { value: "CONNECT_NOTE", label: "Connect + Note", desc: "Connection request with a message" },
  { value: "CONNECT", label: "Connect", desc: "Connection request only" },
  { value: "FIRST_DEGREE", label: "1st-Degree", desc: "Message existing connections" },
] as const;

const VARS = "{{name}} {{company}} {{headline}} {{city}} {{country}}";

export function CampaignWizard({ accounts }: WizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flowTab, setFlowTab] = useState<"connection" | "followups" | "autobook">("connection");

  const [form, setForm] = useState({
    name: "",
    linkedInAccountId: accounts[0]?.id ?? "",
    type: "CONNECT_NOTE" as "CONNECT_NOTE" | "CONNECT" | "FIRST_DEGREE",
    positioningText: "",
    connectionNoteTemplate: "Hey {{name}}, saw you run {{company}} — I'd love to connect.",
    requireApproval: true,
    followUpsEnabled: false,
    followUpCount: 1,
    followUpDelayDays: 3,
    followUpTemplate: "Hey {{name}}, just following up on my last message.",
    autoBookEnabled: false,
    autoBookCtaLink: "",
    autoBookReplyTemplate: "Sounds good! Here's a quick time to chat: {{cta_link}}",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleFinish() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed"); setLoading(false); return; }
    router.push(`/campaigns/${data.id}/overview`);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: "var(--bg-subtle)" }}>
          <div className="h-1 transition-all" style={{ width: `${progress}%`, background: "var(--accent)" }} />
        </div>

        <div className="p-8">
          <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            Step {step + 1} of {STEPS.length} · <strong>{STEPS[step]}</strong>
          </p>

          {/* Step 0: Name */}
          {step === 0 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                What do you want to call this campaign?
              </h2>
              <Input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="e.g. Q3 Agency Outreach"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
            </div>
          )}

          {/* Step 1: Account */}
          {step === 1 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Which LinkedIn account sends this campaign?
              </h2>
              {accounts.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No LinkedIn accounts connected yet.{" "}
                  <a href={process.env.NEXT_PUBLIC_CONNECT_URL + "/linkedin"} className="underline" style={{ color: "var(--accent)" }}>
                    Connect one first.
                  </a>
                </p>
              ) : (
                <div className="space-y-2">
                  {accounts.map(acc => (
                    <button key={acc.id} onClick={() => set("linkedInAccountId", acc.id)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-colors"
                      style={{
                        borderColor: form.linkedInAccountId === acc.id ? "var(--accent)" : "var(--border)",
                        background: form.linkedInAccountId === acc.id ? "rgba(224,120,48,0.06)" : "var(--bg-subtle)",
                      }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: "var(--accent)", color: "#fff" }}>
                        {acc.name.charAt(0)}
                      </div>
                      <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{acc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Type */}
          {step === 2 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                How do you want to reach them?
              </h2>
              <div className="space-y-2">
                {TYPES.map(t => (
                  <button key={t.value} onClick={() => set("type", t.value)}
                    className="w-full p-4 rounded-xl border text-left transition-colors"
                    style={{
                      borderColor: form.type === t.value ? "var(--accent)" : "var(--border)",
                      background: form.type === t.value ? "rgba(224,120,48,0.06)" : "var(--bg-subtle)",
                    }}>
                    <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{t.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Positioning */}
          {step === 3 && (
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Tell us about your business
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                This helps personalise messages and score leads against your ICP.
              </p>
              <Textarea value={form.positioningText}
                onChange={e => set("positioningText", e.target.value)}
                rows={5}
                placeholder="e.g. We're Octelis, a UK web design agency for tradespeople and local service businesses. Our clients are owners and directors of UK SMEs who need a website that wins local customers."
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
            </div>
          )}

          {/* Step 4: Outreach flow */}
          {step === 4 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Configure your outreach flow
              </h2>
              <div className="flex gap-4">
                {/* Left: flow steps */}
                <div className="w-48 shrink-0 space-y-1">
                  {[
                    { key: "connection", label: "Connection Request" },
                    { key: "followups", label: "Follow-ups" },
                    { key: "autobook", label: "Auto Book" },
                  ].map(tab => (
                    <button key={tab.key}
                      onClick={() => setFlowTab(tab.key as typeof flowTab)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-colors"
                      style={{
                        background: flowTab === tab.key ? "rgba(224,120,48,0.08)" : "transparent",
                        color: flowTab === tab.key ? "var(--accent)" : "var(--text-muted)",
                      }}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Right: config */}
                <div className="flex-1 border rounded-xl p-4 space-y-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>

                  {flowTab === "connection" && (
                    <>
                      <div>
                        <Label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          Connection note template
                        </Label>
                        <Textarea value={form.connectionNoteTemplate}
                          onChange={e => set("connectionNoteTemplate", e.target.value)}
                          rows={4} className="mt-1"
                          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use: {VARS}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Require approval</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Review each message before it sends</p>
                        </div>
                        <Switch checked={form.requireApproval} onCheckedChange={v => set("requireApproval", v)} />
                      </div>
                    </>
                  )}

                  {flowTab === "followups" && (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Enable follow-ups</p>
                        <Switch checked={form.followUpsEnabled} onCheckedChange={v => set("followUpsEnabled", v)} />
                      </div>
                      {form.followUpsEnabled && (
                        <>
                          <div className="flex items-center gap-4">
                            <div>
                              <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Count</Label>
                              <Input type="number" min={1} max={5} value={form.followUpCount}
                                onChange={e => set("followUpCount", parseInt(e.target.value))}
                                className="w-20 mt-1"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            </div>
                            <div>
                              <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Send after (days)</Label>
                              <Input type="number" min={1} value={form.followUpDelayDays}
                                onChange={e => set("followUpDelayDays", parseInt(e.target.value))}
                                className="w-20 mt-1"
                                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Follow-up message</Label>
                            <Textarea value={form.followUpTemplate}
                              onChange={e => set("followUpTemplate", e.target.value)}
                              rows={3} className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use: {VARS}</p>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {flowTab === "autobook" && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Auto Book</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>AI detects interest and sends booking link</p>
                        </div>
                        <Switch checked={form.autoBookEnabled} onCheckedChange={v => set("autoBookEnabled", v)} />
                      </div>
                      {form.autoBookEnabled && (
                        <>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>CTA link</Label>
                            <Input value={form.autoBookCtaLink}
                              onChange={e => set("autoBookCtaLink", e.target.value)}
                              placeholder="https://book.octelis.com" className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                          </div>
                          <div>
                            <Label className="text-xs" style={{ color: "var(--text-muted)" }}>Reply template</Label>
                            <Textarea value={form.autoBookReplyTemplate}
                              onChange={e => set("autoBookReplyTemplate", e.target.value)}
                              rows={3} className="mt-1"
                              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }} />
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                              Use: {VARS} {"{{cta_link}}"}
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between px-8 py-4 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)}
              style={{ color: "var(--text-muted)" }}>Back</Button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)}
              disabled={step === 0 && !form.name.trim()}
              style={{ background: "var(--accent)", color: "#fff" }}>Next</Button>
          ) : (
            <Button onClick={handleFinish} disabled={loading}
              style={{ background: "var(--accent)", color: "#fff" }}>
              {loading ? "Creating…" : "Create campaign"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write `app/(app)/campaigns/new/page.tsx`**

```typescript
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CampaignWizard } from "@/components/campaigns/campaign-wizard";

export default async function NewCampaignPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const accounts = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId, status: "ACTIVE" },
    select: { id: true, name: true, avatarUrl: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>New Campaign</h1>
      <CampaignWizard accounts={accounts} />
    </div>
  );
}
```

- [ ] **Step 6: Write `app/(app)/campaigns/page.tsx`**

```typescript
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Pause, Play, Pencil, Trash2 } from "lucide-react";

interface Campaign {
  id: string; name: string; status: string; type: string; createdAt: string;
  linkedInAccount: { name: string };
  stats: { leads: number; contacted: number; accepted: number; replied: number };
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e", DRAFT: "var(--text-muted)", PAUSED: "#f59e0b", COMPLETED: "var(--text-muted)",
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

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Campaigns</h1>
        <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
          <Link href="/campaigns/new"><Plus size={16} className="mr-2" />New campaign</Link>
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <Input placeholder="Search campaigns…" value={search} onChange={e => setSearch(e.target.value)}
          className="max-w-xs" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No campaigns yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Create your first campaign to start reaching out.
          </p>
          <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
            <Link href="/campaigns/new">New campaign</Link>
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="rounded-xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: STATUS_COLORS[c.status] ?? "var(--text-muted)" }} />
                  <Link href={`/campaigns/${c.id}/overview`}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--text-primary)" }}>{c.name}</Link>
                </div>
                <p className="text-xs mt-0.5 ml-4" style={{ color: "var(--text-muted)" }}>
                  {c.linkedInAccount.name} · {c.type.replace("_", " ")}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleStatus(c.id)}
                  className="p-1.5 rounded hover:bg-gray-50" style={{ color: "var(--text-muted)" }}>
                  {c.status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <Link href={`/campaigns/${c.id}/overview`}
                  className="p-1.5 rounded hover:bg-gray-50" style={{ color: "var(--text-muted)" }}>
                  <Pencil size={14} />
                </Link>
                <button onClick={() => deleteCampaign(c.id)}
                  className="p-1.5 rounded hover:bg-red-50" style={{ color: "var(--text-muted)" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t ml-4"
              style={{ borderColor: "var(--border)" }}>
              {[
                { label: "leads", value: c.stats.leads },
                { label: "contacted", value: c.stats.contacted },
                { label: "accepted", value: c.stats.accepted },
                { label: "replied", value: c.stats.replied },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-xs mt-3 ml-4" style={{ color: "var(--text-muted)" }}>
              {new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Write `app/(app)/campaigns/[id]/page.tsx`**

```typescript
import { redirect } from "next/navigation";

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/campaigns/${id}/overview`);
}
```

- [ ] **Step 8: Commit**

```bash
git add app/api/campaigns/ components/campaigns/ app/\(app\)/campaigns/
git commit -m "feat: campaign CRUD API and 5-step wizard UI"
```
