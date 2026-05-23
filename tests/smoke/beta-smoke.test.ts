import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// ── helpers ──────────────────────────────────────────────────────────────────

function makeRequest(
  url: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string>; cookies?: Record<string, string> } = {}
): NextRequest {
  const { method = "GET", body, headers = {}, cookies = {} } = init;
  const cookieStr = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
  return new NextRequest(url, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json",
      ...(cookieStr ? { cookie: cookieStr } : {}),
      ...headers,
    },
  });
}

async function makeAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "dev-secret";
  const ts = Date.now().toString();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(ts));
  return `${ts}.${Buffer.from(sig).toString("hex")}`;
}

const TEST_USER_EMAIL = "beta-smoke-test@example.com";
let testUserId: string;
let testWorkspaceId: string;

// ── setup ──────────────────────────────────────────────────────────────────

beforeAll(async () => {
  // Create a test user + workspace
  const user = await prisma.user.create({
    data: {
      email: TEST_USER_EMAIL,
      emailVerified: true,
      ownedWorkspaces: {
        create: {
          id: `ws-beta-smoke-${Date.now()}`,
          name: "Beta Smoke Workspace",
          plan: "FREE",
          scriptCountResetAt: new Date(),
        },
      },
    },
    include: { ownedWorkspaces: true },
  });
  testUserId = user.id;
  testWorkspaceId = user.ownedWorkspaces[0].id;
  await prisma.user.update({
    where: { id: testUserId },
    data: { defaultWorkspaceId: testWorkspaceId },
  });

  // Create a beta offer lead
  await prisma.referralLead.upsert({
    where: { leadId: "lead_beta_smoke" },
    update: {},
    create: {
      leadId: "lead_beta_smoke",
      agencyName: "Beta Smoke Agency",
      agencyServices: "TikTok",
      isBetaOffer: true,
    },
  });
});

afterAll(async () => {
  await prisma.user.delete({ where: { id: testUserId } }).catch(() => {});
  await prisma.referralLead.delete({ where: { leadId: "lead_beta_smoke" } }).catch(() => {});
});

// ── tests ──────────────────────────────────────────────────────────────────

describe("Beta tester smoke tests", () => {
  it("1. Admin can grant beta via POST /api/admin/users/[userId]/beta", async () => {
    const { POST } = await import("@/app/api/admin/users/[userId]/beta/route");
    const token = await makeAdminToken();
    const req = makeRequest(`http://localhost/api/admin/users/${testUserId}/beta`, {
      method: "POST",
      body: { action: "grant" },
      cookies: { admin_session: token },
    });
    const res = await POST(req, { params: { userId: testUserId } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.betaExpiresAt).toBeTruthy();

    const updated = await prisma.user.findUnique({ where: { id: testUserId } });
    expect(updated?.isBetaTester).toBe(true);
    expect(updated?.betaExpiresAt).toBeTruthy();

    const ws = await prisma.workspace.findUnique({ where: { id: testWorkspaceId } });
    expect(ws?.plan).toBe("BASIC");
  });

  it("2. Admin can change plan via POST /api/admin/users/[userId]/plan", async () => {
    const { POST } = await import("@/app/api/admin/users/[userId]/plan/route");
    const token = await makeAdminToken();
    const req = makeRequest(`http://localhost/api/admin/users/${testUserId}/plan`, {
      method: "POST",
      body: { plan: "PRO" },
      cookies: { admin_session: token },
    });
    const res = await POST(req, { params: { userId: testUserId } });
    expect(res.status).toBe(200);

    const ws = await prisma.workspace.findUnique({ where: { id: testWorkspaceId } });
    expect(ws?.plan).toBe("PRO");

    // Reset back to BASIC for next tests
    await prisma.workspace.update({ where: { id: testWorkspaceId }, data: { plan: "BASIC" } });
  });

  it("3. Admin can extend beta by 30 days", async () => {
    const { POST } = await import("@/app/api/admin/users/[userId]/beta/route");
    const before = await prisma.user.findUnique({
      where: { id: testUserId },
      select: { betaExpiresAt: true },
    });
    const token = await makeAdminToken();
    const req = makeRequest(`http://localhost/api/admin/users/${testUserId}/beta`, {
      method: "POST",
      body: { action: "extend" },
      cookies: { admin_session: token },
    });
    await POST(req, { params: { userId: testUserId } });
    const after = await prisma.user.findUnique({
      where: { id: testUserId },
      select: { betaExpiresAt: true },
    });
    const diff = after!.betaExpiresAt!.getTime() - before!.betaExpiresAt!.getTime();
    expect(diff).toBeCloseTo(30 * 24 * 60 * 60 * 1000, -4);
  });

  it("4. Cron job downgrades expired beta users", async () => {
    // Set expiry in the past
    await prisma.user.update({
      where: { id: testUserId },
      data: { betaExpiresAt: new Date(Date.now() - 1000) },
    });

    const { POST } = await import("@/app/api/cron/expire-beta/route");
    const cronSecret = process.env.CRON_SECRET ?? "test-cron-secret";
    process.env.CRON_SECRET = cronSecret;
    const req = makeRequest("http://localhost/api/cron/expire-beta", {
      method: "POST",
      headers: { authorization: `Bearer ${cronSecret}` },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.downgraded).toBeGreaterThanOrEqual(1);

    const ws = await prisma.workspace.findUnique({ where: { id: testWorkspaceId } });
    expect(ws?.plan).toBe("FREE");
  });

  it("5. Admin can revoke beta", async () => {
    // Re-grant first
    await prisma.user.update({
      where: { id: testUserId },
      data: { betaExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
    });
    await prisma.workspace.update({ where: { id: testWorkspaceId }, data: { plan: "BASIC" } });

    const { POST } = await import("@/app/api/admin/users/[userId]/beta/route");
    const token = await makeAdminToken();
    const req = makeRequest(`http://localhost/api/admin/users/${testUserId}/beta`, {
      method: "POST",
      body: { action: "revoke" },
      cookies: { admin_session: token },
    });
    const res = await POST(req, { params: { userId: testUserId } });
    expect(res.status).toBe(200);

    const ws = await prisma.workspace.findUnique({ where: { id: testWorkspaceId } });
    expect(ws?.plan).toBe("FREE");
  });

  it("6. Cron returns 401 without CRON_SECRET", async () => {
    const { POST } = await import("@/app/api/cron/expire-beta/route");
    const req = makeRequest("http://localhost/api/cron/expire-beta", {
      method: "POST",
      headers: { authorization: "Bearer wrong" },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});
