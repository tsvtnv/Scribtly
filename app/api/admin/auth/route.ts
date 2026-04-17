import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, verifyAdminToken, COOKIE, COOKIE_MAX_AGE } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  if (!password || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = await signAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}
