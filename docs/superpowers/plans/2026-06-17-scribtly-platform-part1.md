# Scribtly LinkedIn Outreach Platform — Implementation Plan (Part 1 of 4)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement task-by-task.

**Goal:** Build a LinkedIn outreach automation platform on scribtly.com that generates meetings via Unipile.

**Architecture:** Next.js 15 App Router + Prisma + PostgreSQL + Lucia v3 auth. Two Docker containers: `app` (Next.js) and `worker` (Node.js loop every 2 min). Subdomain routing via Next.js middleware: scribtly.com → marketing, app.scribtly.com → platform, connect.scribtly.com → LinkedIn connection flow.

**Tech Stack:** Next.js 15, TypeScript, Prisma, PostgreSQL, Lucia v3, Unipile SDK, Tailwind CSS, shadcn/ui, Recharts, Anthropic SDK (claude-haiku-4-5-20251001), tsx, bcryptjs, zod, date-fns

## Global Constraints

- All CSS uses Octelis tokens: `--bg-base: #FFFFFF`, `--bg-subtle: #F7F3EE`, `--text-primary: #0F0F12`, `--text-muted: #6B6560`, `--accent: #E07830`, `--accent-hover: #C4652A`, `--border: #E8E2D9`, `--dark: #1A1A1A`
- Every page includes footer with `Powered by <a href="https://octelis.com">octelis.com</a>` in `--text-muted`
- Cookie domain: `.scribtly.com` (dot-prefixed, shared across all subdomains)
- Mobile-first responsive layout on every page
- TypeScript strict mode throughout
- No `any` types
- Prisma schema file: `prisma/schema.prisma`
- Worker entry: `worker/index.ts`
- All API routes validate session before processing

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `.env.example`
- Create: `.gitignore`

**Interfaces:**
- Produces: working `npm run dev`, design tokens available as CSS variables globally

- [ ] **Step 1: Initialise project**

```bash
cd "C:\Users\tsvet\Documents\WebDev\saas\ScribtlyProspecting"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install lucia @lucia-auth/adapter-prisma @prisma/client bcryptjs zod date-fns recharts @anthropic-ai/sdk
npm install -D prisma @types/bcryptjs tsx
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init --defaults
```

When prompted: style=default, base color=neutral, CSS variables=yes.

Then add required components:
```bash
npx shadcn@latest add button input label card badge avatar separator sheet dialog dropdown-menu tabs table select textarea toggle switch progress
```

- [ ] **Step 4: Set up design tokens in `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --bg-base: #FFFFFF;
  --bg-subtle: #F7F3EE;
  --text-primary: #0F0F12;
  --text-muted: #6B6560;
  --accent: #E07830;
  --accent-hover: #C4652A;
  --border: #E8E2D9;
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

- [ ] **Step 5: Configure `tailwind.config.ts` with brand tokens**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        subtle: "var(--bg-subtle)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        border: "var(--border)",
        dark: "var(--dark)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "**.licdn.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 7: Create `.env.example`**

```env
DATABASE_URL=postgresql://user:password@host:5432/scribtly
DIRECT_URL=postgresql://user:password@host:5432/scribtly
UNIPILE_DSN=api51.unipile.com:18117
UNIPILE_API_TOKEN=your_token_here
WORKER_SECRET=generate_a_random_32_char_secret
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=https://app.scribtly.com
NEXT_PUBLIC_CONNECT_URL=https://connect.scribtly.com
```

Copy to `.env.local` and fill in values from old Scribtly project (`DATABASE_URL`, `DIRECT_URL`, `ANTHROPIC_API_KEY`).

- [ ] **Step 8: Create `.gitignore`**

```
node_modules/
.next/
.env
.env.local
.env*.local
dist/
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000 with no errors.

- [ ] **Step 10: Commit**

```bash
git init
git add -A
git commit -m "feat: project setup with Next.js 15, shadcn/ui, Octelis design tokens"
```

---

## Task 2: Database Schema + Prisma

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/prisma.ts`

**Interfaces:**
- Produces: `prisma` singleton exported from `lib/prisma.ts`, all models available via `prisma.*`

- [ ] **Step 1: Write `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String?
  avatarUrl    String?
  workspaceId  String
  workspace    Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  createdAt    DateTime  @default(now())
  sessions     Session[]

  @@index([workspaceId])
}

model Session {
  id        String   @id
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
}

model Workspace {
  id                  String   @id @default(cuid())
  slug                String   @unique
  name                String
  logoUrl             String?
  allowDuplicateLeads Boolean  @default(true)
  skipLowIcpLeads     Boolean  @default(false)
  createdAt           DateTime @default(now())

  users            User[]
  linkedInAccounts LinkedInAccount[]
  campaigns        Campaign[]
  leads            Lead[]
  conversations    Conversation[]
  automationLogs   AutomationLog[]
  events           Event[]
}

