import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBetaExpiring } from "@/lib/sendEmail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const in8Days = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);

  // Warning: expiring in 7–8 days and warning not yet sent
  const toWarn = await prisma.user.findMany({
    where: {
      isBetaTester: true,
      betaExpiresAt: { gte: in7Days, lt: in8Days },
      betaWarningEmailSentAt: null,
    },
    select: { id: true, email: true, name: true, betaExpiresAt: true },
  });

  let warned = 0;
  for (const u of toWarn) {
    if (!u.betaExpiresAt) continue;
    await prisma.user.update({
      where: { id: u.id },
      data: { betaWarningEmailSentAt: now },
    });
    await sendBetaExpiring({
      to: u.email,
      name: u.name ?? undefined,
      betaExpiresAt: u.betaExpiresAt,
    }).catch(console.error);
    warned++;
  }

  // Expire: betaExpiresAt in the past and workspace still on BASIC
  const expiredUsers = await prisma.user.findMany({
    where: {
      isBetaTester: true,
      betaExpiresAt: { lte: now },
    },
    select: { defaultWorkspaceId: true },
  });

  const workspaceIds = expiredUsers
    .map((u) => u.defaultWorkspaceId)
    .filter((id): id is string => id !== null);

  const { count: downgraded } = await prisma.workspace.updateMany({
    where: { id: { in: workspaceIds }, plan: "BASIC" },
    data: { plan: "FREE" },
  });

  return NextResponse.json({ ok: true, warned, downgraded });
}
