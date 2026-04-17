import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { ensureUser } from "@/lib/ensureUser";
import {
  hasReachedScriptLimit,
  canUsePlatform,
  canUseExtras,
  getRemainingScripts,
} from "@/lib/planLimits";
import {
  canUseClaudeModel,
  getClaudeModelId,
  normalizeClaudeModelKey,
} from "@/lib/modelAccess";
import {
  UpgradeRequiredError,
  NotFoundError,
  ValidationError,
  errorResponse,
} from "@/lib/errors";
import { buildPrompt } from "@/lib/buildPrompt";
import { sendFirstScriptEmail } from "@/lib/emails/onboarding";
import { sendFreeLimitReached } from "@/lib/sendEmail";

export const runtime = "nodejs";
export const maxDuration = 60;

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;

const bodySchema = z.object({
  clientId: z.string().min(1),
  platform: z.enum(PLATFORMS),
  topic: z.string().trim().min(1).max(600),
  duration: z.string().min(1).max(40),
  hookStyle: z.string().nullable().optional(),
  extraOutputs: z.array(z.string()).optional(),
  model: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let workspaceId: string | null = null;
  try {
    const { workspace, user } = await ensureUser();
    workspaceId = workspace.id;

    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) throw new ValidationError("Invalid request", { issues: parsed.error.issues });
    const input = parsed.data;

    if (hasReachedScriptLimit(workspace)) {
      throw new UpgradeRequiredError("script_limit_reached", "You've used all your scripts this month");
    }
    if (!canUsePlatform(workspace, input.platform)) {
      throw new UpgradeRequiredError("platform_locked", `${input.platform} is not available on your plan`);
    }
    if (input.extraOutputs && input.extraOutputs.length > 0 && !canUseExtras(workspace)) {
      // Silently strip extras rather than erroring
      input.extraOutputs = undefined;
    }
    const modelKey = normalizeClaudeModelKey(input.model);
    if (!modelKey) throw new ValidationError("Unknown Claude model");
    if (!canUseClaudeModel(workspace.plan, modelKey)) {
      throw new UpgradeRequiredError("model_not_available", "This quality level requires a paid plan");
    }

    const client = await prisma.client.findUnique({ where: { id: input.clientId } });
    if (!client || client.workspaceId !== workspace.id) throw new NotFoundError("Client not found");

    // Atomic increment before starting the stream
    const updated = await prisma.workspace.update({
      where: { id: workspace.id },
      data: { scriptCount: { increment: 1 } },
    });

    // Free-limit-reached email on the transition to 3
    if (updated.scriptCount === 3 && updated.plan === "FREE") {
      void (async () => {
        try {
          await sendFreeLimitReached({ to: user.email });
        } catch (err) {
          console.error("FreeLimit email failed", err);
        }
      })();
    }

    const { system, userMessage, model, max_tokens } = buildPrompt({
      client,
      platform: input.platform,
      topic: input.topic,
      duration: input.duration,
      hookStyle: input.hookStyle,
      extraOutputs: input.extraOutputs,
      model: getClaudeModelId(modelKey),
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let succeeded = false;
        try {
          const anthStream = anthropic.messages.stream({
            model,
            max_tokens,
            system,
            messages: [{ role: "user", content: userMessage }],
          });

          for await (const event of anthStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          succeeded = true;

          // Onboarding: track first script generated
          if (!workspace.firstScriptGeneratedAt) {
            void (async () => {
              try {
                await prisma.workspace.update({
                  where: { id: workspaceId! },
                  data: {
                    firstScriptGeneratedAt: new Date(),
                    onboardingStep: Math.max(workspace.onboardingStep, 2),
                  },
                });
                const remaining = getRemainingScripts({ ...workspace, scriptCount: updated.scriptCount });
                const fName = user.name?.split(" ")[0] || user.email.split("@")[0];
                await sendFirstScriptEmail(workspace.id, user.email, fName, remaining);
              } catch (err) {
                console.error("First script onboarding failed", err);
              }
            })();
          }
        } catch (err: any) {
          console.error("Anthropic stream error", err);
          controller.enqueue(encoder.encode(`\n[[ERROR:${err.message || "stream failed"}]]`));
          // Decrement scriptCount since the generation failed
          try {
            await prisma.workspace.update({
              where: { id: workspaceId! },
              data: { scriptCount: { decrement: 1 } },
            });
          } catch (e) {
            console.error("Failed to decrement scriptCount", e);
          }
        } finally {
          controller.close();
        }
        void succeeded;
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
