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
    select: { leadId: true, outreachStatus: true, optedOut: true },
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
        error: "Lead has already been contacted. Use force:true to override.",
        code: "CONFLICT",
      },
      { status: 409 }
    );
  }

  // Per-lead tracked ref URL — personalised landing page with UTM params for attribution
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace("localhost:3000", "scribtly.com") ?? "https://scribtly.com";
  const trackedUrl = `${baseUrl}/ref/${params.leadId}?utm_source=outreach&utm_medium=email&utm_campaign=beta`;

  // Replace any scribtly.com links in the body with the personalised ref URL
  const trackedBody = emailBody.replace(/https?:\/\/scribtly\.com[^\s]*/g, trackedUrl).replace(/\bscribtly\.com\b(?![^\s<])/g, trackedUrl);

  // HTML version — required for Resend open/click tracking
  const htmlBody = trackedBody
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 16px 0;line-height:1.6">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("\n");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="font-family:sans-serif;font-size:15px;color:#1a1a1a;max-width:600px;margin:40px auto;padding:0 20px">${htmlBody}</body></html>`;

  const { data, error } = await resend.emails.send({
    from: "Kristiyan <Kristiyan@scribtly.com>",
    to,
    replyTo: "Kristiyan@scribtly.com",
    subject,
    text: trackedBody,
    html,
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
      messageBody: trackedBody,
      isBetaOffer,
      sourceResultUrl: trackedUrl,
    },
  });

  return NextResponse.json({
    data: { ok: true, resendMessageId: data.id },
  });
}
