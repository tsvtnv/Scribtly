import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Plan } from "@prisma/client";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  action: z.enum(["grant", "revoke", "extend"]),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { userId } = params;
  const { action } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, defaultWorkspaceId: true, isBetaTester: true, betaExpiresAt: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const now = new Date();

  if (action === "grant") {
    if (!user.defaultWorkspaceId) {
      return NextResponse.json({ error: "No workspace" }, { status: 400 });
    }
    const betaExpiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    await prisma.user.update({
      where: { id: userId },
      data: { isBetaTester: true, betaExpiresAt, betaWarningEmailSentAt: null },
    });
    await prisma.workspace.update({
      where: { id: user.defaultWorkspaceId },
      data: { plan: Plan.BASIC },
    });
    return NextResponse.json({ ok: true, betaExpiresAt: betaExpiresAt.toISOString() });
  }

  if (action === "revoke") {
    if (!user.defaultWorkspaceId) {
      return NextResponse.json({ error: "No workspace" }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: userId },
      data: { betaExpiresAt: now }, // mark expired immediately
    });
    await prisma.workspace.update({
      where: { id: user.defaultWorkspaceId },
      data: { plan: Plan.FREE },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "extend") {
    const currentExpiry = user.betaExpiresAt ?? now;
    const newExpiry = new Date(currentExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
    await prisma.user.update({
      where: { id: userId },
      data: { betaExpiresAt: newExpiry, betaWarningEmailSentAt: null },
    });
    return NextResponse.json({ ok: true, betaExpiresAt: newExpiry.toISOString() });
  }
}
