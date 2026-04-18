// tests/smoke/outreach-api-smoke.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// ── helpers ──────────────────────────────────────────────────────────────────

if (!process.env.OUTREACH_API_KEY) {
  throw new Error("OUTREACH_API_KEY must be set to run outreach smoke tests");
}
const API_KEY = process.env.OUTREACH_API_KEY;

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
