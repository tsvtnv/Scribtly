import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { ValidationError, NotFoundError, errorResponse } from "@/lib/errors";
import { wordCount } from "@/lib/utils";

export const runtime = "nodejs";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;
const STATUSES = ["DRAFT", "FINAL", "SENT"] as const;

const createSchema = z.object({
  clientId: z.string().min(1),
  title: z.string().trim().min(1).max(200),
  topic: z.string().trim().min(1).max(600),
  platform: z.enum(PLATFORMS),
  duration: z.string().min(1).max(40),
  hookStyle: z.string().optional().nullable(),
  content: z.string().min(1),
  extras: z.any().optional(),
  wordCount: z.number().int().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    const platform = url.searchParams.get("platform");
    const status = url.searchParams.get("status");
    const q = url.searchParams.get("q");
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));

    const where: Prisma.ScriptWhereInput = { workspaceId: workspace.id };
    if (clientId) where.clientId = clientId;
    if (platform && (PLATFORMS as readonly string[]).includes(platform)) {
      where.platform = platform as (typeof PLATFORMS)[number];
    }
    if (status && (STATUSES as readonly string[]).includes(status)) {
      where.status = status as (typeof STATUSES)[number];
    }
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { topic: { contains: q, mode: "insensitive" } },
      ];
    }

    const [total, scripts] = await Promise.all([
      prisma.script.count({ where }),
      prisma.script.findMany({
        where,
        include: { client: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({ scripts, total, page, limit, hasMore: page * limit < total });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid script", { issues: parsed.error.issues });

    const data = parsed.data;
    const client = await prisma.client.findUnique({ where: { id: data.clientId } });
    if (!client || client.workspaceId !== workspace.id) throw new NotFoundError("Client not found");

    const script = await prisma.script.create({
      data: {
        workspaceId: workspace.id,
        clientId: data.clientId,
        title: data.title,
        topic: data.topic,
        platform: data.platform,
        duration: data.duration,
        hookStyle: data.hookStyle || null,
        content: data.content,
        extras: data.extras ?? undefined,
        wordCount: data.wordCount ?? wordCount(data.content),
      },
    });
    return NextResponse.json({ script }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
