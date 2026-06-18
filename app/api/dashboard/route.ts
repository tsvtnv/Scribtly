import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wid = user.workspaceId;

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [totalLeads, totalSent, totalReplied, campaigns, recentEvents, sentMessages, replyEvents] =
    await Promise.all([
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
      prisma.message.findMany({
        where: {
          campaign: { workspaceId: wid },
          status: "SENT",
          sentAt: { gte: fourteenDaysAgo },
        },
        select: { sentAt: true },
      }),
      prisma.event.findMany({
        where: {
          workspaceId: wid,
          type: "REPLY_RECEIVED",
          createdAt: { gte: fourteenDaysAgo },
        },
        select: { createdAt: true },
      }),
    ]);

  const responseRate = totalSent > 0 ? ((totalReplied / totalSent) * 100).toFixed(1) : "0";

  const campaignStats = await Promise.all(
    campaigns.map(async c => {
      const [contacted, accepted, replied] = await Promise.all([
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: "REPLIED" } }),
      ]);
      return { id: c.id, name: c.name, status: c.status, leads: c._count.leads, contacted, accepted, replied };
    })
  );

  const dailyActivity: Array<{ date: string; sent: number; replied: number }> = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const sent = sentMessages.filter(
      m => m.sentAt != null && m.sentAt.toISOString().split("T")[0] === dateStr
    ).length;
    const replied = replyEvents.filter(
      e => e.createdAt.toISOString().split("T")[0] === dateStr
    ).length;
    dailyActivity.push({ date: dateStr, sent, replied });
  }

  return NextResponse.json({
    totalLeads,
    totalSent,
    totalReplied,
    responseRate,
    campaigns: campaignStats,
    recentEvents,
    dailyActivity,
  });
}
