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
