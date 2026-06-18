import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeNextSlot, AccountScheduleConfig } from "@/lib/scheduler";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: campaignId } = await params;

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const minIcpScore: number | undefined =
    typeof body.minIcpScore === "number" ? body.minIcpScore : undefined;

  // Find last APPROVED message for this account to use as reference time
  const lastApproved = await prisma.message.findFirst({
    where: {
      campaign: { linkedInAccountId: campaign.linkedInAccountId },
      status: "APPROVED",
      scheduledFor: { not: null },
    },
    orderBy: { scheduledFor: "desc" },
  });

  // Fetch all PENDING_APPROVAL messages for this campaign
  const pendingMessages = await prisma.message.findMany({
    where: {
      campaignId,
      status: "PENDING_APPROVAL",
      ...(minIcpScore !== undefined
        ? { lead: { icpScore: { gte: minIcpScore } } }
        : {}),
    },
    orderBy: { lead: { icpScore: "desc" } },
    include: { lead: { select: { icpScore: true } } },
  });

  if (pendingMessages.length === 0) {
    return NextResponse.json({ approved: 0, skipped: 0, firstSlot: null });
  }

  const acc = campaign.linkedInAccount;
  const scheduleConfig: AccountScheduleConfig = {
    timezone: acc.timezone,
    sendWindowStart: acc.sendWindowStart,
    sendWindowEnd: acc.sendWindowEnd,
    sendIntervalMinutes: acc.sendIntervalMinutes,
    sendJitterMinutes: acc.sendJitterMinutes,
  };

  let referenceTime: Date = lastApproved?.scheduledFor ?? new Date();

  const updates: { id: string; scheduledFor: Date }[] = [];
  for (const message of pendingMessages) {
    const slot = computeNextSlot(scheduleConfig, referenceTime);
    updates.push({ id: message.id, scheduledFor: slot });
    referenceTime = slot;
  }

  const firstSlot = updates[0]?.scheduledFor ?? null;

  await prisma.$transaction(
    updates.map((u) =>
      prisma.message.update({
        where: { id: u.id },
        data: { status: "APPROVED", scheduledFor: u.scheduledFor },
      })
    )
  );

  return NextResponse.json({
    approved: updates.length,
    skipped: 0,
    firstSlot: firstSlot?.toISOString() ?? null,
  });
}
