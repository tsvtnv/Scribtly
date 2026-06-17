import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const messages = await prisma.message.findMany({
    where: { campaignId: id, status: "PENDING_APPROVAL" },
    include: { lead: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}
