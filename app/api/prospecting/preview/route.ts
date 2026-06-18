import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  campaignId: z.string(),
  query: z.string().min(1),
  location: z.string().optional(),
});

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "who","that","are","is","be","have","has","do","does","will","would",
  "i","we","they","you","my","our","their","your","me","us","them",
  "want","need","like","just","any","all","some","get","can","may",
  "also","very","really","quite","based","looking","anyone","might",
  "someone","people","person","their","those","these","there","from",
]);

function buildSearchQuery(description: string, location?: string): string {
  const words = description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));

  const keywords = [...new Set(words)].slice(0, 5);
  if (location?.trim()) keywords.push(location.trim());
  return keywords.join(" ");
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

  const searchQuery = buildSearchQuery(parsed.data.query, parsed.data.location);

  const results = await unipile.searchPeople(
    campaign.linkedInAccount.unipileAccountId,
    searchQuery,
    15
  );

  return NextResponse.json({ items: results.items ?? [], searchQuery });
}
