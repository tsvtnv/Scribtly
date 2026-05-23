import { NextResponse } from "next/server";
import { getSession, lucia, clearSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const { session } = await getSession();
  if (session) {
    await lucia.invalidateSession(session.id);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
