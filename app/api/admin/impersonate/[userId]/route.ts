import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/auth";

const IMPERSONATE_COOKIE = "admin_impersonating";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { id: true, email: true, disabled: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  await prisma.adminAuditLog.create({
    data: {
      action: "impersonate_user",
      targetId: user.id,
      targetType: "User",
      details: user.email,
    },
  });

  const res = NextResponse.json({ ok: true });

  res.cookies.set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  res.cookies.set(IMPERSONATE_COOKIE, "1", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}
