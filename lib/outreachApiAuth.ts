import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export type AuthResult =
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

  // Always compare against expected; if lengths differ, compare against a
  // dummy so the call site is timing-uniform.
  const dummy = Buffer.alloc(expected.length);
  const safe = provided.length === expected.length ? provided : dummy;
  const valid = timingSafeEqual(safe, expected);

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
