import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { buildPrompt } from "@/lib/buildPrompt";
import { canAccessPipeline, getScriptLimit } from "@/lib/planLimits";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  // Protect with CRON_SECRET
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Fetch all active schedules that are due
  const schedules = await prisma.cronSchedule.findMany({
    where: {
      active: true,
      OR: [
        // daily: lastRunAt is null or > 24h ago
        {
          frequency: "daily",
          OR: [{ lastRunAt: null }, { lastRunAt: { lte: oneDayAgo } }],
        },
        // weekly: lastRunAt is null or > 7 days ago
        {
          frequency: "weekly",
          OR: [{ lastRunAt: null }, { lastRunAt: { lte: oneWeekAgo } }],
        },
      ],
    },
    include: {
      workspace: true,
      client: true,
    },
  });

  let processed = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const schedule of schedules) {
    try {
      // Check plan allows cron (pipeline access)
      if (!canAccessPipeline(schedule.workspace.plan)) {
        skipped++;
        continue;
      }

      // Check workspace has enough credits for double cost (2)
      const limit = getScriptLimit(schedule.workspace.plan);
      if (schedule.workspace.scriptCount + 2 > limit) {
        skipped++;
        continue;
      }

      // Build topic from template
      const topic = schedule.topicTemplate
        .replace(/\{\{niche\}\}/g, schedule.client.niche)
        .replace(/\{\{targetAudience\}\}/g, schedule.client.targetAudience);

      // Build prompt
      const { system, userMessage, model, max_tokens } = buildPrompt({
        client: schedule.client,
        platform: schedule.platform,
        topic,
        duration: "3-5 min",
        model: "claude-haiku-4-5-20251001",
      });

      // Generate script (non-streaming)
      const response = await anthropic.messages.create({
        model,
        max_tokens,
        system,
        messages: [{ role: "user", content: userMessage }],
      });

      const content =
        response.content[0].type === "text" ? response.content[0].text : "";

      const wordCount = content.trim().split(/\s+/).length;
      const title = topic.slice(0, 60);

      // Save script
      await prisma.script.create({
        data: {
          workspaceId: schedule.workspaceId,
          clientId: schedule.clientId,
          platform: schedule.platform,
          title,
          topic,
          content,
          duration: "3-5 min",
          wordCount,
        },
      });

      // Increment scriptCount by 2 (double credit cost)
      await prisma.workspace.update({
        where: { id: schedule.workspaceId },
        data: { scriptCount: { increment: 2 } },
      });

      // Update lastRunAt
      await prisma.cronSchedule.update({
        where: { id: schedule.id },
        data: { lastRunAt: now },
      });

      processed++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Cron schedule ${schedule.id} failed:`, message);
      errors.push(`schedule:${schedule.id} — ${message}`);
    }
  }

  return NextResponse.json({ processed, skipped, errors });
}
