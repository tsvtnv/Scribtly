import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"]).optional(),
  connectionNoteTemplate: z.string().nullish(),
  requireApproval: z.boolean().optional(),
  followUpsEnabled: z.boolean().optional(),
  followUpCount: z.number().int().optional(),
  followUpDelayDays: z.number().int().optional(),
  followUpTemplate: z.string().nullish(),
  autoBookEnabled: z.boolean().optional(),
  autoBookCtaLink: z.string().nullish(),
  autoBookReplyTemplate: z.string().nullish(),
  positioningText: z.string().nullish(),
});

async function getCampaign(id: string, workspaceId: string) {
  return prisma.campaign.findFirst({ where: { id, workspaceId } });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await getCampaign(id, user.workspaceId);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const updated = await prisma.campaign.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await getCampaign(id, user.workspaceId);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
