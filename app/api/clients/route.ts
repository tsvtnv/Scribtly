import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { canAddClient } from "@/lib/planLimits";
import { UpgradeRequiredError, ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;

const clientSchema = z.object({
  name: z.string().trim().min(1).max(120),
  niche: z.string().trim().min(1).max(200),
  targetAudience: z.string().trim().min(1).max(600),
  toneOfVoice: z.string().trim().min(1).max(600),
  examplePhrases: z.string().trim().max(1000).optional().or(z.literal("")),
  avoidTopics: z.string().trim().max(1000).optional().or(z.literal("")),
  primaryPlatform: z.enum(PLATFORMS).default("YOUTUBE"),
  avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#7F77DD"),
  contentGoal: z.string().trim().max(200).optional().or(z.literal("")),
  videoPace: z.string().trim().max(50).optional().or(z.literal("")),
  languageStyle: z.string().trim().max(50).optional().or(z.literal("")),
  ctaStyle: z.string().trim().max(50).optional().or(z.literal("")),
  brandKeywords: z.string().trim().max(500).optional().or(z.literal("")),
  competitorNames: z.string().trim().max(500).optional().or(z.literal("")),
  postingFrequency: z.string().trim().max(100).optional().or(z.literal("")),
  contentPillars: z.string().trim().max(600).optional().or(z.literal("")),
});

export async function GET() {
  try {
    const { workspace } = await ensureUser();
    const clients = await prisma.client.findMany({
      where: { workspaceId: workspace.id },
      include: { _count: { select: { scripts: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ clients });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const body = await req.json();
    const parsed = clientSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid client data", { issues: parsed.error.issues });

    const count = await prisma.client.count({ where: { workspaceId: workspace.id } });
    if (!canAddClient(workspace, count)) {
      throw new UpgradeRequiredError("client_limit_reached", "You've reached your client limit");
    }

    const data = parsed.data;
    const client = await prisma.client.create({
      data: {
        workspaceId: workspace.id,
        name: data.name,
        niche: data.niche,
        targetAudience: data.targetAudience,
        toneOfVoice: data.toneOfVoice,
        examplePhrases: data.examplePhrases || null,
        avoidTopics: data.avoidTopics || null,
        primaryPlatform: data.primaryPlatform,
        avatarColor: data.avatarColor,
        contentGoal: data.contentGoal || null,
        videoPace: data.videoPace || null,
        languageStyle: data.languageStyle || null,
        ctaStyle: data.ctaStyle || null,
        brandKeywords: data.brandKeywords || null,
        competitorNames: data.competitorNames || null,
        postingFrequency: data.postingFrequency || null,
        contentPillars: data.contentPillars || null,
      },
    });
    return NextResponse.json({ client }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
