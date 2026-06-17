import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const message = await prisma.message.findFirst({ where: { id }, include: { campaign: true } });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.message.update({ where: { id }, data: { status: "FAILED" } });
  await prisma.lead.update({ where: { id: message.leadId }, data: { status: "SKIPPED" } });
  return NextResponse.json({ success: true });
}
