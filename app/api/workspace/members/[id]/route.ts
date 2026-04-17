import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { NotFoundError, ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace, role } = await ensureUser();
    requireOwner(role);
    const member = await prisma.workspaceMember.findUnique({ where: { id: params.id } });
    if (!member || member.workspaceId !== workspace.id) throw new NotFoundError("Member not found");
    if (member.role === "OWNER") throw new ValidationError("Cannot remove the owner");
    await prisma.workspaceMember.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
