# Referral Tracking & Agency Outreach System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-funnel referral tracking system — personalised agency landing pages, behavioural tracking (landing → signup → onboarding), email delivery tracking via Resend webhooks, and an admin dashboard at `/admin/(protected)/outreach`.

**Architecture:** Each outreach agency gets a unique `/ref/[leadId]` landing page that personalises copy based on their services, fires tracking events to `/api/track`, and sets a cookie that follows them through signup and onboarding. All data lands in Postgres via Prisma and is displayed in the existing admin panel.

**Tech Stack:** Next.js 14 App Router, TypeScript, Prisma (PostgreSQL), Tailwind CSS, Clerk (auth), Resend (email webhooks), Zod (validation), Vitest (tests)

---

## File Map

**New files:**
- `prisma/schema.prisma` — add `ReferralLead`, `ReferralEvent`, `ContactMethod`, `OutreachStatus` enums
- `lib/referral-tracker.ts` — client-side tracking module (beacon-based)
- `lib/geo.ts` — IP geolocation via ip-api.com
- `lib/referral-copy.ts` — pain point copy per service type
- `app/ref/[leadId]/page.tsx` — personalised landing page (server component)
- `app/ref/[leadId]/RefLandingClient.tsx` — client component for tracking events
- `app/api/track/route.ts` — event intake endpoint (public, rate-limited)
- `app/api/ref/[leadId]/prefill/route.ts` — returns `{ agencyName }` only
- `app/api/webhooks/resend-outreach/route.ts` — Resend webhook handler
- `app/api/admin/leads/route.ts` — CRUD for ReferralLead (admin only)
- `app/admin/(protected)/outreach/page.tsx` — admin outreach overview (server component)
- `app/admin/(protected)/outreach/OutreachTable.tsx` — client component sortable table
- `app/admin/(protected)/outreach/LeadDetailPanel.tsx` — expanded row detail
- `components/onboarding/OnboardingWizard.tsx` — modified to inject tracking calls

**Modified files:**
- `middleware.ts` — set `ref_lead_id` cookie when visiting `/ref/[leadId]`
- `app/(auth)/signup/[[...rest]]/page.tsx` — add ref param handling + personalised header
- `app/admin/(protected)/page.tsx` — add "Outreach" nav link

---

## Task 1: Database Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add enums and models to schema**

Open `prisma/schema.prisma` and append after the last existing enum/model:

```prisma
enum ContactMethod {
  RESEND_EMAIL
  WEBSITE_FORM
  MANUAL
}

enum OutreachStatus {
  NOT_CONTACTED
  CONTACTED_VIA_FORM
  CONTACTED_VIA_EMAIL
  SKIPPED_DUPLICATE
  SKIPPED_NO_CONTACT_METHOD
  SKIPPED_NOT_RELEVANT
  SKIPPED_POLICY_BLOCKS_OUTREACH
  NEEDS_MANUAL_REVIEW
  FAILED
}

model ReferralLead {
  id        String   @id @default(cuid())
  leadId    String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  agencyName     String
  agencyWebsite  String?
  agencyLocation String?
  agencyServices String?
  fitScore       Int?

  contactedAt             DateTime?
  contactMethod           ContactMethod?
  contactFormUrl          String?
  contactFormConfirmation String?
  resendMessageId         String?
  messageSubject          String?
  messageBody             String?
  sourceSearchQuery       String?
  sourceResultUrl         String?

  emailDelivered Boolean   @default(false)
  emailBounced   Boolean   @default(false)
  emailOpenedAt  DateTime?
  emailClickedAt DateTime?

  firstVisitAt           DateTime?
  lastVisitAt            DateTime?
  totalVisits            Int       @default(0)
  totalTimeOnSiteSeconds Int       @default(0)

  ipAddress  String?
  country    String?
  city       String?
  region     String?
  userAgent  String?
  browser    String?
  os         String?
  deviceType String?

  signupFormStartedAt   DateTime?
  signupFormAbandonedAt DateTime?
  signupFormLastField   String?
  signupFormTimeSeconds Int?

  signedUp              Boolean   @default(false)
  signedUpAt            DateTime?
  clerkUserId           String?
  workspaceId           String?
  onboardingStartedAt   DateTime?
  onboardingCompletedAt DateTime?
  onboardingStepsJson   String?

  outreachStatus OutreachStatus @default(NOT_CONTACTED)
  optedOut       Boolean        @default(false)
  optedOutAt     DateTime?
  notes          String?

  events ReferralEvent[]
}

model ReferralEvent {
  id        String       @id @default(cuid())
  leadId    String
  lead      ReferralLead @relation(fields: [leadId], references: [leadId])
  createdAt DateTime     @default(now())

  eventType String
  page      String?
  metadata  String?
}
```

- [ ] **Step 2: Run migration**

```bash
npx prisma migrate dev --name add_referral_tracking
```

Expected output: `✓ Generated Prisma Client` and migration file created in `prisma/migrations/`.

- [ ] **Step 3: Verify Prisma client generated**

```bash
npx prisma generate
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add ReferralLead and ReferralEvent schema"
```

---

## Task 2: IP Geolocation Helper

**Files:**
- Create: `lib/geo.ts`

- [ ] **Step 1: Write the test**

