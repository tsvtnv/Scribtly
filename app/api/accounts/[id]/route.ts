import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

function dailyLimitCaps(premium: boolean) {
  return premium
    ? { connMax: 80, msgMax: 200 }
    : { connMax: 25, msgMax: 75 };
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const caps = dailyLimitCaps(account.premium);
  const updates: Record<string, number | string> = {};

  if (typeof body.dailyConnLimit === "number") {
    updates.dailyConnLimit = Math.min(caps.connMax, Math.max(1, Math.round(body.dailyConnLimit)));
  }
  if (typeof body.dailyMsgLimit === "number") {
    updates.dailyMsgLimit = Math.min(caps.msgMax, Math.max(1, Math.round(body.dailyMsgLimit)));
  }
  if (typeof body.timezone === "string") {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: body.timezone });
      updates.timezone = body.timezone;
    } catch {
      return NextResponse.json({ error: "Invalid timezone" }, { status: 400 });
    }
  }
  if (typeof body.sendWindowStart === "number") {
    updates.sendWindowStart = Math.min(22, Math.max(0, Math.round(body.sendWindowStart)));
  }
  if (typeof body.sendWindowEnd === "number") {
    updates.sendWindowEnd = Math.min(23, Math.max(1, Math.round(body.sendWindowEnd)));
  }
  if (typeof body.sendIntervalMinutes === "number") {
    updates.sendIntervalMinutes = Math.min(120, Math.max(5, Math.round(body.sendIntervalMinutes)));
  }
  if (typeof body.sendJitterMinutes === "number") {
    updates.sendJitterMinutes = Math.min(30, Math.max(0, Math.round(body.sendJitterMinutes)));
  }

  const finalStart = typeof updates.sendWindowStart === "number" ? updates.sendWindowStart : account.sendWindowStart;
  const finalEnd = typeof updates.sendWindowEnd === "number" ? updates.sendWindowEnd : account.sendWindowEnd;
  if (finalStart >= finalEnd) {
    return NextResponse.json({ error: "sendWindowStart must be less than sendWindowEnd" }, { status: 400 });
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }

  const updated = await prisma.linkedInAccount.update({ where: { id }, data: updates });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await unipile.deleteAccount(account.unipileAccountId);
  } catch {
    // continue even if Unipile fails
  }

  await prisma.linkedInAccount.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
