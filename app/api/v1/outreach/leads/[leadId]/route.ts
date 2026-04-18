import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

const patchLeadSchema = z.object({
  agencyName: z.string().min(1).optional(),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
  contactMethod: z.nativeEnum(ContactMethod).optional(),
  optedOut: z.boolean().optional(),
}).strict();

export async function GET(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });

  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: lead });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const existing = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true },
  });
  if (!existing) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = patchLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: parsed.data,
  });

  return NextResponse.json({ data: lead });
}
