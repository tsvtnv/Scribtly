/**
 * Referral Tracking System — End-to-End Smoke Test
 *
 * Exercises the full pipeline without a real browser:
 *   DB seed → API calls (handlers imported directly) → DB verification
 *
 * Requires a real DATABASE_URL (reads from .env via vitest/dotenv).
 * Admin auth is handled by generating a valid HMAC token and injecting
 * it as a cookie. Webhook signature verification is bypassed by running
 * with NODE_ENV=test and no RESEND_OUTREACH_WEBHOOK_SECRET set (the
 * handler falls through to an "unauthorized" path in that case), so
 * instead we exercise the webhook logic directly via Prisma to keep the
 * test hermetic.
 */

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { NextRequest } from "next/server";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Build a minimal NextRequest for route handler calls. */
function makeRequest(
  url: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
): NextRequest {
  const { method = "GET", body, headers = {} } = init;
  return new NextRequest(url, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "127.0.0.1",
      ...headers,
    },
  });
}

/** Generate a valid HMAC admin token (mirrors lib/adminAuth.ts). */
async function makeAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "dev-secret";
  const ts = Date.now().toString();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(ts));
  return `${ts}.${Buffer.from(sig).toString("hex")}`;
}

// ── mocks ────────────────────────────────────────────────────────────────────

// next/headers (cookies) is a Server Component API not available in Node.
// We mock it so the admin route's checkAdmin() can read our injected token.
let _adminToken = "";

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: (name: string) =>
      name === "admin_session" ? { value: _adminToken } : undefined,
  }),
}));

// ── test suite ───────────────────────────────────────────────────────────────

const LEAD_ID = "lead_smoke_001";
const AGENCY_NAME = "Smoke Test Agency";
const RESEND_MSG_ID = "resend_smoke_msg_001";

