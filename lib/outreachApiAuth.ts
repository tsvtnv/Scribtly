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
