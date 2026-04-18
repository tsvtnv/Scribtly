// app/api/v1/outreach/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

// ── Shared Zod schema for creating a lead ──────────────────────────────────

export const createLeadSchema = z.object({
  leadId: z.string().min(1).max(64),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
});

// ── GET /api/v1/outreach/leads ─────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const { searchParams } = req.nextUrl;
  const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
  const rawLimit = parseInt(searchParams.get("limit") ?? "20", 10);
  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);
  const limit = Math.min(100, Math.max(1, isNaN(rawLimit) ? 20 : rawLimit));
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};
  const status = searchParams.get("status");
  if (status && Object.values(OutreachStatus).includes(status as OutreachStatus)) {
    where.outreachStatus = status as OutreachStatus;
  }
  const contactMethod = searchParams.get("contactMethod");
  if (contactMethod && Object.values(ContactMethod).includes(contactMethod as ContactMethod)) {
    where.contactMethod = contactMethod as ContactMethod;
  }
  const signedUp = searchParams.get("signedUp");
  if (signedUp === "true") where.signedUp = true;
  if (signedUp === "false") where.signedUp = false;
  const isBetaOffer = searchParams.get("isBetaOffer");
  if (isBetaOffer === "true") where.isBetaOffer = true;
  if (isBetaOffer === "false") where.isBetaOffer = false;
  const country = searchParams.get("country");
  if (country) where.country = country;
  const fitScore = searchParams.get("fitScore");
  if (fitScore) {
    const n = parseInt(fitScore, 10);
    if (n >= 1 && n <= 5) where.fitScore = n;
  }

  // Sorting
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const allowedSortFields = [
    "createdAt", "updatedAt", "agencyName", "fitScore",
    "totalVisits", "signedUpAt", "lastVisitAt", "contactedAt",
  ];
  const orderBy = allowedSortFields.includes(sortBy)
    ? { [sortBy]: sortDir }
    : { createdAt: "desc" as const };

  const [leads, total] = await Promise.all([
    prisma.referralLead.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        leadId: true,
        agencyName: true,
        agencyWebsite: true,
        agencyLocation: true,
        agencyServices: true,
        fitScore: true,
        outreachStatus: true,
        contactMethod: true,
        contactedAt: true,
        signedUp: true,
        isBetaOffer: true,
        country: true,
        totalVisits: true,
        emailDelivered: true,
        emailBounced: true,
        emailOpenedAt: true,
        emailClickedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.referralLead.count({ where }),
  ]);

  return NextResponse.json({
    data: leads,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// ── POST /api/v1/outreach/leads ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { leadId } = parsed.data;

  // Check for conflict
  const existing = await prisma.referralLead.findUnique({ where: { leadId }, select: { leadId: true } });
  if (existing) {
    return NextResponse.json(
      { error: `Lead with leadId '${leadId}' already exists`, code: "CONFLICT" },
      { status: 409 }
    );
  }

  const lead = await prisma.referralLead.create({ data: parsed.data });

  return NextResponse.json({ data: lead }, { status: 201 });
}
