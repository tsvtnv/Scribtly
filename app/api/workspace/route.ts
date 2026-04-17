import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export async function GET() {
  try {
    const { workspace, role } = await ensureUser();
    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      include: { user: true },
      orderBy: { joinedAt: "asc" },
    });
    const invites = role === "OWNER"
      ? await prisma.invite.findMany({
          where: { workspaceId: workspace.id, acceptedAt: null, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        })
      : [];
    return NextResponse.json({ workspace, members, invites });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { workspace, role } = await ensureUser();
    requireOwner(role);
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid workspace data");
    const updated = await prisma.workspace.update({
      where: { id: workspace.id },
      data: { name: parsed.data.name },
    });
    return NextResponse.json({ workspace: updated });
  } catch (err) {
    return errorResponse(err);
  }
}
