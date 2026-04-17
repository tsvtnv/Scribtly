import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { canAccessPipeline } from "@/lib/planLimits";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;

const createSchema = z.object({
  clientId: z.string().min(1),
  platform: z.enum(PLATFORMS),
  topicTemplate: z.string().min(1).max(500),
  frequency: z.enum(["daily", "weekly"]),
});

export async function GET() {
  try {
    const { workspace } = await ensureUser();

    if (!canAccessPipeline(workspace.plan)) {
      return NextResponse.json({ error: "Plan upgrade required" }, { status: 403 });
    }

    const schedules = await prisma.cronSchedule.findMany({
      where: { workspaceId: workspace.id },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ schedules });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();

    if (!canAccessPipeline(workspace.plan)) {
      return NextResponse.json({ error: "Plan upgrade required" }, { status: 403 });
    }

    const raw = await req.json();
    const parsed = createSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
    }

    const { clientId, platform, topicTemplate, frequency } = parsed.data;

    // Verify client belongs to workspace
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client || client.workspaceId !== workspace.id) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const schedule = await prisma.cronSchedule.create({
      data: {
        workspaceId: workspace.id,
        clientId,
        platform,
        topicTemplate,
        frequency,
      },
      include: { client: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ schedule }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
