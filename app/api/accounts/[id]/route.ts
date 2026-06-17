import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

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
