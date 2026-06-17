import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  campaignId: z.string(),
  query: z.string().min(1),
});

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

  const results = await unipile.searchPeople(
    campaign.linkedInAccount.unipileAccountId,
    parsed.data.query,
    15
  );

  return NextResponse.json(results.items);
}
