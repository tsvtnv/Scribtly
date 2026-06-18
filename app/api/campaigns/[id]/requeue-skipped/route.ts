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

  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Leads skipped during enrichment (no icpScore) go back to ENRICHED to be scored properly.
  // Leads skipped by the ICP scorer (have a score) go back to QUEUED directly.
  const [enrichResult, queueResult] = await Promise.all([
    prisma.lead.updateMany({
      where: { campaignId: id, status: "SKIPPED", icpScore: null },
      data: { status: "ENRICHED" },
    }),
    prisma.lead.updateMany({
      where: { campaignId: id, status: "SKIPPED", icpScore: { not: null } },
      data: { status: "QUEUED" },
    }),
  ]);

  return NextResponse.json({ count: enrichResult.count + queueResult.count });
}
