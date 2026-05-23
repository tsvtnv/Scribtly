import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ws = await prisma.workspace.findUnique({
    where: { id: params.workspaceId },
    select: { id: true, name: true },
  });
  if (!ws) return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  await prisma.workspace.delete({ where: { id: params.workspaceId } });

  await prisma.adminAuditLog.create({
    data: {
      action: "delete_workspace",
      targetId: params.workspaceId,
      targetType: "Workspace",
      details: ws.name,
    },
  });

  return NextResponse.json({ ok: true });
}
