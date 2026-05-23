import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

const SESSION_COOKIE = "auth_session";
const IMPERSONATE_COOKIE = "admin_impersonating";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await lucia.invalidateSession(sessionId).catch(() => null);
  }

  const res = NextResponse.json({ ok: true });

  const blank = lucia.createBlankSessionCookie();
  res.cookies.set(blank.name, blank.value, {
    ...blank.attributes,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  res.cookies.set(IMPERSONATE_COOKIE, "", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
