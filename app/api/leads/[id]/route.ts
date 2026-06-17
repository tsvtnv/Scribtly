import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const lead = await prisma.lead.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
