import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { ensureUser } from "@/lib/ensureUser";
import { buildPrompt } from "@/lib/buildPrompt";
import { NotFoundError, ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  scriptId: z.string().min(1),
  sectionLabel: z.string().min(1),
  regenerationHint: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) throw new ValidationError("Invalid request", { issues: parsed.error.issues });

    const script = await prisma.script.findUnique({
      where: { id: parsed.data.scriptId },
      include: { client: true },
    });
    if (!script || script.workspaceId !== workspace.id) throw new NotFoundError("Script not found");
    if (!script.client) throw new NotFoundError("Script has no client");

    const base = buildPrompt({
      client: script.client,
      platform: script.platform,
      topic: script.topic,
      duration: script.duration,
      hookStyle: script.hookStyle,
    });

    const hint = parsed.data.regenerationHint
      ? `\nAdditional guidance from the creator: ${parsed.data.regenerationHint}`
      : "";

    const userMessage =
      `Rewrite ONLY the [${parsed.data.sectionLabel}] section of the script below. ` +
      `Keep every other section exactly as it is. Return ONLY the new section, starting with the [${parsed.data.sectionLabel}] header, nothing else.${hint}\n\n` +
      `Original script:\n\n${script.content}`;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthStream = anthropic.messages.stream({
            model: base.model,
            max_tokens: 800,
            system: base.system,
            messages: [{ role: "user", content: userMessage }],
          });
          for await (const event of anthStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err: any) {
          controller.enqueue(encoder.encode(`\n[[ERROR:${err.message || "stream failed"}]]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
