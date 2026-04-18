import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";

const VALID_KEY = "test-api-key-abcdef1234567890";

describe("verifyOutreachApiKey", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("OUTREACH_API_KEY", VALID_KEY);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
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
    vi.unstubAllEnvs(); // remove the OUTREACH_API_KEY stub for this test
    delete process.env.OUTREACH_API_KEY; // also clear any value loaded from .env files
    vi.resetModules(); // ensure fresh import picks up the unset env
    const { verifyOutreachApiKey } = await import("@/lib/outreachApiAuth");
    const req = new NextRequest("http://localhost/api/v1/outreach/leads", {
      headers: { authorization: `Bearer ${VALID_KEY}` },
    });
    const result = verifyOutreachApiKey(req);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(503);
  });
});
