import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { ensureUser } from "@/lib/ensureUser";
import { canUseExtras } from "@/lib/planLimits";
import { buildPrompt, getExtrasPrompt } from "@/lib/buildPrompt";
import { getClaudeModelId, DEFAULT_CLAUDE_MODEL } from "@/lib/modelAccess";
import {
  NotFoundError,
  ValidationError,
  UpgradeRequiredError,
  errorResponse,
} from "@/lib/errors";

export const runtime = "nodejs";

const bodySchema = z.object({
  scriptId: z.string().min(1),
  extraType: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    if (!canUseExtras(workspace)) {
      throw new UpgradeRequiredError("extras_locked", "Extras are a Pro feature");
    }

    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) throw new ValidationError("Invalid request", { issues: parsed.error.issues });

    const script = await prisma.script.findUnique({
      where: { id: parsed.data.scriptId },
      include: { client: true },
    });
    if (!script || script.workspaceId !== workspace.id) throw new NotFoundError("Script not found");
    if (!script.client) throw new NotFoundError("Script has no client");

    const extraPrompt = getExtrasPrompt(parsed.data.extraType);
    if (!extraPrompt) throw new ValidationError("Unknown extra type");

    const base = buildPrompt({
      client: script.client,
      platform: script.platform,
      topic: script.topic,
      duration: script.duration,
      model: getClaudeModelId(DEFAULT_CLAUDE_MODEL),
    });

    const userMessage = `${extraPrompt}\n\nUse this script as context:\n\n${script.content}`;

    const msg = await anthropic.messages.create({
      model: base.model,
      max_tokens: 800,
      system: base.system,
      messages: [{ role: "user", content: userMessage }],
    });

    const text =
      msg.content
        .filter((b) => b.type === "text")
        .map((b: any) => b.text)
        .join("\n") || "";

    const currentExtras = (script.extras as Record<string, unknown> | null) || {};
    const updated = await prisma.script.update({
      where: { id: script.id },
      data: { extras: { ...currentExtras, [parsed.data.extraType]: text } as Prisma.InputJsonValue },
    });

    return NextResponse.json({ text, extras: updated.extras });
  } catch (err) {
    return errorResponse(err);
  }
}