Create `lib/__tests__/geo.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { getGeoFromIp } from "../geo";

describe("getGeoFromIp", () => {
  it("returns geo data for a valid IP", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country: "United Kingdom", city: "London", region: "England" }),
    } as Response);

    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toEqual({ country: "United Kingdom", city: "London", region: "England" });
  });

  it("returns null on fetch failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network error"));
    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toBeNull();
  });

  it("returns null for localhost IPs", async () => {
    const result = await getGeoFromIp("127.0.0.1");
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/__tests__/geo.test.ts
```

Expected: FAIL — `getGeoFromIp` not found.

- [ ] **Step 3: Implement**

Create `lib/geo.ts`:

```typescript
export interface GeoData {
  country: string;
  city: string;
  region: string;
}

const LOCAL_IPS = new Set(["127.0.0.1", "::1", "localhost"]);

export async function getGeoFromIp(ip: string): Promise<GeoData | null> {
  if (LOCAL_IPS.has(ip)) return null;
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,city,region`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.country) return null;
    return { country: data.country, city: data.city, region: data.region };
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/__tests__/geo.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/geo.ts lib/__tests__/geo.test.ts
git commit -m "feat: add IP geolocation helper"
```

---

## Task 3: Referral Copy Helper

**Files:**
- Create: `lib/referral-copy.ts`

- [ ] **Step 1: Write the test**

Create `lib/__tests__/referral-copy.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { getCopyForServices } from "../referral-copy";

