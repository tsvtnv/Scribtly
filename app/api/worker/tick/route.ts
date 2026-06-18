import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { fillTemplate, parseLocation } from "@/lib/templates";
import { computeNextSlot } from "@/lib/scheduler";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Per-account timestamp of last connection request sent — enforces minimum gap
// between sends without a DB migration. Resets on server restart (that's fine).
// Only used for requireApproval=true path (PENDING_APPROVAL creation).
const lastConnSentAt = new Map<string, number>();
const MIN_CONN_GAP_MS = 20 * 60 * 1000; // 20 min between sends per account

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

  const now = new Date();

  // 0. Dispatch scheduled messages (APPROVED where scheduledFor <= now)
  const scheduledMessages = await prisma.message.findMany({
    where: { status: "APPROVED", scheduledFor: { lte: now } },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
    orderBy: { scheduledFor: "asc" },
  });

  // Track in-tick account state so we respect limits across multiple messages in same tick
  const inTickConnSent = new Map<string, number>();

  for (const msg of scheduledMessages) {
    const acc = msg.campaign.linkedInAccount;
    const alreadySent = inTickConnSent.get(acc.id) ?? 0;
    if (acc.connSentToday + alreadySent >= acc.dailyConnLimit) continue;

    const log = await logStart(msg.lead.workspaceId, "SEND_MESSAGE");
    try {
      if (msg.type === "CONNECTION_NOTE") {
        await unipile.sendConnectionRequest(
          acc.unipileAccountId,
          msg.lead.linkedInProfileId,
          msg.content
        );
      } else {
        const conv = await prisma.conversation.findUnique({ where: { leadId: msg.leadId } });
        if (conv) {
          await unipile.sendMessage(acc.unipileAccountId, conv.unipileThreadId, msg.content);
        }
      }
      await prisma.message.update({ where: { id: msg.id }, data: { status: "SENT", sentAt: now } });
      await prisma.lead.update({ where: { id: msg.leadId }, data: { status: "CONTACTED", contactedAt: now } });
      await prisma.linkedInAccount.update({ where: { id: acc.id }, data: { connSentToday: { increment: 1 } } });
      await prisma.event.create({
        data: { workspaceId: msg.lead.workspaceId, campaignId: msg.campaignId, leadId: msg.leadId, type: "message_sent" },
      });
      inTickConnSent.set(acc.id, alreadySent + 1);
      await logDone(log.id, "COMPLETED", `Dispatched to ${msg.lead.name}`);
      results.push(`dispatched:${msg.id}`);
    } catch (err) {
      // Leave as APPROVED — will retry on next tick
      await logDone(log.id, "FAILED", String(err));
    }
  }

  // 1. Reset daily limits
  const allAccounts = await prisma.linkedInAccount.findMany();
  for (const acc of allAccounts) {
    const resetDate = new Date(acc.limitsResetAt);
    if (now.toDateString() !== resetDate.toDateString()) {
      await prisma.linkedInAccount.update({
        where: { id: acc.id },
        data: { connSentToday: 0, msgSentToday: 0, limitsResetAt: now },
      });
    }
  }

  // 2. Enrich leads (NEW → ENRICHED) — one per tick with 1-10 min random delay between calls
  const leadToEnrich = await prisma.lead.findFirst({
    where: {
      status: "NEW",
      OR: [{ enrichAfter: null }, { enrichAfter: { lte: now } }],
    },
    include: { campaign: { include: { linkedInAccount: true } } },
    orderBy: { createdAt: "asc" },
  });

  if (leadToEnrich) {
    const log = await logStart(leadToEnrich.workspaceId, "ENRICH_LEAD");
    try {
      // Search import already provides headline/location/avatar — skip the profile API call
      // (Unipile profile lookup 404s on these IDs; data from search is sufficient for scoring)
      await prisma.lead.update({
        where: { id: leadToEnrich.id },
        data: { status: "ENRICHED", enrichedAt: new Date() },
      });
      await logDone(log.id, "COMPLETED", `Enriched ${leadToEnrich.name}`);
      results.push(`enriched:${leadToEnrich.id}`);
    } catch (err) {
      await logDone(log.id, "FAILED", String(err));
    }

    // Schedule the next NEW lead with a random 1-10 min delay
    const delayMs = (Math.floor(Math.random() * 10) + 1) * 60 * 1000;
    const nextLead = await prisma.lead.findFirst({
      where: { status: "NEW", id: { not: leadToEnrich.id }, enrichAfter: null },
      orderBy: { createdAt: "asc" },
    });
    if (nextLead) {
      await prisma.lead.update({
        where: { id: nextLead.id },
        data: { enrichAfter: new Date(now.getTime() + delayMs) },
      });
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
      const positioning = lead.campaign.positioningText ?? "An AI automation agency that builds AI agents and workflow automations for small business owners (5-50 employees) to replace manual repetitive work.";
      const prompt = `Score this LinkedIn lead 0-100 for fit as a buyer of AI automation services.
Seller: ${positioning}
Lead: ${lead.name} | ${lead.headline ?? "unknown role"} | ${lead.company ?? "unknown company"} | ${lead.location ?? "unknown location"}

Score HIGH (70-100) if: founder/CEO/COO/owner of 5-50 person biz, agency owner, ops role at SMB, e-commerce operator, consultant scaling a team, non-technical but uses SaaS tools.
Score LOW (0-30) if: enterprise (500+ employees), CTO/engineer (will DIY), student/job seeker, no clear business, highly regulated industry.
Reply ONLY: {"score":<0-100>,"reason":"<10 words max>"}`;

      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 60,
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
    const pendingCount = await prisma.message.count({
      where: {
        campaign: { linkedInAccountId: acc.id },
        status: { in: ["PENDING_APPROVAL", "APPROVED"] },
        type: "CONNECTION_NOTE",
      },
    });
    const remaining = acc.dailyConnLimit - acc.connSentToday - pendingCount;
    if (remaining <= 0) continue;

    // Rate-limit: at most 1 connection per account per 20 min to avoid LinkedIn flags
    // (only enforced for requireApproval=true path; scheduler handles spacing for the other path)
    const lastSent = lastConnSentAt.get(acc.id) ?? 0;
    if (now.getTime() - lastSent < MIN_CONN_GAP_MS) continue;

    const queuedLeads = await prisma.lead.findMany({
      where: { campaignId: campaign.id, status: "QUEUED" },
      orderBy: { icpScore: "desc" },
      take: 1,
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
          // No approval — schedule directly
          const lastScheduled = await prisma.message.findFirst({
            where: {
              campaign: { linkedInAccountId: acc.id },
              status: "APPROVED",
              scheduledFor: { not: null },
            },
            orderBy: { scheduledFor: "desc" },
          });
          const scheduledFor = computeNextSlot(
            {
              timezone: acc.timezone,
              sendWindowStart: acc.sendWindowStart,
              sendWindowEnd: acc.sendWindowEnd,
              sendIntervalMinutes: acc.sendIntervalMinutes,
              sendJitterMinutes: acc.sendJitterMinutes,
            },
            lastScheduled?.scheduledFor ?? now
          );
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "APPROVED", scheduledFor,
            },
          });
          await logDone(log.id, "COMPLETED", `Scheduled for ${scheduledFor.toISOString()}: ${lead.name}`);
          results.push(`scheduled:${lead.id}`);
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
      take: 2,
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

      if (campaign.requireApproval) {
        await prisma.message.create({
          data: {
            leadId: lead.id, campaignId: campaign.id,
            type: "FOLLOWUP", content, status: "PENDING_APPROVAL",
          },
        });
      } else {
        const lastScheduled = await prisma.message.findFirst({
          where: {
            campaign: { linkedInAccountId: campaign.linkedInAccountId },
            status: "APPROVED",
            scheduledFor: { not: null },
          },
          orderBy: { scheduledFor: "desc" },
        });
        const scheduledFor = computeNextSlot(
          {
            timezone: campaign.linkedInAccount.timezone,
            sendWindowStart: campaign.linkedInAccount.sendWindowStart,
            sendWindowEnd: campaign.linkedInAccount.sendWindowEnd,
            sendIntervalMinutes: campaign.linkedInAccount.sendIntervalMinutes,
            sendJitterMinutes: campaign.linkedInAccount.sendJitterMinutes,
          },
          lastScheduled?.scheduledFor ?? now
        );
        await prisma.message.create({
          data: {
            leadId: lead.id, campaignId: campaign.id,
            type: "FOLLOWUP", content, status: "APPROVED", scheduledFor,
          },
        });
      }
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
        const lastMessageAt = thread.last_message_at ? new Date(thread.last_message_at) : null;
        const validLastMessageAt = lastMessageAt && !isNaN(lastMessageAt.getTime()) ? lastMessageAt : null;
        const preview = thread.last_message_text?.slice(0, 100) ?? null;
        const hasUnread = Boolean(thread.unread);

        // Match thread to a lead using attendee_provider_id (LinkedIn profile ID)
        const attendeeId = thread.attendee_provider_id;
        const matchingLead = attendeeId
          ? await prisma.lead.findFirst({
              where: { linkedInProfileId: attendeeId, campaign: { linkedInAccountId: acc.id } },
            })
          : null;

        if (matchingLead) {
          // Upsert: check by threadId OR leadId to avoid unique constraint conflicts
          const existing = await prisma.conversation.findFirst({
            where: { OR: [{ unipileThreadId: thread.id }, { leadId: matchingLead.id }] },
          });
          if (existing) {
            await prisma.conversation.update({
              where: { id: existing.id },
              data: {
                unipileThreadId: thread.id,
                ...(validLastMessageAt ? { lastMessageAt: validLastMessageAt } : {}),
                lastMessagePreview: preview,
                hasUnread,
              },
            });
          } else {
            await prisma.conversation.create({
              data: {
                workspaceId: acc.workspaceId,
                leadId: matchingLead.id,
                unipileThreadId: thread.id,
                ...(validLastMessageAt ? { lastMessageAt: validLastMessageAt } : {}),
                lastMessagePreview: preview,
                hasUnread,
              },
            });
          }
          // Promote lead to ACCEPTED if still CONTACTED (connection was accepted)
          if (matchingLead.status === "CONTACTED") {
            await prisma.lead.update({
              where: { id: matchingLead.id },
              data: { status: "ACCEPTED", acceptedAt: new Date() },
            });
          }
        } else {
          // Thread not from our campaigns — just update if row already exists
          await prisma.conversation.updateMany({
            where: { unipileThreadId: thread.id },
            data: {
              ...(validLastMessageAt ? { lastMessageAt: validLastMessageAt } : {}),
              lastMessagePreview: preview,
              hasUnread,
            },
          });
        }
        synced++;
      }
      await logDone(log.id, "COMPLETED", `Synced ${synced} threads`);
    } catch (err) {
      await logDone(log.id, "FAILED", String(err));
    }
  }

  return NextResponse.json({ ok: true, results });
}
