import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

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

  const updates: Record<string, number> = {};
  if (typeof body.dailyConnLimit === "number") {
    const v = Math.min(30, Math.max(1, Math.round(body.dailyConnLimit)));
    updates.dailyConnLimit = v;
  }
  if (typeof body.dailyMsgLimit === "number") {
    const v = Math.min(100, Math.max(1, Math.round(body.dailyMsgLimit)));
    updates.dailyMsgLimit = v;
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