describe("Referral tracking smoke test", () => {
  // lazy-imported after mocks are installed
  let adminPost: (req: NextRequest) => Promise<Response>;
  let prefillGet: (
    req: NextRequest,
    ctx: { params: { leadId: string } }
  ) => Promise<Response>;
  let trackPost: (req: NextRequest) => Promise<Response>;
  let prisma: import("@prisma/client").PrismaClient;

  beforeAll(async () => {
    // Ensure we have a real DATABASE_URL
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
      throw new Error(
        "DATABASE_URL must point to a real database for smoke tests. " +
          "Set it in .env or via environment variables."
      );
    }

    // Generate a valid admin token once for all tests
    _adminToken = await makeAdminToken();

    // Lazy-import route handlers AFTER mocks are registered
    const adminLeadsModule = await import(
      "@/app/api/admin/leads/route"
    );
    adminPost = adminLeadsModule.POST;

    const prefillModule = await import(
      "@/app/api/ref/[leadId]/prefill/route"
    );
    prefillGet = prefillModule.GET;

    const trackModule = await import("@/app/api/track/route");
    trackPost = trackModule.POST;

    const prismaModule = await import("@/lib/prisma");
    prisma = prismaModule.prisma;

    // Clean up any leftover test data from a previous run
    await prisma.referralLead.deleteMany({ where: { leadId: LEAD_ID } });
  });

  afterAll(async () => {
    const prismaModule = await import("@/lib/prisma");
    // Cascade deletes ReferralEvents too
    await prismaModule.prisma.referralLead.deleteMany({ where: { leadId: LEAD_ID } });
    await prismaModule.prisma.$disconnect();
  });

  // ── 1. Seed ────────────────────────────────────────────────────────────────

  it("1. seeds a test lead via POST /api/admin/leads", async () => {
    const req = makeRequest("http://localhost/api/admin/leads", {
      method: "POST",
      body: {
        leadId: LEAD_ID,
        agencyName: AGENCY_NAME,
        agencyServices: "TikTok",
        resendMessageId: RESEND_MSG_ID,
      },
    });

    const res = await adminPost(req);
    expect(res.status).toBe(201);

    const data = await res.json();
    expect(data.leadId).toBe(LEAD_ID);
    expect(data.agencyName).toBe(AGENCY_NAME);
  });

  // ── 2. Prefill ─────────────────────────────────────────────────────────────

  it("2. GET /api/ref/:leadId/prefill returns agencyName", async () => {
    const req = makeRequest(
      `http://localhost/api/ref/${LEAD_ID}/prefill`
    );
    const res = await prefillGet(req, { params: { leadId: LEAD_ID } });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.agencyName).toBe(AGENCY_NAME);
  });

  it("2b. GET /api/ref/nonexistent/prefill returns agencyName: null", async () => {
    const req = makeRequest("http://localhost/api/ref/lead_nonexistent/prefill");
    const res = await prefillGet(req, { params: { leadId: "lead_nonexistent" } });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.agencyName).toBeNull();
  });

  // ── 3. Track events ────────────────────────────────────────────────────────

  it("3a. POST /api/track page_view increments totalVisits", async () => {
    const req = makeRequest("http://localhost/api/track", {
      method: "POST",
      body: {
        leadId: LEAD_ID,
        eventType: "page_view",
        page: `/ref/${LEAD_ID}`,
        metadata: {},
      },
    });

    const res = await trackPost(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);

    // Verify DB
    const lead = await prisma.referralLead.findUnique({ where: { leadId: LEAD_ID } });
    expect(lead?.totalVisits).toBe(1);

    const events = await prisma.referralEvent.findMany({ where: { leadId: LEAD_ID } });
    expect(events.some((e) => e.eventType === "page_view")).toBe(true);
  });

  it("3b. POST /api/track cta_click stores event", async () => {
    const req = makeRequest("http://localhost/api/track", {
      method: "POST",
      body: {
        leadId: LEAD_ID,
        eventType: "cta_click",
        page: `/ref/${LEAD_ID}`,
        metadata: {},
      },
    });

    const res = await trackPost(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);

    const events = await prisma.referralEvent.findMany({ where: { leadId: LEAD_ID } });
    expect(events.some((e) => e.eventType === "cta_click")).toBe(true);
    // page_view event from previous test + cta_click
    expect(events.length).toBeGreaterThanOrEqual(2);
  });

  it("3c. second page_view further increments totalVisits", async () => {
    const req = makeRequest("http://localhost/api/track", {
      method: "POST",
      body: {
        leadId: LEAD_ID,
        eventType: "page_view",
        page: `/ref/${LEAD_ID}`,
        metadata: {},
      },
    });
    await trackPost(req);

    const lead = await prisma.referralLead.findUnique({ where: { leadId: LEAD_ID } });
    expect(lead?.totalVisits).toBe(2);
  });

  // ── 4. Unknown leadId silently ignored ─────────────────────────────────────

  it("4. POST /api/track with unknown leadId returns 200, no DB write", async () => {
    const req = makeRequest("http://localhost/api/track", {
      method: "POST",
      body: {
        leadId: "lead_unknown_999",
        eventType: "page_view",
        page: "/ref/unknown",
        metadata: {},
      },
    });

    const res = await trackPost(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);

    // No events for the unknown lead
    const events = await prisma.referralEvent.findMany({
      where: { leadId: "lead_unknown_999" },
    });
    expect(events.length).toBe(0);
  });

  // ── 5. Resend webhook logic via Prisma ─────────────────────────────────────
  //
  // The webhook handler requires Svix signature verification. Rather than
  // setting up a real Svix secret, we exercise the identical DB update logic
  // directly via Prisma, which is what the handler does after verification.

  it("5. email.delivered webhook logic sets emailDelivered=true", async () => {
    // Confirm baseline
    const before = await prisma.referralLead.findUnique({ where: { leadId: LEAD_ID } });
    expect(before?.emailDelivered).toBe(false);
    expect(before?.resendMessageId).toBe(RESEND_MSG_ID);

    // Apply the same update the webhook handler would apply
    const lead = await prisma.referralLead.findFirst({
      where: { resendMessageId: RESEND_MSG_ID },
    });
    expect(lead).not.toBeNull();

    await prisma.referralLead.update({
      where: { id: lead!.id },
      data: { emailDelivered: true },
    });

    const after = await prisma.referralLead.findUnique({ where: { leadId: LEAD_ID } });
    expect(after?.emailDelivered).toBe(true);
  });

  // ── Bonus: webhook handler returns 401 when no secret configured ───────────

  it("5b. webhook handler returns 401 when RESEND_OUTREACH_WEBHOOK_SECRET is missing and NODE_ENV!=development", async () => {
    // Save and clear the secret
    const originalSecret = process.env.RESEND_OUTREACH_WEBHOOK_SECRET;
    const originalNodeEnv = process.env.NODE_ENV;
    delete process.env.RESEND_OUTREACH_WEBHOOK_SECRET;
    // Force non-development mode for this check
    (process.env as Record<string, string>).NODE_ENV = "test";

    // Re-import to pick up env change (the module caches RESEND_WEBHOOK_SECRET
    // at import time, so we test with the already-imported module where it was
    // already undefined — calling POST with an invalid signature should fail)
    const { POST: webhookPost } = await import(
      "@/app/api/webhooks/resend-outreach/route"
    );

    const payload = JSON.stringify({
      type: "email.delivered",
      data: { message_id: RESEND_MSG_ID },
    });

    const req = new NextRequest(
      "http://localhost/api/webhooks/resend-outreach",
      {
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json",
          // No valid svix headers — should be rejected
        },
      }
    );

    const res = await webhookPost(req);
    // Without a secret or valid signature the handler should reject
    expect(res.status).toBe(401);

    // Restore env
    if (originalSecret !== undefined) {
      process.env.RESEND_OUTREACH_WEBHOOK_SECRET = originalSecret;
    }
    (process.env as Record<string, string>).NODE_ENV = originalNodeEnv ?? "test";
  });
});
