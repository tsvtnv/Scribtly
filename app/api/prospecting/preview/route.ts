import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const schema = z.object({
  campaignId: z.string(),
  query: z.string().min(1),
});

async function toLinkedInKeywords(description: string): Promise<string> {
  try {
    const res = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 40,
      messages: [{
        role: "user",
        content: `Convert this description into 3-6 LinkedIn search keywords (no quotes, no operators, space-separated only).\nDescription: ${description}\nKeywords:`,
      }],
    });
    const text = res.content[0].type === "text" ? res.content[0].text.trim() : description;
    // Strip any accidental quotes or punctuation
    return text.replace(/["',]/g, "").trim();
  } catch {
    return description;
  }
}

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const campaign = await prisma.campaign.findFirst({
    where: { id: parsed.data.campaignId, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

  const searchQuery = await toLinkedInKeywords(parsed.data.query);

  const results = await unipile.searchPeople(
    campaign.linkedInAccount.unipileAccountId,
    searchQuery,
    15
  );

  return NextResponse.json({ items: results.items, searchQuery });
}
