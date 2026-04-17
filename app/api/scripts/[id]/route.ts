import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { NotFoundError, ValidationError, errorResponse } from "@/lib/errors";
import { wordCount } from "@/lib/utils";

export const runtime = "nodejs";

const patchSchema = z.object({
  content: z.string().optional(),
  title: z.string().trim().min(1).max(200).optional(),
  status: z.enum(["DRAFT", "FINAL", "SENT"]).optional(),
  extras: z.any().optional(),
});

async function loadScript(id: string, workspaceId: string) {
  const s = await prisma.script.findUnique({ where: { id }, include: { client: true } });
  if (!s || s.workspaceId !== workspaceId) throw new NotFoundError("Script not found");
  return s;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    const script = await loadScript(params.id, workspace.id);
    return NextResponse.json({ script });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    const existing = await loadScript(params.id, workspace.id);
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid update", { issues: parsed.error.issues });

    const data: any = { ...parsed.data };
    if (parsed.data.content !== undefined) {
      data.wordCount = wordCount(parsed.data.content);
    }
    if (parsed.data.extras !== undefined) {
      // Merge with existing extras so partial updates work
      const current = (existing.extras as Record<string, unknown> | null) || {};
      data.extras = { ...current, ...(parsed.data.extras as Record<string, unknown>) };
    }

    const script = await prisma.script.update({ where: { id: params.id }, data });
    return NextResponse.json({ script });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    await loadScript(params.id, workspace.id);
    await prisma.script.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
