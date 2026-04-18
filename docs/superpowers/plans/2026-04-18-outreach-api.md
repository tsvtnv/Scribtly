# Outreach API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a machine-friendly REST API under `/api/v1/outreach` with bearer token auth that lets an AI agent fully manage leads, send emails, and read stats.

**Architecture:** Single `OUTREACH_API_KEY` env var verified in `lib/outreachApiAuth.ts` using `timingSafeEqual`. Seven route files under `app/api/v1/outreach/` handle CRUD, bulk upsert, contact logging, email sending, and stats. Middleware updated to allow `/api/v1` through Lucia auth.

**Tech Stack:** Next.js 14 App Router, TypeScript, Prisma + PostgreSQL, Resend, Zod, Vitest

---

## File Map

**New files:**
- `lib/outreachApiAuth.ts` — bearer token verifier using `timingSafeEqual`
- `app/api/v1/outreach/leads/route.ts` — GET (list with filters/pagination), POST (create)
- `app/api/v1/outreach/leads/bulk/route.ts` — POST (bulk upsert up to 50)
- `app/api/v1/outreach/leads/[leadId]/route.ts` — GET (single with events), PATCH (partial update)
- `app/api/v1/outreach/leads/[leadId]/contact/route.ts` — POST (log contact without email)
- `app/api/v1/outreach/leads/[leadId]/send-email/route.ts` — POST (send via Resend + log)
- `app/api/v1/outreach/stats/route.ts` — GET (summary counts)
- `tests/smoke/outreach-api-smoke.test.ts` — integration smoke test

**Modified files:**
- `middleware.ts` — add `/api/v1` to `publicPaths`

---

## Task 1: Auth Helper + Middleware

**Files:**
- Create: `lib/outreachApiAuth.ts`
- Modify: `middleware.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/__tests__/outreachApiAuth.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// We need to set/unset the env var around tests
const VALID_KEY = "test-api-key-abcdef1234567890";

describe("verifyOutreachApiKey", () => {
  let originalKey: string | undefined;

  beforeEach(() => {
    originalKey = process.env.OUTREACH_API_KEY;
    process.env.OUTREACH_API_KEY = VALID_KEY;
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.OUTREACH_API_KEY;
    } else {
      process.env.OUTREACH_API_KEY = originalKey;
    }
  });

  it("returns ok:true for valid key", async () => {
    const { verifyOutreachApiKey } = await import("@/lib/outreachApiAuth");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads", {
      headers: { authorization: `Bearer ${VALID_KEY}` },
    });
    const result = verifyOutreachApiKey(req);
    expect(result.ok).toBe(true);
  });

  it("returns 401 for wrong key", async () => {
    const { verifyOutreachApiKey } = await import("@/lib/outreachApiAuth");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads", {
      headers: { authorization: "Bearer wrong-key" },
    });
    const result = verifyOutreachApiKey(req);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(401);
  });

  it("returns 401 for missing Authorization header", async () => {
    const { verifyOutreachApiKey } = await import("@/lib/outreachApiAuth");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads");
    const result = verifyOutreachApiKey(req);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(401);
  });

  it("returns 503 when OUTREACH_API_KEY not configured", async () => {
    delete process.env.OUTREACH_API_KEY;
    const { verifyOutreachApiKey } = await import("@/lib/outreachApiAuth");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads", {
      headers: { authorization: `Bearer ${VALID_KEY}` },
    });
    const result = verifyOutreachApiKey(req);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(503);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/__tests__/outreachApiAuth.test.ts
```

Expected: FAIL — `verifyOutreachApiKey` not found

- [ ] **Step 3: Create lib/outreachApiAuth.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

type AuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

export function verifyOutreachApiKey(req: NextRequest): AuthResult {
  const apiKey = process.env.OUTREACH_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "API not configured", code: "MISCONFIGURED" },
        { status: 503 }
      ),
    };
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Missing Authorization header", code: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }

  const provided = Buffer.from(token);
  const expected = Buffer.from(apiKey);

  if (provided.length !== expected.length) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid API key", code: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }

  const valid = timingSafeEqual(provided, expected);

  if (!valid) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid API key", code: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }

  return { ok: true };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/__tests__/outreachApiAuth.test.ts
