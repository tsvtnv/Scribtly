import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { fillTemplate, parseLocation } from "@/lib/templates";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function verifySecret(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.WORKER_SECRET}`;
}

async function logStart(workspaceId: string, taskType: string) {
  return prisma.automationLog.create({
    data: {
      workspaceId,
      taskType: taskType as never,
      status: "EXECUTING",
    },
  });
}

async function logDone(id: string, status: string, result: string) {
  return prisma.automationLog.update({
    where: { id },
    data: { status: status as never, result, completedAt: new Date() },
  });
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: string[] = [];

  // 1. Reset daily limits
  const allAccounts = await prisma.linkedInAccount.findMany();
  for (const acc of allAccounts) {
    const resetDate = new Date(acc.limitsResetAt);
    const now = new Date();
    if (now.toDateString() !== resetDate.toDateString()) {
      await prisma.linkedInAccount.update({
        where: { id: acc.id },
        data: { connSentToday: 0, msgSentToday: 0, limitsResetAt: now },
      });
    }
  }

  // 2. Enrich leads (NEW → ENRICHED)
  const newLeads = await prisma.lead.findMany({
    where: { status: "NEW" },
    include: { campaign: { include: { linkedInAccount: true } } },
    take: 10,
  });

  for (const lead of newLeads) {
    const log = await logStart(lead.workspaceId, "ENRICH_LEAD");
    try {
      const profile = await unipile.getProfile(
        lead.campaign.linkedInAccount.unipileAccountId,
        lead.linkedInProfileId
      );
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          headline: profile.headline ?? lead.headline,
          company: profile.company_name ?? lead.company,
          location: profile.location ?? lead.location,
          avatarUrl: profile.profile_picture_url ?? lead.avatarUrl,
          status: "ENRICHED",
          enrichedAt: new Date(),
        },
      });
      await logDone(log.id, "COMPLETED", `Enriched ${lead.name}`);
      results.push(`enriched:${lead.id}`);
    } catch (err) {
      await logDone(log.id, "FAILED", String(err));
    }
  }

  // 3. Score leads (ENRICHED → QUEUED)
  const enrichedLeads = await prisma.lead.findMany({
    where: { status: "ENRICHED" },
    include: { campaign: { select: { positioningText: true } } },
    take: 10,
  });

  for (const lead of enrichedLeads) {
    const log = await logStart(lead.workspaceId, "SCORE_LEAD");
    try {
      const positioning = lead.campaign.positioningText ?? "A UK web design agency";
      const prompt = `Score this LinkedIn lead for ICP fit (0-100).
Business: ${positioning}
Lead: ${lead.name}, ${lead.headline ?? "unknown role"}, ${lead.company ?? "unknown company"}, ${lead.location ?? "unknown location"}
Reply with ONLY: {"score": <0-100>, "reason": "<one sentence>"}`;

      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "{}";
      const match = text.match(/\{[^}]+\}/);
      const parsed = match ? JSON.parse(match[0]) : {};
      const score = typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 50;

      const workspace = await prisma.workspace.findUnique({ where: { id: lead.workspaceId } });
      const skip = workspace?.skipLowIcpLeads && score < 40;

      await prisma.lead.update({
        where: { id: lead.id },
        data: { icpScore: score, status: skip ? "SKIPPED" : "QUEUED" },
      });
      await logDone(log.id, "COMPLETED", `Score: ${score}${skip ? " (skipped)" : ""}`);
      results.push(`scored:${lead.id}:${score}`);
    } catch (err) {
      await prisma.lead.update({ where: { id: lead.id }, data: { status: "QUEUED", icpScore: 50 } });
      await logDone(log.id, "FAILED", String(err));
    }
  }

  // 4. Send messages
  const activeCampaigns = await prisma.campaign.findMany({
    where: { status: "ACTIVE" },
    include: { linkedInAccount: true },
  });

  for (const campaign of activeCampaigns) {
    const acc = campaign.linkedInAccount;
    const remaining = acc.dailyConnLimit - acc.connSentToday;
    if (remaining <= 0) continue;

    const queuedLeads = await prisma.lead.findMany({
      where: { campaignId: campaign.id, status: "QUEUED" },
      orderBy: { icpScore: "desc" },
      take: Math.min(remaining, 5),
    });

    for (const lead of queuedLeads) {
      if (!campaign.connectionNoteTemplate) continue;
      const log = await logStart(lead.workspaceId, "SEND_MESSAGE");
      try {
        const loc = parseLocation(lead.location);
        const content = fillTemplate(campaign.connectionNoteTemplate, {
          name: lead.name.split(" ")[0],
          company: lead.company,
          headline: lead.headline,
          city: loc.city,
          country: loc.country,
        });

        if (campaign.requireApproval) {
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "PENDING_APPROVAL",
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "PENDING_APPROVAL" } });
          await logDone(log.id, "COMPLETED", `Queued for approval: ${lead.name}`);
        } else {
          await unipile.sendConnectionRequest(
            acc.unipileAccountId,
            lead.linkedInProfileId,
            campaign.type === "CONNECT_NOTE" ? content : undefined
          );
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "SENT", sentAt: new Date(),
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "CONTACTED", contactedAt: new Date() } });
          await prisma.linkedInAccount.update({ where: { id: acc.id }, data: { connSentToday: { increment: 1 } } });
          await prisma.event.create({
            data: { workspaceId: lead.workspaceId, campaignId: campaign.id, leadId: lead.id, type: "message_sent" },
          });
          await logDone(log.id, "COMPLETED", `Sent to ${lead.name}`);
          results.push(`sent:${lead.id}`);
        }
      } catch (err) {
        await logDone(log.id, "FAILED", String(err));
      }
    }
  }

  // 5. Follow-up check
  for (const campaign of activeCampaigns.filter(c => c.followUpsEnabled && c.followUpTemplate)) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - campaign.followUpDelayDays);

    const acceptedLeads = await prisma.lead.findMany({
      where: {
        campaignId: campaign.id,
        status: "ACCEPTED",
        acceptedAt: { lte: cutoff },
        messages: { none: { type: "FOLLOWUP" } },
      },
      take: 5,
    });

    for (const lead of acceptedLeads) {
      const loc = parseLocation(lead.location);
      const content = fillTemplate(campaign.followUpTemplate!, {
        name: lead.name.split(" ")[0],
        company: lead.company,
        headline: lead.headline,
        city: loc.city,
        country: loc.country,
      });
      await prisma.message.create({
        data: {
          leadId: lead.id, campaignId: campaign.id,
          type: "FOLLOWUP", content, status: "PENDING_APPROVAL",
        },
      });
    }
  }

  // 6. Sync inbox (lightweight — just sync thread metadata)
  const activeAccs = await prisma.linkedInAccount.findMany({ where: { status: "ACTIVE" } });
  for (const acc of activeAccs) {
    const log = await logStart(acc.workspaceId, "SYNC_INBOX");
    try {
      const inbox = await unipile.getInbox(acc.unipileAccountId);
      let synced = 0;
      for (const thread of inbox.items) {
        await prisma.conversation.updateMany({
          where: { unipileThreadId: thread.id },
          data: {
            lastMessageAt: new Date(thread.last_message_at),
            lastMessagePreview: thread.last_message_text?.slice(0, 100),
            hasUnread: thread.unread,
          },
        });
        synced++;
      }
      await logDone(log.id, "COMPLETED", `Synced ${synced} threads`);
    } catch (err) {
      await logDone(log.id, "FAILED", String(err));
    }
  }

  return NextResponse.json({ ok: true, results });
}
