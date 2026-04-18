import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";
import { resend } from "@/lib/resend";

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  isBetaOffer: z.boolean().optional(),
  force: z.boolean().optional().default(false),
});

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true, outreachStatus: true },
  });
  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = sendEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { to, subject, body: emailBody, isBetaOffer, force } = parsed.data;

  if (!force && lead.outreachStatus !== OutreachStatus.NOT_CONTACTED) {
    return NextResponse.json(
      {
        error: `Lead already contacted (status: ${lead.outreachStatus}). Use force:true to override.`,
        code: "CONFLICT",
      },
      { status: 409 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: "Kristiyan <Kristiyan@scribtly.com>",
    to,
    replyTo: "Kristiyan@scribtly.com",
    subject,
    text: emailBody,
  });

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Email send failed", code: "SEND_FAILED" },
      { status: 502 }
    );
  }

  await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: {
      contactMethod: "RESEND_EMAIL",
      contactedAt: new Date(),
      outreachStatus: OutreachStatus.CONTACTED_VIA_EMAIL,
      resendMessageId: data.id,
      messageSubject: subject,
      messageBody: emailBody,
      ...(isBetaOffer !== undefined ? { isBetaOffer } : {}),
    },
  });

  return NextResponse.json({
    data: { ok: true, resendMessageId: data.id },
  });
}
