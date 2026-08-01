import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  linkedInAccountId: z.string(),
  type: z.enum(["CONNECT_NOTE", "CONNECT", "FIRST_DEGREE"]),
  positioningText: z.string().optional(),
  connectionNoteTemplate: z.string().optional(),
  requireApproval: z.boolean().default(true),
  followUpsEnabled: z.boolean().default(false),
  followUpCount: z.number().int().min(1).max(5).default(1),
  followUpDelayDays: z.number().int().min(1).default(3),
  followUpTemplate: z.string().optional(),
  autoBookEnabled: z.boolean().default(false),
  autoBookCtaLink: z.string().optional(),
  autoBookReplyTemplate: z.string().optional(),
});

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const campaigns = await prisma.campaign.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      linkedInAccount: { select: { name: true, avatarUrl: true } },
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const enriched = await Promise.all(
    campaigns.map(async (c: (typeof campaigns)[number]) => {
      const [contacted, accepted, replied] = await Promise.all([
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
        prisma.lead.count({ where: { campaignId: c.id, status: "REPLIED" } }),
      ]);
      return { ...c, stats: { leads: c._count.leads, contacted, accepted, replied } };
    })
  );

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const account = await prisma.linkedInAccount.findFirst({
    where: { id: parsed.data.linkedInAccountId, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const campaign = await prisma.campaign.create({
    data: { ...parsed.data, workspaceId: user.workspaceId },
  });

  return NextResponse.json(campaign, { status: 201 });
}
