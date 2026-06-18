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
  location: z.string().optional(),
});

async function toLinkedInKeywords(description: string): Promise<string> {
  try {
    const res = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 20,
      messages: [{
        role: "user",
        content: `You are finding LinkedIn profiles of BUYERS of services — business owners and managers, NOT freelancers or specialists.\nPick 3 job-role keywords (title/industry only) from this description. Never use words like "automation", "AI", "agent", "developer".\nDescription: ${description}\n3 words:`,
      }],
    });
    const text = res.content[0].type === "text" ? res.content[0].text.trim() : "";
    const words = text.replace(/["',.\-]/g, "").trim().split(/\s+/).slice(0, 4);
    return words.join(" ");
  } catch {
    return description.trim().split(/\s+/).slice(0, 3).join(" ");
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
    15,
    undefined,
    parsed.data.location || undefined
  );

  return NextResponse.json({ items: results.items, searchQuery });
}
