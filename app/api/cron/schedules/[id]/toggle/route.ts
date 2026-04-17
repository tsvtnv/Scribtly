import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { canAccessPipeline } from "@/lib/planLimits";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { workspace } = await ensureUser();

    if (!canAccessPipeline(workspace.plan)) {
      return NextResponse.json({ error: "Plan upgrade required" }, { status: 403 });
    }

    const schedule = await prisma.cronSchedule.findUnique({
      where: { id: params.id },
    });

    if (!schedule || schedule.workspaceId !== workspace.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.cronSchedule.update({
      where: { id: params.id },
      data: { active: !schedule.active },
    });

    return NextResponse.json({ active: updated.active });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
