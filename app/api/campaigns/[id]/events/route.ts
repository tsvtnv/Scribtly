import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dateParam = req.nextUrl.searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();
  const start = new Date(date); start.setHours(0, 0, 0, 0);
  const end = new Date(date); end.setHours(23, 59, 59, 999);

  const events = await prisma.event.findMany({
    where: { campaignId: id, createdAt: { gte: start, lte: end } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(events);
}
