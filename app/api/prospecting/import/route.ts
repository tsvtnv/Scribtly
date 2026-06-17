import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  headline: z.string().optional(),
  location: z.string().optional(),
  profile_picture_url: z.string().optional(),
  company_name: z.string().optional(),
  profile_url: z.string(),
});

const schema = z.object({
  campaignId: z.string(),
  profiles: z.array(profileSchema).min(1).max(500),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { campaignId, profiles } = parsed.data;

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, workspaceId: user.workspaceId },
  });
  if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

  const workspace = await prisma.workspace.findUnique({ where: { id: user.workspaceId } });

  let imported = 0;
  for (const p of profiles) {
    if (!workspace?.allowDuplicateLeads) {
      const exists = await prisma.lead.findFirst({
        where: { workspaceId: user.workspaceId, linkedInProfileId: p.id, campaign: { status: { not: "COMPLETED" } } },
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
          name: `${p.first_name} ${p.last_name}`.trim(),
          headline: p.headline,
          company: p.company_name,
          location: p.location,
          avatarUrl: p.profile_picture_url,
          profileUrl: p.profile_url,
        },
        update: {},
      });
      imported++;
    } catch {
      // skip duplicates
    }
  }

  return NextResponse.json({ imported });
}
