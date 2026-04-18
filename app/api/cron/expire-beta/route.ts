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

  // Warning: expiring in 6–7 days and warning not yet sent
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
    await sendBetaExpiring({
      to: u.email,
      name: u.name ?? undefined,
      betaExpiresAt: u.betaExpiresAt,
    }).catch(console.error);
    await prisma.user.update({
      where: { id: u.id },
      data: { betaWarningEmailSentAt: now },
    });
    warned++;
  }

  // Expire: betaExpiresAt in the past and workspace still on BASIC
  const expired = await prisma.user.findMany({
    where: {
      isBetaTester: true,
      betaExpiresAt: { lte: now },
    },
    select: { id: true, defaultWorkspaceId: true },
  });

  let downgraded = 0;
  for (const u of expired) {
    if (!u.defaultWorkspaceId) continue;
    const ws = await prisma.workspace.findUnique({
      where: { id: u.defaultWorkspaceId },
      select: { plan: true },
    });
    if (ws?.plan === "BASIC") {
      await prisma.workspace.update({
        where: { id: u.defaultWorkspaceId },
        data: { plan: "FREE" },
      });
      downgraded++;
    }
  }

  return NextResponse.json({ ok: true, warned, downgraded });
}
