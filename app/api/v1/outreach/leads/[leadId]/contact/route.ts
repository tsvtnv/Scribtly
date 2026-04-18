import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

const contactSchema = z.object({
  contactMethod: z.nativeEnum(ContactMethod),
  messageBody: z.string().min(1),
  messageSubject: z.string().optional(),
  contactFormUrl: z.string().optional(),
  contactFormConfirmation: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
});

const METHOD_TO_STATUS: Record<ContactMethod, OutreachStatus> = {
  RESEND_EMAIL: OutreachStatus.CONTACTED_VIA_EMAIL,
  WEBSITE_FORM: OutreachStatus.CONTACTED_VIA_FORM,
  MANUAL: OutreachStatus.CONTACTED_VIA_EMAIL,
};

export async function POST(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true, optedOut: true },
  });
  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  if (lead.optedOut) {
    return NextResponse.json(
      { error: "Lead has opted out of contact", code: "CONFLICT" },
      { status: 409 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { contactMethod, isBetaOffer, ...rest } = parsed.data;

  const updated = await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: {
      ...rest,
      contactMethod,
      contactedAt: new Date(),
      outreachStatus: METHOD_TO_STATUS[contactMethod],
      isBetaOffer,
    },
  });

  return NextResponse.json({ data: updated });
}
