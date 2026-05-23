import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ws = await prisma.workspace.findUnique({
    where: { id: params.workspaceId },
    select: { id: true },
  });
  if (!ws) return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  await prisma.workspace.update({
    where: { id: params.workspaceId },
    data: { scriptCount: 0, scriptCountResetAt: new Date() },
  });

  await prisma.adminAuditLog.create({
    data: {
      action: "quota_reset",
      targetId: params.workspaceId,
      targetType: "Workspace",
    },
  });

  return NextResponse.json({ ok: true });
}