describe("getCopyForServices", () => {
  it("returns TikTok copy for tiktok service", () => {
    const copy = getCopyForServices("tiktok content, short-form video");
    expect(copy.painPoints[0]).toContain("voice");
    expect(copy.tagline).toBeTruthy();
  });

  it("returns YouTube copy for youtube service", () => {
    const copy = getCopyForServices("YouTube management");
    expect(copy.painPoints[0]).toContain("hours");
  });

  it("returns default copy for unknown services", () => {
    const copy = getCopyForServices("web design");
    expect(copy.painPoints).toHaveLength(3);
    expect(copy.solutions).toHaveLength(3);
  });

  it("returns default copy for empty string", () => {
    const copy = getCopyForServices("");
    expect(copy.painPoints).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/__tests__/referral-copy.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement**

Create `lib/referral-copy.ts`:

```typescript
export interface AgencyCopy {
  tagline: string;
  painPoints: string[];
  solutions: string[];
}

const COPY: Record<string, AgencyCopy> = {
  tiktok: {
    tagline: "Client-ready TikTok scripts. In their voice. In seconds.",
    painPoints: [
      "Every client needs a completely different voice — and you're rewriting every draft from scratch.",
      "Generic AI scripts sound robotic. Clients can always tell.",
      "Rewrites eat your team's time and kill your margins.",
    ],
    solutions: [
      "Scribtly builds a voice profile per client — every script sounds like them, not like AI.",
      "One brief in. Client-ready TikTok script out. No editing required.",
      "10 clients? Generate all 10 scripts in the time it used to take for one.",
    ],
  },
  youtube: {
    tagline: "Long-form scripts that sound exactly like your client. Every time.",
    painPoints: [
      "Long-form YouTube scripts take hours per client — and that's before revisions.",
      "Maintaining brand voice across episodes is a constant battle.",
      "Brief → script handoff always loses context. You end up rewriting anyway.",
    ],
    solutions: [
      "Scribtly stores your client's full brand voice — tone, pacing, style, CTAs — and applies it automatically.",
      "Generate a full-length YouTube script from a topic in under 60 seconds.",
      "Every script stays consistent with the last one. No context lost.",
    ],
  },
  social: {
    tagline: "Manage scripts for every client without the chaos.",
    painPoints: [
      "Managing scripts and content for 10+ clients is a full-time job on its own.",
      "Inconsistent tone across platforms makes clients look unprofessional.",
      "Client revisions never end because the first draft never sounds like them.",
    ],
    solutions: [
      "One workspace per client. Every voice profile saved. Every script consistent.",
      "Scripts automatically adapted for YouTube, TikTok, Reels, LinkedIn, and Podcasts.",
      "First draft sounds like the client — revisions drop dramatically.",
    ],
  },
  default: {
    tagline: "AI scripts that actually sound like your clients.",
    painPoints: [
      "Every client, different voice — and you're rewriting every AI draft from scratch.",
      "Generic AI output needs too much editing to be worth using.",
      "Script production doesn't scale with your client roster.",
    ],
    solutions: [
      "Scribtly learns each client's exact voice and applies it to every script.",
      "Generate client-ready scripts from a topic in under 60 seconds.",
      "Scale to any number of clients without adding headcount.",
    ],
  },
};

export function getCopyForServices(services: string): AgencyCopy {
  const s = services.toLowerCase();
  if (s.includes("tiktok") || s.includes("short-form") || s.includes("reels")) {
    return COPY.tiktok;
  }
  if (s.includes("youtube") || s.includes("long-form")) {
    return COPY.youtube;
  }
  if (s.includes("social media") || s.includes("instagram") || s.includes("linkedin")) {
    return COPY.social;
  }
  return COPY.default;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/__tests__/referral-copy.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/referral-copy.ts lib/__tests__/referral-copy.test.ts
git commit -m "feat: add referral copy helper per service type"
```

---

## Task 4: Middleware — Set ref cookie

**Files:**
- Modify: `middleware.ts`

- [ ] **Step 1: Update middleware to set ref cookie**

Replace the full content of `middleware.ts` with:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
  "/admin(.*)",
  "/api/admin/(.*)",
  "/onboarding",
  "/ref/(.*)",
  "/api/track",
  "/api/ref/(.*)",
  "/api/webhooks/resend-outreach",
]);

const REF_PATTERN = /^\/ref\/([^/]+)/;

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;
  const refMatch = pathname.match(REF_PATTERN);

  if (refMatch) {
    const leadId = refMatch[1];
    const res = NextResponse.next();
    res.cookies.set("ref_lead_id", leadId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return res;
  }

  if (!isPublic(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
```

- [ ] **Step 2: Verify dev server starts without errors**

```bash
npx next dev --port 3000
```

Expected: server starts, no TypeScript errors. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: set ref_lead_id cookie in middleware for /ref routes"
```

---

## Task 5: `/api/track` endpoint

**Files:**
- Create: `app/api/track/route.ts`

- [ ] **Step 1: Write the test**

Create `app/api/track/__tests__/route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    referralLead: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    referralEvent: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/geo", () => ({
  getGeoFromIp: vi.fn().mockResolvedValue({ country: "UK", city: "London", region: "England" }),
}));

import { POST } from "../route";
import { prisma } from "@/lib/prisma";

const mockLead = {
  leadId: "lead_001",
  firstVisitAt: null,
  totalVisits: 0,
  totalTimeOnSiteSeconds: 0,
  country: null,
};

describe("POST /api/track", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (prisma.referralLead.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(mockLead);
    (prisma.referralLead.update as ReturnType<typeof vi.fn>).mockResolvedValue(mockLead);
    (prisma.referralEvent.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
  });

  it("returns 400 for missing leadId", async () => {
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "page_view" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid page_view event", async () => {
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: JSON.stringify({ leadId: "lead_001", eventType: "page_view", page: "/ref/lead_001", metadata: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(prisma.referralEvent.create).toHaveBeenCalled();
  });

  it("returns 200 silently for unknown leadId", async () => {
    (prisma.referralLead.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: "unknown", eventType: "page_view", page: "/ref/unknown", metadata: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(prisma.referralEvent.create).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run app/api/track/__tests__/route.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement**

Create `app/api/track/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getGeoFromIp } from "@/lib/geo";

const bodySchema = z.object({
  leadId: z.string().min(1),
  eventType: z.enum([
    "page_view", "page_exit", "cta_click", "scroll_depth",
    "form_start", "form_field", "form_abandon", "signup_complete",
    "onboarding_step",
  ]),
  page: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { leadId, eventType, page, metadata } = parsed.data;

  const lead = await prisma.referralLead.findUnique({ where: { leadId } });
  if (!lead) return NextResponse.json({ ok: true }); // silent ignore

  const now = new Date();
  const updates: Record<string, unknown> = { lastVisitAt: now };

  if (eventType === "page_view") {
    if (!lead.firstVisitAt) {
      updates.firstVisitAt = now;
      // Geo lookup on first visit only
      if (ip !== "unknown" && !lead.country) {
        const geo = await getGeoFromIp(ip);
        if (geo) {
          updates.country = geo.country;
          updates.city = geo.city;
          updates.region = geo.region;
        }
      }
      // Parse user agent
      const ua = req.headers.get("user-agent") ?? "";
      updates.userAgent = ua;
      updates.browser = parseBrowser(ua);
      updates.os = parseOs(ua);
      updates.deviceType = parseDeviceType(ua);
      updates.ipAddress = ip;
    }
    updates.totalVisits = lead.totalVisits + 1;
  }

  if (eventType === "page_exit" && metadata?.timeOnPageSeconds) {
    updates.totalTimeOnSiteSeconds =
      lead.totalTimeOnSiteSeconds + Number(metadata.timeOnPageSeconds);
  }

  if (eventType === "form_start" && !lead.signupFormStartedAt) {
    updates.signupFormStartedAt = now;
  }

  if (eventType === "form_field" && metadata?.field) {
    updates.signupFormLastField = String(metadata.field);
  }

  if (eventType === "form_abandon") {
    updates.signupFormAbandonedAt = now;
    if (metadata?.timeOnPageSeconds) {
      updates.signupFormTimeSeconds = Number(metadata.timeOnPageSeconds);
    }
  }

  if (eventType === "signup_complete" && metadata?.clerkUserId) {
    updates.signedUp = true;
    updates.signedUpAt = now;
    updates.clerkUserId = String(metadata.clerkUserId);
  }

  if (eventType === "onboarding_step") {
    if (metadata?.action === "enter" && !lead.onboardingStartedAt) {
      updates.onboardingStartedAt = now;
    }
    if (metadata?.completed) {
      updates.onboardingCompletedAt = now;
      updates.onboardingStepsJson = JSON.stringify(metadata.steps ?? []);
    }
  }

  await Promise.all([
    prisma.referralLead.update({ where: { leadId }, data: updates }),
    prisma.referralEvent.create({
      data: {
        leadId,
        eventType,
        page,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}

function parseBrowser(ua: string): string {
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

function parseOs(ua: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

function parseDeviceType(ua: string): string {
  if (ua.includes("Mobile") || ua.includes("iPhone")) return "mobile";
  if (ua.includes("iPad") || ua.includes("Tablet")) return "tablet";
  return "desktop";
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run app/api/track/__tests__/route.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/api/track/
git commit -m "feat: add /api/track event intake endpoint"
```

---

## Task 6: `/api/ref/[leadId]/prefill` endpoint

**Files:**
- Create: `app/api/ref/[leadId]/prefill/route.ts`

- [ ] **Step 1: Implement**

Create `app/api/ref/[leadId]/prefill/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { agencyName: true },
  });
  if (!lead) return NextResponse.json({ agencyName: null });
  return NextResponse.json({ agencyName: lead.agencyName });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/ref/
git commit -m "feat: add /api/ref/[leadId]/prefill endpoint"
```

---

## Task 7: Client-side Referral Tracker

**Files:**
- Create: `lib/referral-tracker.ts`

- [ ] **Step 1: Implement**

Create `lib/referral-tracker.ts`:

```typescript
"use client";

function getLeadId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)ref_lead_id=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

type EventType =
  | "page_view"
  | "page_exit"
  | "cta_click"
  | "scroll_depth"
  | "form_start"
  | "form_field"
  | "form_abandon"
  | "signup_complete"
  | "onboarding_step";

function send(eventType: EventType, page: string, metadata: Record<string, unknown> = {}) {
  const leadId = getLeadId();
  if (!leadId) return;
  const payload = JSON.stringify({ leadId, eventType, page, metadata });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  } else {
    fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
  }
}

export function trackPageView(page: string) {
  send("page_view", page);
}

export function trackScrollDepth(page: string, depth: number) {
  send("scroll_depth", page, { scrollDepth: depth });
}

export function trackCtaClick(page: string) {
  send("cta_click", page);
}

export function trackPageExit(page: string, timeOnPageSeconds: number) {
  send("page_exit", page, { timeOnPageSeconds });
}

export function trackFormStart(page: string) {
  send("form_start", page);
}

export function trackFormField(page: string, field: string) {
  send("form_field", page, { field });
}

export function trackFormAbandon(page: string, lastField: string, timeOnPageSeconds: number) {
  send("form_abandon", page, { lastField, timeOnPageSeconds });
}

export function trackSignupComplete(clerkUserId: string) {
  send("signup_complete", "/sign-up", { clerkUserId });
}

export function trackOnboardingStep(action: "enter" | "exit", step: number, timeSeconds?: number) {
  send("onboarding_step", "/onboarding", { action, step, timeSeconds });
}

export function trackOnboardingComplete(steps: Array<{ step: number; timeSeconds: number }>) {
  send("onboarding_step", "/onboarding", { completed: true, steps });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/referral-tracker.ts
git commit -m "feat: add client-side referral tracker module"
```

---

## Task 8: Personalised Landing Page

**Files:**
- Create: `app/ref/[leadId]/page.tsx`
- Create: `app/ref/[leadId]/RefLandingClient.tsx`

- [ ] **Step 1: Create the client tracking component**

Create `app/ref/[leadId]/RefLandingClient.tsx`:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  trackPageView,
  trackScrollDepth,
  trackCtaClick,
  trackPageExit,
} from "@/lib/referral-tracker";

interface RefLandingClientProps {
  leadId: string;
  agencyName: string;
  tagline: string;
  painPoints: string[];
  solutions: string[];
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function RefLandingClient({
  leadId,
  agencyName,
  tagline,
  painPoints,
  solutions,
}: RefLandingClientProps) {
  const router = useRouter();
  const startTime = useRef(Date.now());
  const firedThresholds = useRef(new Set<number>());
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    trackPageView(`/ref/${leadId}`);

    const handleScroll = () => {
      const el = document.documentElement;
      const depth = Math.round(
        ((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100
      );
      setScrollDepth(depth);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (depth >= threshold && !firedThresholds.current.has(threshold)) {
          firedThresholds.current.add(threshold);
          trackScrollDepth(`/ref/${leadId}`, threshold);
        }
      }
    };

    const handleExit = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      trackPageExit(`/ref/${leadId}`, seconds);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleExit();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleExit);
    };
  }, [leadId]);

  function handleCta() {
    trackCtaClick(`/ref/${leadId}`);
    router.push(`/signup?ref=${leadId}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-widest">
            Made for {agencyName}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome, {agencyName}.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            {tagline}
          </p>
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            Get free access for {agencyName} →
          </button>
        </div>
        <div className="absolute bottom-8 animate-bounce text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Sound familiar?
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Every agency at your stage runs into these same walls.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <span className="text-red-500 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Here&apos;s how Scribtly fixes it
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Built specifically for agencies managing multiple clients.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-primary/20 bg-primary/5 dark:bg-primary/10"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-3xl font-bold mb-2">4 hrs</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            saved per client per week on average by agencies using Scribtly
          </p>
          <blockquote className="text-gray-600 dark:text-gray-300 italic text-sm max-w-lg mx-auto">
            &ldquo;We went from spending half a day on client scripts to generating them in minutes. The voice profiles are eerily accurate.&rdquo;
          </blockquote>
          <p className="text-xs text-gray-400 mt-3">— Social media agency, London</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to try it, {agencyName}?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Free access. No credit card. Set up your first client voice profile in 2 minutes.
          </p>
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            Get free access for {agencyName} →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800">
        By visiting this page you agree to our{" "}
        <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
        {" "}We use cookies to track referral activity.
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Create the server page**

Create `app/ref/[leadId]/page.tsx`:

```typescript
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCopyForServices } from "@/lib/referral-copy";
import { RefLandingClient } from "./RefLandingClient";

interface Props {
  params: { leadId: string };
}

export default async function RefLandingPage({ params }: Props) {
  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true, agencyName: true, agencyServices: true },
  });

  // If not found, redirect to homepage silently — no data leak
  if (!lead) redirect("/");

  const copy = getCopyForServices(lead.agencyServices ?? "");

  return (
    <RefLandingClient
      leadId={lead.leadId}
      agencyName={lead.agencyName}
      tagline={copy.tagline}
      painPoints={copy.painPoints}
      solutions={copy.solutions}
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/ref/
git commit -m "feat: add personalised referral landing page /ref/[leadId]"
```

---

## Task 9: Pre-filled Signup Page

**Files:**
- Modify: `app/(auth)/signup/[[...rest]]/page.tsx`

- [ ] **Step 1: Update signup page**

Replace the full content of `app/(auth)/signup/[[...rest]]/page.tsx` with:

```typescript
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { SignupTracking } from "./SignupTracking";

interface Props {
  searchParams: { ref?: string };
}

export default function SignupPage({ searchParams }: Props) {
  const ref = searchParams.ref ?? null;

  return (
    <div className="flex flex-col items-center">
      {ref && <SignupTracking refLeadId={ref} />}
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        initialValues={ref ? { unsafeMetadata: { refLeadId: ref } } : undefined}
      />
      <p className="mt-4 text-center text-xs text-text-secondary dark:text-dark-muted max-w-sm">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create SignupTracking client component**

Create `app/(auth)/signup/[[...rest]]/SignupTracking.tsx`:

```typescript
"use client";

import { useEffect, useRef } from "react";
import {
  trackPageView,
  trackFormStart,
  trackFormField,
  trackFormAbandon,
  trackPageExit,
} from "@/lib/referral-tracker";

interface Props {
  refLeadId: string;
}

export function SignupTracking({ refLeadId }: Props) {
  const startTime = useRef(Date.now());
  const lastField = useRef("");
  const formStarted = useRef(false);

  useEffect(() => {
    // Set cookie from URL param in case middleware didn't catch it
    document.cookie = `ref_lead_id=${refLeadId}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;

    trackPageView("/sign-up");

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const field =
        target.getAttribute("name") ||
        target.getAttribute("id") ||
        target.getAttribute("autocomplete") ||
        "unknown";

      if (!formStarted.current) {
        formStarted.current = true;
        trackFormStart("/sign-up");
      }
      lastField.current = field;
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const field =
        target.getAttribute("name") ||
        target.getAttribute("id") ||
        target.getAttribute("autocomplete") ||
        "unknown";
      if (field !== "unknown") {
        trackFormField("/sign-up", field);
      }
    };

    const handleExit = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (formStarted.current) {
        trackFormAbandon("/sign-up", lastField.current, seconds);
      } else {
        trackPageExit("/sign-up", seconds);
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    window.addEventListener("beforeunload", handleExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleExit();
    });

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
      window.removeEventListener("beforeunload", handleExit);
    };
  }, [refLeadId]);

  return null;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(auth\)/signup/
git commit -m "feat: add referral tracking to signup page with form field tracking"
```

---

## Task 10: Onboarding Tracking

**Files:**
- Modify: `components/onboarding/OnboardingWizard.tsx`

- [ ] **Step 1: Update OnboardingWizard to inject tracking**

Replace the full content of `components/onboarding/OnboardingWizard.tsx` with:

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { StepWorkspace } from "@/components/onboarding/StepWorkspace";
import { StepClient } from "@/components/onboarding/StepClient";
import { StepGenerate } from "@/components/onboarding/StepGenerate";
import { StepSuccess } from "@/components/onboarding/StepSuccess";
import {
  trackOnboardingStep,
  trackOnboardingComplete,
} from "@/lib/referral-tracker";

interface OnboardingWizardProps {
  initialStep: number;
  workspaceName: string;
  userName: string | null;
}

export function OnboardingWizard({ initialStep, workspaceName, userName }: OnboardingWizardProps) {
  const defaultName = userName ? `${userName.split(" ")[0]}'s Workspace` : workspaceName;
  const [step, setStep] = useState<number>(Math.min(Math.max(initialStep || 1, 1), 3));
  const [createdClientId, setCreatedClientId] = useState<string | null>(null);
  const [clientNiche, setClientNiche] = useState<string>("");
  const [clientPlatform, setClientPlatform] = useState<string>("YOUTUBE");
  const [scriptText, setScriptText] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Track time per step
  const stepStartTime = useRef(Date.now());
  const stepTimes = useRef<Array<{ step: number; timeSeconds: number }>>([]);

  useEffect(() => {
    stepStartTime.current = Date.now();
    trackOnboardingStep("enter", step);

    return () => {
      const seconds = Math.round((Date.now() - stepStartTime.current) / 1000);
      stepTimes.current.push({ step, timeSeconds: seconds });
      trackOnboardingStep("exit", step, seconds);
    };
  }, [step]);

  async function handleSkipToEnd() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingCompleted: true }),
    });
    trackOnboardingComplete(stepTimes.current);
    window.location.href = "/dashboard";
  }

  function advanceStep(nextStep: number) {
    const seconds = Math.round((Date.now() - stepStartTime.current) / 1000);
    stepTimes.current.push({ step, timeSeconds: seconds });
    setStep(nextStep);
  }

  if (showSuccess) {
    trackOnboardingComplete(stepTimes.current);
    return (
      <div className="w-full max-w-lg">
        <StepSuccess scriptText={scriptText} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <ProgressIndicator currentStep={step} />
      <div key={step} style={{ animation: "onboardingFadeSlide 0.25s ease forwards" }}>
        {step === 1 && (
          <StepWorkspace initialName={defaultName} onNext={() => advanceStep(2)} />
        )}
        {step === 2 && (
          <StepClient
            onNext={(clientId, niche, platform) => {
              setCreatedClientId(clientId);
              setClientNiche(niche);
              setClientPlatform(platform);
              advanceStep(3);
            }}
            onSkip={() => advanceStep(3)}
          />
        )}
        {step === 3 && (
          <StepGenerate
            clientId={createdClientId}
            clientNiche={clientNiche}
            clientPlatform={clientPlatform}
            onSuccess={(text) => { setScriptText(text); setShowSuccess(true); }}
            onSkip={handleSkipToEnd}
          />
        )}
      </div>
      <style>{`
        @keyframes onboardingFadeSlide {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/onboarding/OnboardingWizard.tsx
git commit -m "feat: add onboarding step tracking to OnboardingWizard"
```

---

## Task 11: Resend Webhook for Email Delivery Tracking

**Files:**
- Create: `app/api/webhooks/resend-outreach/route.ts`

- [ ] **Step 1: Implement**

Create `app/api/webhooks/resend-outreach/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Resend sends a svix-style signature header: "svix-signature"
// We verify using the webhook secret from env
const RESEND_WEBHOOK_SECRET = process.env.RESEND_OUTREACH_WEBHOOK_SECRET ?? "";

async function verifySignature(req: NextRequest, rawBody: string): Promise<boolean> {
  if (!RESEND_WEBHOOK_SECRET) return true; // skip in dev if not set
  const signature = req.headers.get("svix-signature") ?? "";
  const timestamp = req.headers.get("svix-timestamp") ?? "";
  const msgId = req.headers.get("svix-id") ?? "";

  const signedContent = `${msgId}.${timestamp}.${rawBody}`;
  const enc = new TextEncoder();
  const secretBytes = Uint8Array.from(
    atob(RESEND_WEBHOOK_SECRET.replace(/^whsec_/, "")),
    (c) => c.charCodeAt(0)
  );
  const key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(signedContent));
  const computed = "v1," + btoa(String.fromCharCode(...new Uint8Array(sig)));
  return signature.split(" ").some((s) => s === computed);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const valid = await verifySignature(req, rawBody);
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let event: { type: string; data: { message_id?: string; [k: string]: unknown } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messageId = event.data?.message_id as string | undefined;
  if (!messageId) return NextResponse.json({ ok: true });

  const lead = await prisma.referralLead.findFirst({
    where: { resendMessageId: messageId },
  });
  if (!lead) return NextResponse.json({ ok: true });

  const now = new Date();
  const updates: Record<string, unknown> = {};

  switch (event.type) {
    case "email.delivered":
      updates.emailDelivered = true;
      break;
    case "email.bounced":
      updates.emailBounced = true;
      break;
    case "email.opened":
      if (!lead.emailOpenedAt) updates.emailOpenedAt = now;
      break;
    case "email.clicked":
      if (!lead.emailClickedAt) updates.emailClickedAt = now;
      break;
  }

  if (Object.keys(updates).length > 0) {
    await prisma.referralLead.update({ where: { id: lead.id }, data: updates });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Add env var note**

Add to `.env.example` (or `.env` locally):
```
RESEND_OUTREACH_WEBHOOK_SECRET=whsec_your_secret_here
```

- [ ] **Step 3: Commit**

```bash
git add app/api/webhooks/resend-outreach/
git commit -m "feat: add Resend outreach webhook for email delivery tracking"
```

---

## Task 12: Admin Leads API

**Files:**
- Create: `app/api/admin/leads/route.ts`

- [ ] **Step 1: Implement**

Create `app/api/admin/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { cookies } from "next/headers";
import { ContactMethod, OutreachStatus } from "@prisma/client";

async function checkAdmin(): Promise<boolean> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

const createLeadSchema = z.object({
  leadId: z.string().min(1),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  contactedAt: z.string().datetime().optional(),
  contactMethod: z.nativeEnum(ContactMethod).optional(),
  contactFormUrl: z.string().optional(),
  contactFormConfirmation: z.string().optional(),
  resendMessageId: z.string().optional(),
  messageSubject: z.string().optional(),
  messageBody: z.string().optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = 50;
  const skip = (page - 1) * pageSize;

  const [leads, total] = await Promise.all([
    prisma.referralLead.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { events: { orderBy: { createdAt: "asc" } } },
    }),
    prisma.referralLead.count(),
  ]);

  return NextResponse.json({ leads, total, page, pageSize });
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const lead = await prisma.referralLead.upsert({
    where: { leadId: data.leadId },
    create: {
      ...data,
      contactedAt: data.contactedAt ? new Date(data.contactedAt) : undefined,
    },
    update: {
      ...data,
      contactedAt: data.contactedAt ? new Date(data.contactedAt) : undefined,
    },
  });

  return NextResponse.json(lead, { status: 201 });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/leads/
git commit -m "feat: add /api/admin/leads CRUD endpoint"
```

---

## Task 13: Admin Outreach Dashboard

**Files:**
- Create: `app/admin/(protected)/outreach/page.tsx`
- Create: `app/admin/(protected)/outreach/OutreachTable.tsx`
- Create: `app/admin/(protected)/outreach/LeadDetailPanel.tsx`

- [ ] **Step 1: Create the LeadDetailPanel component**

Create `app/admin/(protected)/outreach/LeadDetailPanel.tsx`:

```typescript
"use client";

import type { ReferralLead, ReferralEvent } from "@prisma/client";

type LeadWithEvents = ReferralLead & { events: ReferralEvent[] };

export function LeadDetailPanel({ lead }: { lead: LeadWithEvents }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-sm space-y-4 border border-gray-200 dark:border-gray-700 mt-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="Agency" value={lead.agencyName} />
        <Detail label="Website" value={lead.agencyWebsite} link />
        <Detail label="Location" value={lead.agencyLocation} />
        <Detail label="Fit Score" value={lead.fitScore ? `${lead.fitScore}/5` : "—"} />
        <Detail label="Services" value={lead.agencyServices} />
        <Detail label="Source Query" value={lead.sourceSearchQuery} />
        <Detail label="IP" value={lead.ipAddress} />
        <Detail label="Geo" value={[lead.city, lead.country].filter(Boolean).join(", ")} />
        <Detail label="Browser" value={lead.browser} />
        <Detail label="OS" value={lead.os} />
        <Detail label="Device" value={lead.deviceType} />
        <Detail label="User Agent" value={lead.userAgent} mono />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Detail label="Contact Method" value={lead.contactMethod} />
        <Detail label="Contacted At" value={lead.contactedAt?.toLocaleString()} />
        <Detail label="Resend ID" value={lead.resendMessageId} mono />
        <Detail label="Email Delivered" value={lead.emailDelivered ? "Yes" : "No"} />
        <Detail label="Email Bounced" value={lead.emailBounced ? "Yes" : "No"} />
        <Detail label="Email Opened" value={lead.emailOpenedAt?.toLocaleString() ?? "No"} />
        <Detail label="Email Clicked" value={lead.emailClickedAt?.toLocaleString() ?? "No"} />
        <Detail label="Form URL" value={lead.contactFormUrl} link />
        <Detail label="Form Confirmation" value={lead.contactFormConfirmation} />
      </div>

      {lead.messageSubject && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Message Sent</p>
            <p className="font-medium mb-2">{lead.messageSubject}</p>
            <pre className="whitespace-pre-wrap text-xs bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              {lead.messageBody}
            </pre>
          </div>
        </>
      )}

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="First Visit" value={lead.firstVisitAt?.toLocaleString()} />
        <Detail label="Last Visit" value={lead.lastVisitAt?.toLocaleString()} />
        <Detail label="Total Visits" value={lead.totalVisits.toString()} />
        <Detail label="Time on Site" value={`${lead.totalTimeOnSiteSeconds}s`} />
        <Detail label="Signup Form Started" value={lead.signupFormStartedAt?.toLocaleString()} />
        <Detail label="Form Abandoned" value={lead.signupFormAbandonedAt?.toLocaleString()} />
        <Detail label="Last Field" value={lead.signupFormLastField} />
        <Detail label="Form Time" value={lead.signupFormTimeSeconds ? `${lead.signupFormTimeSeconds}s` : "—"} />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="Signed Up" value={lead.signedUp ? "Yes" : "No"} />
        <Detail label="Signed Up At" value={lead.signedUpAt?.toLocaleString()} />
        <Detail label="Clerk User ID" value={lead.clerkUserId} mono />
        <Detail label="Onboarding Started" value={lead.onboardingStartedAt?.toLocaleString()} />
        <Detail label="Onboarding Completed" value={lead.onboardingCompletedAt?.toLocaleString()} />
      </div>

      {lead.onboardingStepsJson && (
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Onboarding Steps</p>
          <div className="flex gap-3 flex-wrap">
            {(JSON.parse(lead.onboardingStepsJson) as Array<{ step: number; timeSeconds: number }>).map((s) => (
              <span key={s.step} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-lg text-xs">
                Step {s.step}: {s.timeSeconds}s
              </span>
            ))}
          </div>
        </div>
      )}

      {lead.events.length > 0 && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Event Log</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {lead.events.map((ev) => (
                <div key={ev.id} className="flex gap-3 text-xs">
                  <span className="text-gray-400 tabular-nums w-36 shrink-0">
                    {ev.createdAt.toLocaleString()}
                  </span>
                  <span className="font-mono text-primary">{ev.eventType}</span>
                  {ev.page && <span className="text-gray-500">{ev.page}</span>}
                  {ev.metadata && (
                    <span className="text-gray-400 truncate">{ev.metadata}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
  link,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  link?: boolean;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
      {link ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary underline truncate block text-xs">
          {value}
        </a>
      ) : (
        <p className={`truncate ${mono ? "font-mono text-xs" : "text-xs"}`}>{value}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create the OutreachTable component**

Create `app/admin/(protected)/outreach/OutreachTable.tsx`:

```typescript
"use client";

import { useState } from "react";
import type { ReferralLead, ReferralEvent } from "@prisma/client";
import { LeadDetailPanel } from "./LeadDetailPanel";

type LeadWithEvents = ReferralLead & { events: ReferralEvent[] };

const STATUS_COLORS: Record<string, string> = {
  NOT_CONTACTED: "bg-gray-100 text-gray-600",
  CONTACTED_VIA_FORM: "bg-blue-100 text-blue-700",
  CONTACTED_VIA_EMAIL: "bg-purple-100 text-purple-700",
  SKIPPED_DUPLICATE: "bg-yellow-100 text-yellow-700",
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
      l.country?.toLowerCase().includes(filter.toLowerCase()) ||
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
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-3 py-3 font-medium whitespace-nowrap">{lead.agencyName}</td>
                  <td className="px-3 py-3">{lead.fitScore ?? "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {lead.contactMethod === "RESEND_EMAIL" ? "📧 Email" : lead.contactMethod === "WEBSITE_FORM" ? "🌐 Form" : "—"}
                  </td>
                  <td className="px-3 py-3">{lead.emailDelivered ? "✓" : "—"}</td>
                  <td className="px-3 py-3">{lead.emailOpenedAt ? "✓" : "—"}</td>
                  <td className="px-3 py-3">{lead.totalVisits || "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{lead.totalTimeOnSiteSeconds ? fmt(lead.totalTimeOnSiteSeconds) : "—"}</td>
                  <td className="px-3 py-3">{lead.signupFormStartedAt ? (lead.signupFormAbandonedAt ? "🚪 Left" : "✓") : "—"}</td>
                  <td className="px-3 py-3">{lead.signedUp ? "✅" : "—"}</td>
                  <td className="px-3 py-3">{lead.country ?? "—"}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{lead.lastVisitAt?.toLocaleDateString() ?? "—"}</td>
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
                <td colSpan={12} className="px-3 py-8 text-center text-gray-400">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the admin outreach page**

Create `app/admin/(protected)/outreach/page.tsx`:

```typescript
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { Card } from "@/components/ui/Card";
import { OutreachTable } from "./OutreachTable";

export default async function AdminOutreachPage() {
  await requireAdmin();

  const leads = await prisma.referralLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });

  const contacted = leads.filter((l) =>
    ["CONTACTED_VIA_FORM", "CONTACTED_VIA_EMAIL"].includes(l.outreachStatus)
  ).length;
  const delivered = leads.filter((l) => l.emailDelivered).length;
  const opened = leads.filter((l) => l.emailOpenedAt).length;
  const visited = leads.filter((l) => l.totalVisits > 0).length;
  const signedUp = leads.filter((l) => l.signedUp).length;
  const convRate = contacted > 0 ? ((signedUp / contacted) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Outreach</h1>
      <p className="text-sm text-text-secondary mb-8">{leads.length} total leads</p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Leads", value: leads.length },
          { label: "Contacted", value: contacted },
          { label: "Delivered", value: delivered },
          { label: "Opened", value: opened },
          { label: "Visited", value: visited },
          { label: "Signed Up", value: `${signedUp} (${convRate}%)` },
        ].map(({ label, value }) => (
          <Card key={label}>
            <div className="text-xs uppercase tracking-wider text-text-secondary">{label}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
          </Card>
        ))}
      </div>

      <OutreachTable leads={leads} />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(protected\)/outreach/
git commit -m "feat: add admin outreach dashboard with sortable table and detail panel"
```

---

## Task 14: Admin Nav Link

**Files:**
- Modify: `app/admin/(protected)/page.tsx` (or the layout file — check for nav)

- [ ] **Step 1: Find the admin nav component**

Run:
```bash
find app/admin -name "layout.tsx" | head -5
```

- [ ] **Step 2: Add Outreach nav link**

In `app/admin/(protected)/layout.tsx` (or wherever the admin nav links are), add:

```typescript
<Link href="/admin/outreach" className="...existing link classes...">
  Outreach
</Link>
```

Match the exact className pattern used by existing nav links in the file.

- [ ] **Step 3: Commit**

```bash
git add app/admin/
git commit -m "feat: add Outreach link to admin nav"
```

---

## Task 15: End-to-End Smoke Test

- [ ] **Step 1: Start dev server**

```bash
npx next dev
```

- [ ] **Step 2: Seed a test lead via API**

```bash
curl -X POST http://localhost:3000/api/admin/leads \
  -H "Content-Type: application/json" \
  -c /tmp/admin-cookies.txt \
  -b /tmp/admin-cookies.txt \
  -d '{
    "leadId": "lead_test_001",
    "agencyName": "Test Agency London",
    "agencyServices": "TikTok content, short-form video",
    "agencyLocation": "London, UK",
    "fitScore": 5,
    "outreachStatus": "NOT_CONTACTED"
  }'
```

Note: You'll need to be logged into admin first (visit `/admin/login`). Then run the curl with your cookie jar.

- [ ] **Step 3: Visit personalised landing page**

Open: `http://localhost:3000/ref/lead_test_001`

Verify:
- Page shows "Welcome, Test Agency London."
- TikTok pain points are displayed
- Cookie `ref_lead_id=lead_test_001` is set in browser

- [ ] **Step 4: Check tracking event fired**

```bash
npx prisma studio
```

Open `ReferralEvent` table. Confirm a `page_view` event exists for `lead_test_001`.
Confirm `ReferralLead` has `firstVisitAt`, `totalVisits: 1`, `country` populated.

- [ ] **Step 5: Visit signup page with ref**

Open: `http://localhost:3000/signup?ref=lead_test_001`

Verify:
- "SignupTracking" component is present (check browser console for no errors)
- Form field focus fires `form_field` events (check ReferralEvent table)

- [ ] **Step 6: Check admin outreach page**

Open: `http://localhost:3000/admin/outreach`

Verify:
- Test Agency London row appears
- Visit count shows 1
- Click row to expand detail panel
- Event log shows `page_view` and any form events

- [ ] **Step 7: Commit final**

```bash
git add .
git commit -m "feat: referral tracking system — full implementation complete"
```