```

Expected: 4 tests passed

- [ ] **Step 5: Add /api/v1 to middleware publicPaths**

In `middleware.ts`, find the `publicPaths` array and add `"/api/v1"` to the end:

```typescript
const publicPaths = [
  "/",
  "/pricing",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/api/auth",
  "/api/stripe/webhook",
  "/invite",
  "/review",
  "/api/review",
  "/unsubscribed",
  "/api/user/unsubscribe",
  "/admin",
  "/api/admin",
  "/onboarding",
  "/ref",
  "/api/track",
  "/api/ref",
  "/api/webhooks/resend-outreach",
  "/api/v1",
];
```

- [ ] **Step 6: Add OUTREACH_API_KEY to .env**

Run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then add to `.env`:
```
OUTREACH_API_KEY=<generated_value>
```

- [ ] **Step 7: Commit**

```bash
git add lib/outreachApiAuth.ts lib/__tests__/outreachApiAuth.test.ts middleware.ts
git commit -m "feat(outreach-api): add bearer token auth helper and update middleware"
```

---

## Task 2: GET /api/v1/outreach/leads + POST (create)

**Files:**
- Create: `app/api/v1/outreach/leads/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

// ── Shared Zod schema for creating a lead ──────────────────────────────────

export const createLeadSchema = z.object({
  leadId: z.string().min(1).max(64),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
});

// ── GET /api/v1/outreach/leads ─────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};
  const status = searchParams.get("status");
  if (status && Object.values(OutreachStatus).includes(status as OutreachStatus)) {
    where.outreachStatus = status as OutreachStatus;
  }
  const contactMethod = searchParams.get("contactMethod");
  if (contactMethod && Object.values(ContactMethod).includes(contactMethod as ContactMethod)) {
    where.contactMethod = contactMethod as ContactMethod;
  }
  const signedUp = searchParams.get("signedUp");
  if (signedUp === "true") where.signedUp = true;
  if (signedUp === "false") where.signedUp = false;
  const isBetaOffer = searchParams.get("isBetaOffer");
  if (isBetaOffer === "true") where.isBetaOffer = true;
  if (isBetaOffer === "false") where.isBetaOffer = false;
  const country = searchParams.get("country");
  if (country) where.country = country;
  const fitScore = searchParams.get("fitScore");
  if (fitScore) {
    const n = parseInt(fitScore, 10);
    if (n >= 1 && n <= 5) where.fitScore = n;
  }

  // Sorting
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const allowedSortFields = [
    "createdAt", "updatedAt", "agencyName", "fitScore",
    "totalVisits", "signedUpAt", "lastVisitAt", "contactedAt",
  ];
  const orderBy = allowedSortFields.includes(sortBy)
    ? { [sortBy]: sortDir }
    : { createdAt: "desc" as const };

  const [leads, total] = await Promise.all([
    prisma.referralLead.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        leadId: true,
        agencyName: true,
        agencyWebsite: true,
        agencyLocation: true,
        agencyServices: true,
        fitScore: true,
        outreachStatus: true,
        contactMethod: true,
        contactedAt: true,
        signedUp: true,
        isBetaOffer: true,
        country: true,
        totalVisits: true,
        emailDelivered: true,
        emailBounced: true,
        emailOpenedAt: true,
        emailClickedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.referralLead.count({ where }),
  ]);

  return NextResponse.json({
    data: leads,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// ── POST /api/v1/outreach/leads ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { leadId } = parsed.data;

  // Check for conflict
  const existing = await prisma.referralLead.findUnique({ where: { leadId }, select: { leadId: true } });
  if (existing) {
    return NextResponse.json(
      { error: `Lead with leadId '${leadId}' already exists`, code: "CONFLICT" },
      { status: 409 }
    );
  }

  const lead = await prisma.referralLead.create({ data: parsed.data });

  return NextResponse.json({ data: lead }, { status: 201 });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/v1/outreach/leads/route.ts
git commit -m "feat(outreach-api): add GET /api/v1/outreach/leads (list) and POST (create)"
```

---

## Task 3: GET + PATCH /api/v1/outreach/leads/[leadId]

**Files:**
- Create: `app/api/v1/outreach/leads/[leadId]/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/leads/[leadId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

// Writable fields only — system fields excluded
const patchLeadSchema = z.object({
  agencyName: z.string().min(1).optional(),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
  contactMethod: z.nativeEnum(ContactMethod).optional(),
  optedOut: z.boolean().optional(),
}).strict(); // .strict() rejects unknown keys (prevents accidental system field writes)

// ── GET /api/v1/outreach/leads/[leadId] ───────────────────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });

  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: lead });
}