enum LinkedInAccountStatus {
  ACTIVE
  DISCONNECTED
  RECONNECTING
}

model LinkedInAccount {
  id               String                @id @default(cuid())
  workspaceId      String
  workspace        Workspace             @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  unipileAccountId String                @unique
  name             String
  avatarUrl        String?
  headline         String?
  status           LinkedInAccountStatus @default(ACTIVE)
  dailyConnLimit   Int                   @default(25)
  dailyMsgLimit    Int                   @default(50)
  connSentToday    Int                   @default(0)
  msgSentToday     Int                   @default(0)
  limitsResetAt    DateTime
  lastSyncAt       DateTime?
  createdAt        DateTime              @default(now())

  campaigns Campaign[]

  @@index([workspaceId])
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
}

enum CampaignType {
  CONNECT_NOTE
  CONNECT
  FIRST_DEGREE
}

model Campaign {
  id                     String          @id @default(cuid())
  workspaceId            String
  workspace              Workspace       @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  linkedInAccountId      String
  linkedInAccount        LinkedInAccount @relation(fields: [linkedInAccountId], references: [id])
  name                   String
  status                 CampaignStatus  @default(DRAFT)
  type                   CampaignType    @default(CONNECT_NOTE)
  positioningText        String?
  connectionNoteTemplate String?
  requireApproval        Boolean         @default(true)
  followUpsEnabled       Boolean         @default(false)
  followUpCount          Int             @default(1)
  followUpDelayDays      Int             @default(3)
  followUpTemplate       String?
  autoBookEnabled        Boolean         @default(false)
  autoBookCtaLink        String?
  autoBookReplyTemplate  String?
  createdAt              DateTime        @default(now())
  updatedAt              DateTime        @updatedAt

  leads    Lead[]
  messages Message[]
  events   Event[]

  @@index([workspaceId, status])
}

enum LeadStatus {
  NEW
  ENRICHED
  QUEUED
  PENDING_APPROVAL
  CONTACTED
  ACCEPTED
  REPLIED
  SKIPPED
  BOUNCED
}

model Lead {
  id                String     @id @default(cuid())
  workspaceId       String
  workspace         Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  campaignId        String
  campaign          Campaign   @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  linkedInProfileId String
  name              String
  headline          String?
  company           String?
  location          String?
  avatarUrl         String?
  profileUrl        String
  icpScore          Int?
  status            LeadStatus @default(NEW)
  contactedAt       DateTime?
  acceptedAt        DateTime?
  repliedAt         DateTime?
  enrichedAt        DateTime?
  createdAt         DateTime   @default(now())

  messages     Message[]
  conversation Conversation?
  events       Event[]

  @@unique([campaignId, linkedInProfileId])
  @@index([campaignId, status])
  @@index([workspaceId])
}

enum MessageType {
  CONNECTION_NOTE
  FOLLOWUP
  AUTOBOOK
}

enum MessageStatus {
  PENDING_APPROVAL
  APPROVED
  SENT
  FAILED
}

model Message {
  id               String        @id @default(cuid())
  leadId           String
  lead             Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)
  campaignId       String
  campaign         Campaign      @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  type             MessageType
  content          String
  status           MessageStatus @default(PENDING_APPROVAL)
  unipileMessageId String?
  sentAt           DateTime?
  createdAt        DateTime      @default(now())

  @@index([campaignId, status])
  @@index([leadId])
}

model Conversation {
  id                 String    @id @default(cuid())
  workspaceId        String
  workspace          Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  leadId             String    @unique
  lead               Lead      @relation(fields: [leadId], references: [id], onDelete: Cascade)
  unipileThreadId    String    @unique
  lastMessageAt      DateTime?
  lastMessagePreview String?
  hasUnread          Boolean   @default(false)
  createdAt          DateTime  @default(now())

  messages ConversationMessage[]
}

enum MessageDirection {
  INBOUND
  OUTBOUND
}

model ConversationMessage {
  id               String           @id @default(cuid())
  conversationId   String
  conversation     Conversation     @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  content          String
  direction        MessageDirection
  sentAt           DateTime
  unipileMessageId String           @unique
  createdAt        DateTime         @default(now())

  @@index([conversationId, sentAt])
}

enum AutomationTaskType {
  ENRICH_LEAD
  SCORE_LEAD
  SEND_MESSAGE
  SYNC_INBOX
  RESET_DAILY_LIMITS
}

enum AutomationTaskStatus {
  EXECUTING
  COMPLETED
  FAILED
}

model AutomationLog {
  id          String               @id @default(cuid())
  workspaceId String
  workspace   Workspace            @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  taskType    AutomationTaskType
  status      AutomationTaskStatus
  result      String?
  metadata    Json?
  startedAt   DateTime             @default(now())
  completedAt DateTime?

  @@index([workspaceId, startedAt])
}

