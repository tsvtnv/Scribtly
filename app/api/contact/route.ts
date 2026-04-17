import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional(),
  scripts_needed: z.number().int().min(1).max(1_000_000),
  message: z.string().trim().max(5000).optional(),
});

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

type RateEntry = { count: number; resetAt: number };
const globalForRate = globalThis as unknown as { __contactRate?: Map<string, RateEntry> };
const rateMap: Map<string, RateEntry> = globalForRate.__contactRate ?? new Map();
if (!globalForRate.__contactRate) globalForRate.__contactRate = rateMap;

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      throw new ValidationError("Invalid contact submission", { issues: parsed.error.issues });
    }
    const data = parsed.data;

    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@scriptfast.app";
    const subject = `New Enterprise enquiry from ${data.name} — ${data.scripts_needed} scripts/month`;

    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "-"}`,
      `Scripts needed / month: ${data.scripts_needed}`,
      "",
      "Message:",
      data.message || "(none)",
    ].join("\n");

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder") {
      try {
        const { error } = await resend.emails.send({
          from: EMAIL_FROM,
          to,
          replyTo: data.email,
          subject,
          text,
        });
        if (error) console.error("Contact email resend error", error);
      } catch (err) {
        console.error("Contact email threw", err);
      }
    } else {
      console.log("[contact:email skipped — no RESEND_API_KEY]", { to, subject, text });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
