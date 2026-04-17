import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { NotFoundError, ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;

const patchSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  niche: z.string().trim().min(1).max(200).optional(),
  targetAudience: z.string().trim().min(1).max(600).optional(),
  toneOfVoice: z.string().trim().min(1).max(600).optional(),
  examplePhrases: z.string().trim().max(1000).nullable().optional(),
  avoidTopics: z.string().trim().max(1000).nullable().optional(),
  primaryPlatform: z.enum(PLATFORMS).optional(),
  avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

async function loadClient(id: string, workspaceId: string) {
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client || client.workspaceId !== workspaceId) throw new NotFoundError("Client not found");
  return client;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    const client = await loadClient(params.id, workspace.id);
    return NextResponse.json({ client });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    await loadClient(params.id, workspace.id);
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid update", { issues: parsed.error.issues });
    const client = await prisma.client.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ client });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    await loadClient(params.id, workspace.id);
    await prisma.$transaction([
      prisma.script.updateMany({ where: { clientId: params.id }, data: { clientId: null } }),
      prisma.client.delete({ where: { id: params.id } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