model Event {
  id          String    @id @default(cuid())
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  campaignId  String?
  campaign    Campaign? @relation(fields: [campaignId], references: [id], onDelete: SetNull)
  leadId      String?
  lead        Lead?     @relation(fields: [leadId], references: [id], onDelete: SetNull)
  type        String
  metadata    Json?
  createdAt   DateTime  @default(now())

  @@index([workspaceId, createdAt])
  @@index([campaignId, createdAt])
}
```

- [ ] **Step 2: Write `lib/prisma.ts`**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 3: Run migration**

```bash
npx prisma migrate dev --name init
```

Expected: migration created and applied, `prisma generate` runs automatically.

- [ ] **Step 4: Verify Prisma Studio opens**

```bash
npx prisma studio
```

Expected: browser opens, all tables visible with 0 rows. Close when confirmed.

- [ ] **Step 5: Commit**

```bash
git add prisma/ lib/prisma.ts
git commit -m "feat: database schema and Prisma setup"
```

---

## Task 3: Auth (Lucia v3 + Email/Password)

**Files:**
- Create: `lib/auth.ts`
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/signup/page.tsx`
- Create: `app/(auth)/layout.tsx`
- Create: `app/api/auth/login/route.ts`
- Create: `app/api/auth/signup/route.ts`
- Create: `app/api/auth/logout/route.ts`
- Create: `middleware.ts`

**Interfaces:**
- Produces: `validateRequest()` from `lib/auth.ts` returning `{ user, session } | { user: null, session: null }`
- Produces: session cookie set on `.scribtly.com` domain

- [ ] **Step 1: Write `lib/auth.ts`**

```typescript
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "scribtly_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? ".scribtly.com" : undefined,
      sameSite: "lax",
    },
  },
  getUserAttributes(attributes) {
    return {
      email: attributes.email,
      name: attributes.name,
      avatarUrl: attributes.avatarUrl,
      workspaceId: attributes.workspaceId,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      avatarUrl: string | null;
      workspaceId: string;
    };
  }
}

import { cookies } from "next/headers";
import type { Session, User } from "lucia";

export async function validateRequest(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const blankCookie = lucia.createBlankSessionCookie();
      cookieStore.set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    }
  } catch {
    // cookies() may throw in some RSC contexts
  }

  return result;
}
```

- [ ] **Step 2: Write `app/api/auth/signup/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const workspace = await prisma.workspace.create({
    data: { name, slug: `${slug}-${Math.random().toString(36).slice(2, 7)}` },
  });

  const user = await prisma.user.create({
    data: { email, passwordHash, name, workspaceId: workspace.id },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Write `app/api/auth/login/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Write `app/api/auth/logout/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const { session } = await validateRequest();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await lucia.invalidateSession(session.id);
  const blankCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 5: Write `middleware.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // connect.scribtly.com → /connect routes
  if (host.startsWith("connect.")) {
    if (!pathname.startsWith("/connect")) {
      return NextResponse.rewrite(new URL(`/connect${pathname}`, request.url));
    }
    return NextResponse.next();
  }

  // scribtly.com (no subdomain) → marketing
  if (!host.startsWith("app.") && !host.startsWith("connect.")) {
    return NextResponse.next();
  }

  // app.scribtly.com → protect all non-auth routes
  const publicPaths = ["/login", "/signup", "/api/auth"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  const sessionCookie = request.cookies.get("scribtly_session");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 6: Write `app/(auth)/layout.tsx`**

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--bg-subtle)" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>LinkedIn outreach that books meetings</p>
        </div>
        {children}
      </div>
      <footer className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
        Powered by <a href="https://octelis.com" className="underline">octelis.com</a>
      </footer>
    </div>
  );
}
```

- [ ] **Step 7: Write `app/(auth)/login/page.tsx`**

```typescript
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
      <CardHeader>
        <CardTitle style={{ color: "var(--text-primary)" }}>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            No account? <Link href="/signup" className="underline" style={{ color: "var(--accent)" }}>Sign up</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 8: Write `app/(auth)/signup/page.tsx`**

```typescript
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
      <CardHeader>
        <CardTitle style={{ color: "var(--text-primary)" }}>Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Your name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            Have an account? <Link href="/login" className="underline" style={{ color: "var(--accent)" }}>Sign in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 9: Test auth flow manually**

Start dev server. Visit http://localhost:3000/signup, create account, verify redirect to /dashboard (will 404 for now). Visit /login, sign in, verify cookie `scribtly_session` set in browser devtools.

- [ ] **Step 10: Commit**

```bash
git add app/ lib/auth.ts middleware.ts
git commit -m "feat: Lucia v3 auth — signup, login, logout, middleware"
```
