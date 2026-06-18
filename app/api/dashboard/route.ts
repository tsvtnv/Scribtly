import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wid = user.workspaceId;

  const [totalLeads, totalSent, totalReplied, campaigns, recentEvents] = await Promise.all([
    prisma.lead.count({ where: { workspaceId: wid } }),
    prisma.message.count({ where: { campaign: { workspaceId: wid }, status: "SENT" } }),
    prisma.lead.count({ where: { workspaceId: wid, status: "REPLIED" } }),
    prisma.campaign.findMany({
      where: { workspaceId: wid },
      include: { _count: { select: { leads: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.event.findMany({
      where: { workspaceId: wid },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const responseRate = totalSent > 0 ? ((totalReplied / totalSent) * 100).toFixed(1) : "0";

  const campaignStats = await Promise.all(
    campaigns.map(async (c: (typeof campaigns)[number]) => {
      const [contacted, accepted, replied] = await Promise.all([
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: "REPLIED" } }),
      ]);
      return { id: c.id, name: c.name, status: c.status, leads: c._count.leads, contacted, accepted, replied };
    })
  );

  return NextResponse.json({
    totalLeads, totalSent, totalReplied, responseRate,
    campaigns: campaignStats, recentEvents,
  });
}
