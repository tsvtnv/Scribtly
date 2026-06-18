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

  const STATUSES = ["NEW", "ENRICHED", "QUEUED", "CONTACTED", "ACCEPTED", "SKIPPED", "PENDING_APPROVAL"] as const;

  const [leads, total, ...statusCounts] = await Promise.all([
    prisma.lead.findMany({
      where: { campaignId: id },
      orderBy: [{ icpScore: "desc" }, { createdAt: "desc" }],
      take: 500,
    }),
    prisma.lead.count({ where: { campaignId: id } }),
    ...STATUSES.map(s => prisma.lead.count({ where: { campaignId: id, status: s } })),
  ]);

  const byStatus = Object.fromEntries(STATUSES.map((s, i) => [s, statusCounts[i]]));

  return NextResponse.json({ leads, total, byStatus });
}
