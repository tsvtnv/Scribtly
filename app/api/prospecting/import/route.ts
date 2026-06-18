import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile, type UnipilePerson } from "@/lib/unipile";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function toLinkedInKeywords(description: string): Promise<string> {
  try {
    const res = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 20,
      messages: [{
        role: "user",
        content: `Pick the 3 best LinkedIn search keywords from this description. Reply with ONLY those 3 words, nothing else.\nDescription: ${description}\n3 words:`,
      }],
    });
    const text = res.content[0].type === "text" ? res.content[0].text.trim() : "";
    const words = text.replace(/["',.\-]/g, "").trim().split(/\s+/).slice(0, 4);
    return words.join(" ");
  } catch {
    return description.trim().split(/\s+/).slice(0, 3).join(" ");
  }
}

const PER_PAGE = 25;

const schema = z.object({
  campaignId: z.string(),
  query: z.string().min(1),
  count: z.number().min(1).max(500),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { campaignId, query, count } = parsed.data;

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

  const workspace = await prisma.workspace.findUnique({ where: { id: user.workspaceId } });

  // Convert natural language description to LinkedIn search keywords
  const searchQuery = await toLinkedInKeywords(query);

  // Paginate through Unipile search until we have `count` profiles
  const collected: UnipilePerson[] = [];
  let cursor: string | undefined;

  while (collected.length < count) {
    const needed = count - collected.length;
    const pageSize = Math.min(PER_PAGE, needed);

    const result = await unipile.searchPeople(
      campaign.linkedInAccount.unipileAccountId,
      searchQuery,
      pageSize,
      cursor
    );

    if (!result.items?.length) break;

    collected.push(...result.items);
    cursor = result.cursor;

    if (!cursor) break;

    // Brief pause between pages to avoid hammering the API
    if (collected.length < count) {
      await new Promise(r => setTimeout(r, 350));
    }
  }

  // Save to DB
  let imported = 0;
  for (const p of collected.slice(0, count)) {
    if (!workspace?.allowDuplicateLeads) {
      const exists = await prisma.lead.findFirst({
        where: {
          workspaceId: user.workspaceId,
          linkedInProfileId: p.id,
          campaign: { status: { not: "COMPLETED" } },
        },
      });
      if (exists) continue;
    }

    try {
      await prisma.lead.upsert({
        where: { campaignId_linkedInProfileId: { campaignId, linkedInProfileId: p.id } },
        create: {
          workspaceId: user.workspaceId,
          campaignId,
          linkedInProfileId: p.id,
          name: p.name,
          headline: p.headline ?? null,
          company: p.company_name ?? null,
          location: p.location ?? null,
          avatarUrl: p.profile_picture_url ?? null,
          profileUrl: p.profile_url,
        },
        update: {},
      });
      imported++;
    } catch {
      // skip duplicates
    }
  }

  return NextResponse.json({ imported, fetched: collected.length });
}