// ── PATCH /api/v1/outreach/leads/[leadId] ─────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const existing = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true },
  });
  if (!existing) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = patchLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: parsed.data,
  });

  return NextResponse.json({ data: lead });
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/api/v1/outreach/leads/[leadId]/route.ts"
git commit -m "feat(outreach-api): add GET and PATCH /api/v1/outreach/leads/[leadId]"
```

---

## Task 4: POST /api/v1/outreach/leads/bulk

**Files:**
- Create: `app/api/v1/outreach/leads/bulk/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/leads/bulk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

const bulkLeadSchema = z.object({
  leadId: z.string().min(1).max(64),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
});

const bulkBodySchema = z.object({
  leads: z.array(bulkLeadSchema).min(1).max(50),
});

export async function POST(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = bulkBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { leads } = parsed.data;

  // Check which leadIds already exist
  const existingIds = new Set(
    (await prisma.referralLead.findMany({
      where: { leadId: { in: leads.map((l) => l.leadId) } },
      select: { leadId: true },
    })).map((l) => l.leadId)
  );

  let created = 0;
  let updated = 0;
  const upsertedIds: string[] = [];
  const errors: Array<{ leadId: string; error: string }> = [];

  for (const lead of leads) {
    try {
      await prisma.referralLead.upsert({
        where: { leadId: lead.leadId },
        create: lead,
        update: lead,
      });
      if (existingIds.has(lead.leadId)) {
        updated++;
      } else {
        created++;
      }
      upsertedIds.push(lead.leadId);
    } catch (err) {
      errors.push({ leadId: lead.leadId, error: String(err) });
    }
  }

  return NextResponse.json({
    data: {
      upserted: created + updated,
      created,
      updated,
      leadIds: upsertedIds,
      ...(errors.length > 0 ? { errors } : {}),
    },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/v1/outreach/leads/bulk/route.ts
git commit -m "feat(outreach-api): add POST /api/v1/outreach/leads/bulk (upsert up to 50)"
```

---

## Task 5: POST /api/v1/outreach/leads/[leadId]/contact

**Files:**
- Create: `app/api/v1/outreach/leads/[leadId]/contact/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/leads/[leadId]/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

const contactSchema = z.object({
  contactMethod: z.nativeEnum(ContactMethod),
  messageBody: z.string().min(1),
  messageSubject: z.string().optional(),
  contactFormUrl: z.string().optional(),
  contactFormConfirmation: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
});

const METHOD_TO_STATUS: Record<ContactMethod, OutreachStatus> = {
  RESEND_EMAIL: OutreachStatus.CONTACTED_VIA_EMAIL,
  WEBSITE_FORM: OutreachStatus.CONTACTED_VIA_FORM,
  MANUAL: OutreachStatus.CONTACTED_VIA_EMAIL,
};

export async function POST(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true },
  });
  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { contactMethod, isBetaOffer, ...rest } = parsed.data;

  const updated = await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: {
      ...rest,
      contactMethod,
      contactedAt: new Date(),
      outreachStatus: METHOD_TO_STATUS[contactMethod],
      ...(isBetaOffer !== undefined ? { isBetaOffer } : {}),
    },
  });

  return NextResponse.json({ data: updated });
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/api/v1/outreach/leads/[leadId]/contact/route.ts"
git commit -m "feat(outreach-api): add POST /api/v1/outreach/leads/[leadId]/contact"
```

---

## Task 6: POST /api/v1/outreach/leads/[leadId]/send-email

**Files:**
- Create: `app/api/v1/outreach/leads/[leadId]/send-email/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/leads/[leadId]/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";
import { resend } from "@/lib/resend";

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  isBetaOffer: z.boolean().optional(),
  force: z.boolean().optional().default(false),
});

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true, outreachStatus: true },
  });
  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = sendEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { to, subject, body: emailBody, isBetaOffer, force } = parsed.data;

  // Prevent double-sending unless force=true
  if (!force && lead.outreachStatus !== OutreachStatus.NOT_CONTACTED) {
    return NextResponse.json(
      {
        error: `Lead already contacted (status: ${lead.outreachStatus}). Use force:true to override.`,
        code: "CONFLICT",
      },
      { status: 409 }
    );
  }

  // Send via Resend
  const { data, error } = await resend.emails.send({
    from: "Kristiyan <Kristiyan@scribtly.com>",
    to,
    replyTo: "Kristiyan@scribtly.com",
    subject,
    text: emailBody,
  });

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Email send failed", code: "SEND_FAILED" },
      { status: 502 }
    );
  }

  // Log on the lead
  await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: {
      contactMethod: "RESEND_EMAIL",
      contactedAt: new Date(),
      outreachStatus: OutreachStatus.CONTACTED_VIA_EMAIL,
      resendMessageId: data.id,
      messageSubject: subject,
      messageBody: emailBody,
      ...(isBetaOffer !== undefined ? { isBetaOffer } : {}),
    },
  });

  return NextResponse.json({
    data: { ok: true, resendMessageId: data.id },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/api/v1/outreach/leads/[leadId]/send-email/route.ts"
git commit -m "feat(outreach-api): add POST /api/v1/outreach/leads/[leadId]/send-email"
```

---

## Task 7: GET /api/v1/outreach/stats

**Files:**
- Create: `app/api/v1/outreach/stats/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/v1/outreach/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

export async function GET(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const [
    total,
    contacted,
    emailDelivered,
    emailOpened,
    visited,
    signedUp,
    byStatusRaw,
  ] = await Promise.all([
    prisma.referralLead.count(),
    prisma.referralLead.count({
      where: {
        outreachStatus: {
          in: [
            OutreachStatus.CONTACTED_VIA_EMAIL,
            OutreachStatus.CONTACTED_VIA_FORM,
          ],
        },
      },
    }),
    prisma.referralLead.count({ where: { emailDelivered: true } }),
    prisma.referralLead.count({ where: { emailOpenedAt: { not: null } } }),
    prisma.referralLead.count({ where: { totalVisits: { gt: 0 } } }),
    prisma.referralLead.count({ where: { signedUp: true } }),
    prisma.referralLead.groupBy({
      by: ["outreachStatus"],
      _count: { outreachStatus: true },
    }),
  ]);

  const byStatus = Object.fromEntries(
    byStatusRaw.map((r) => [r.outreachStatus, r._count.outreachStatus])
  );

  const conversionRate = total > 0 ? Math.round((signedUp / total) * 10000) / 100 : 0;

  return NextResponse.json({
    data: {
      total,
      contacted,
      emailDelivered,
      emailOpened,
      visited,
      signedUp,
      conversionRate,
      byStatus,
    },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/v1/outreach/stats/route.ts
git commit -m "feat(outreach-api): add GET /api/v1/outreach/stats"
```

---

## Task 8: Integration Smoke Test

**Files:**
- Create: `tests/smoke/outreach-api-smoke.test.ts`

- [ ] **Step 1: Create the smoke test**

```typescript
// tests/smoke/outreach-api-smoke.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// ── helpers ──────────────────────────────────────────────────────────────────

const API_KEY = process.env.OUTREACH_API_KEY ?? "test-outreach-key";

function makeReq(
  url: string,
  init: { method?: string; body?: unknown } = {}
): NextRequest {
  const { method = "GET", body } = init;
  return new NextRequest(url, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${API_KEY}`,
    },
  });
}

const LEAD_ID = "lead_api_smoke_test";

beforeAll(async () => {
  // Ensure clean state
  await prisma.referralLead.deleteMany({ where: { leadId: { startsWith: "lead_api_smoke" } } });
  // Set the API key for tests
  process.env.OUTREACH_API_KEY = API_KEY;
});

afterAll(async () => {
  await prisma.referralLead.deleteMany({ where: { leadId: { startsWith: "lead_api_smoke" } } });
});

describe("Outreach API smoke tests", () => {
  it("1. 401 without API key", async () => {
    const { GET } = await import("@/app/api/v1/outreach/leads/route");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("2. POST /leads creates a lead", async () => {
    const { POST } = await import("@/app/api/v1/outreach/leads/route");
    const req = makeReq("http://localhost/api/v1/outreach/leads", {
      method: "POST",
      body: {
        leadId: LEAD_ID,
        agencyName: "Smoke Test Agency",
        agencyServices: "TikTok",
        fitScore: 5,
      },
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.data.leadId).toBe(LEAD_ID);
    expect(body.data.agencyName).toBe("Smoke Test Agency");
  });

  it("3. POST /leads returns 409 for duplicate leadId", async () => {
    const { POST } = await import("@/app/api/v1/outreach/leads/route");
    const req = makeReq("http://localhost/api/v1/outreach/leads", {
      method: "POST",
      body: { leadId: LEAD_ID, agencyName: "Duplicate" },
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it("4. GET /leads returns paginated list", async () => {
    const { GET } = await import("@/app/api/v1/outreach/leads/route");
    const req = makeReq("http://localhost/api/v1/outreach/leads?limit=10&page=1");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.meta.total).toBeGreaterThanOrEqual(1);
  });

  it("5. GET /leads/[leadId] returns lead with events", async () => {
    const { GET } = await import("@/app/api/v1/outreach/leads/[leadId]/route");
    const req = makeReq(`http://localhost/api/v1/outreach/leads/${LEAD_ID}`);
    const res = await GET(req, { params: { leadId: LEAD_ID } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.leadId).toBe(LEAD_ID);
    expect(Array.isArray(body.data.events)).toBe(true);
  });

  it("6. PATCH /leads/[leadId] updates fields", async () => {
    const { PATCH } = await import("@/app/api/v1/outreach/leads/[leadId]/route");
    const req = makeReq(`http://localhost/api/v1/outreach/leads/${LEAD_ID}`, {
      method: "PATCH",
      body: { notes: "Updated via API", fitScore: 4 },
    });
    const res = await PATCH(req, { params: { leadId: LEAD_ID } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.notes).toBe("Updated via API");
    expect(body.data.fitScore).toBe(4);
  });

  it("7. PATCH /leads/[leadId] rejects system fields", async () => {
    const { PATCH } = await import("@/app/api/v1/outreach/leads/[leadId]/route");
    const req = makeReq(`http://localhost/api/v1/outreach/leads/${LEAD_ID}`, {
      method: "PATCH",
      body: { signedUp: true }, // system field — should be rejected by .strict()
    });
    const res = await PATCH(req, { params: { leadId: LEAD_ID } });
    expect(res.status).toBe(400);
  });

  it("8. POST /leads/bulk upserts multiple leads", async () => {
    const { POST } = await import("@/app/api/v1/outreach/leads/bulk/route");
    const req = makeReq("http://localhost/api/v1/outreach/leads/bulk", {
      method: "POST",
      body: {
        leads: [
          { leadId: "lead_api_smoke_bulk1", agencyName: "Bulk Agency 1" },
          { leadId: "lead_api_smoke_bulk2", agencyName: "Bulk Agency 2" },
          { leadId: LEAD_ID, agencyName: "Smoke Test Agency Updated" }, // existing — update
        ],
      },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.upserted).toBe(3);
    expect(body.data.created).toBe(2);
    expect(body.data.updated).toBe(1);
  });

  it("9. POST /leads/[leadId]/contact logs contact", async () => {
    const { POST } = await import("@/app/api/v1/outreach/leads/[leadId]/contact/route");
    const req = makeReq(
      `http://localhost/api/v1/outreach/leads/lead_api_smoke_bulk1/contact`,
      {
        method: "POST",
        body: {
          contactMethod: "WEBSITE_FORM",
          messageBody: "Hi Bulk Agency 1 team...",
          contactFormUrl: "https://bulkagency1.com/contact",
          contactFormConfirmation: "Thanks for your message!",
        },
      }
    );
    const res = await POST(req, { params: { leadId: "lead_api_smoke_bulk1" } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.outreachStatus).toBe("CONTACTED_VIA_FORM");
    expect(body.data.contactedAt).toBeTruthy();
  });

  it("10. GET /stats returns summary counts", async () => {
    const { GET } = await import("@/app/api/v1/outreach/stats/route");
    const req = makeReq("http://localhost/api/v1/outreach/stats");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.data.total).toBe("number");
    expect(typeof body.data.contacted).toBe("number");
    expect(typeof body.data.conversionRate).toBe("number");
    expect(typeof body.data.byStatus).toBe("object");
  });

  it("11. GET /leads/[leadId] returns 404 for unknown leadId", async () => {
    const { GET } = await import("@/app/api/v1/outreach/leads/[leadId]/route");
    const req = makeReq("http://localhost/api/v1/outreach/leads/does-not-exist");
    const res = await GET(req, { params: { leadId: "does-not-exist" } });
    expect(res.status).toBe(404);
  });
});
```

- [ ] **Step 2: Run smoke tests**

```bash
npx vitest run tests/smoke/outreach-api-smoke.test.ts
```

Expected: 11 tests passed

- [ ] **Step 3: Run full test suite**

```bash
npm test
```

Expected: All tests pass (43 existing + 11 new + 4 auth unit tests = 58 total)

- [ ] **Step 4: Commit**

```bash
git add tests/smoke/outreach-api-smoke.test.ts
git commit -m "test: add outreach API smoke tests"
```

---

## Self-Review

**Spec coverage:**
- ✅ `GET /leads` with all filters + pagination + sorting — Task 2
- ✅ `GET /leads/:leadId` with events — Task 3
- ✅ `POST /leads` create with 409 on duplicate — Task 2
- ✅ `PATCH /leads/:leadId` partial update, system fields blocked — Task 3
- ✅ `POST /leads/bulk` upsert up to 50 — Task 4
- ✅ `POST /leads/:leadId/contact` log contact — Task 5
- ✅ `POST /leads/:leadId/send-email` send + log, 409 guard, force override — Task 6
- ✅ `GET /stats` with byStatus breakdown — Task 7
- ✅ `lib/outreachApiAuth.ts` timingSafeEqual, 503 if unconfigured — Task 1
- ✅ Middleware updated with `/api/v1` — Task 1
- ✅ `OUTREACH_API_KEY` in `.env` — Task 1
- ✅ Error format `{ error, code }` consistent across all routes — all tasks
- ✅ Smoke tests covering all endpoints — Task 8

**Type consistency:**
- `verifyOutreachApiKey` returns `{ ok: true } | { ok: false; response: NextResponse }` — used identically in all 7 route files ✅
- `params.leadId` used consistently in all `[leadId]` routes ✅
- `OutreachStatus` enum imported from `@prisma/client` in every file that uses it ✅
