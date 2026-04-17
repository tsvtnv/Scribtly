import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { NotFoundError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace, role } = await ensureUser();
    requireOwner(role);
    const invite = await prisma.invite.findUnique({ where: { id: params.id } });
    if (!invite || invite.workspaceId !== workspace.id) throw new NotFoundError("Invite not found");
    await prisma.invite.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
