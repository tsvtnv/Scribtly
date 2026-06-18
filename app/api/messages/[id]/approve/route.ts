import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeNextSlot } from "@/lib/scheduler";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const message = await prisma.message.findFirst({
    where: { id },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
  });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const acc = message.campaign.linkedInAccount;

  // Find the last scheduled slot for this account so sequential approvals space correctly
  const lastScheduled = await prisma.message.findFirst({
    where: {
      campaign: { linkedInAccountId: acc.id },
      status: "APPROVED",
      scheduledFor: { not: null },
    },
    orderBy: { scheduledFor: "desc" },
  });

  const scheduledFor = computeNextSlot(
    {
      timezone: acc.timezone,
      sendWindowStart: acc.sendWindowStart,
      sendWindowEnd: acc.sendWindowEnd,
      sendIntervalMinutes: acc.sendIntervalMinutes,
      sendJitterMinutes: acc.sendJitterMinutes,
    },
    lastScheduled?.scheduledFor ?? new Date()
  );

  await prisma.message.update({
    where: { id },
    data: { status: "APPROVED", scheduledFor },
  });

  // Lead stays PENDING_APPROVAL until the cron actually sends — the UI will still show it.
  // No lead status change here; that happens in the worker when message is dispatched.

  return NextResponse.json({ scheduledFor: scheduledFor.toISOString() });
}
