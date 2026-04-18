import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getGeoFromIp } from "@/lib/geo";

const bodySchema = z.object({
  leadId: z.string().min(1),
  eventType: z.enum([
    "page_view", "page_exit", "cta_click", "scroll_depth",
    "form_start", "form_field", "form_abandon", "signup_complete",
    "onboarding_step",
  ]),
  page: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { leadId, eventType, page, metadata } = parsed.data;

  const lead = await prisma.referralLead.findUnique({ where: { leadId } });
  if (!lead) return NextResponse.json({ ok: true }); // silent ignore

  const now = new Date();
  const updates: Record<string, unknown> = { lastVisitAt: now };

  if (eventType === "page_view") {
    if (!lead.firstVisitAt) {
      updates.firstVisitAt = now;
      if (ip !== "unknown" && !lead.country) {
        const geo = await getGeoFromIp(ip);
        if (geo) {
          updates.country = geo.country;
          updates.city = geo.city;
          updates.region = geo.region;
        }
      }
      const ua = req.headers.get("user-agent") ?? "";
      updates.userAgent = ua;
      updates.browser = parseBrowser(ua);
      updates.os = parseOs(ua);
      updates.deviceType = parseDeviceType(ua);
      updates.ipAddress = ip;
    }
    updates.totalVisits = (lead.totalVisits ?? 0) + 1;
  }

  if (eventType === "page_exit" && metadata?.timeOnPageSeconds) {
    updates.totalTimeOnSiteSeconds =
      (lead.totalTimeOnSiteSeconds ?? 0) + Number(metadata.timeOnPageSeconds);
  }

  if (eventType === "form_start" && !lead.signupFormStartedAt) {
    updates.signupFormStartedAt = now;
  }

  if (eventType === "form_field" && metadata?.field) {
    updates.signupFormLastField = String(metadata.field);
  }

  if (eventType === "form_abandon") {
    updates.signupFormAbandonedAt = now;
    if (metadata?.timeOnPageSeconds) {
      updates.signupFormTimeSeconds = Number(metadata.timeOnPageSeconds);
    }
  }

  if (eventType === "signup_complete" && metadata?.clerkUserId) {
    updates.signedUp = true;
    updates.signedUpAt = now;
    updates.clerkUserId = String(metadata.clerkUserId);
  }

  if (eventType === "onboarding_step") {
    if (metadata?.action === "enter" && !lead.onboardingStartedAt) {
      updates.onboardingStartedAt = now;
    }
    if (metadata?.completed) {
      updates.onboardingCompletedAt = now;
      updates.onboardingStepsJson = metadata.steps ?? [];
    }
  }

  await Promise.all([
    prisma.referralLead.update({ where: { leadId }, data: updates }),
    prisma.referralEvent.create({
      data: {
        leadId,
        eventType,
        page,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}

function parseBrowser(ua: string): string {
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

function parseOs(ua: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

function parseDeviceType(ua: string): string {
  if (ua.includes("Mobile") || ua.includes("iPhone")) return "mobile";
  if (ua.includes("iPad") || ua.includes("Tablet")) return "tablet";
  return "desktop";
}
