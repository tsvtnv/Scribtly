import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/auth";

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

  const disabled = !user.disabled;
  await prisma.user.update({
    where: { id: params.userId },
    data: { disabled },
  });

  if (disabled) {
    await lucia.invalidateUserSessions(params.userId);
  }

  await prisma.adminAuditLog.create({
    data: {
      action: disabled ? "disable_user" : "enable_user",
      targetId: params.userId,
      targetType: "User",
      details: user.email,
    },
  });

  return NextResponse.json({ ok: true, disabled });
}
