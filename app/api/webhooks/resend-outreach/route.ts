import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const RESEND_WEBHOOK_SECRET = process.env.RESEND_OUTREACH_WEBHOOK_SECRET ?? "";

async function verifySignature(req: NextRequest, rawBody: string): Promise<boolean> {
  if (!RESEND_WEBHOOK_SECRET) return true; // skip verification in dev if secret not set
  const signature = req.headers.get("svix-signature") ?? "";
  const timestamp = req.headers.get("svix-timestamp") ?? "";
  const msgId = req.headers.get("svix-id") ?? "";

  const signedContent = `${msgId}.${timestamp}.${rawBody}`;
  const enc = new TextEncoder();
  const secretBytes = Uint8Array.from(
    atob(RESEND_WEBHOOK_SECRET.replace(/^whsec_/, "")),
    (c) => c.charCodeAt(0)
  );
  const key = await crypto.subtle.importKey(
    "raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(signedContent));
  const computed = "v1," + btoa(String.fromCharCode(...new Uint8Array(sig)));
  return signature.split(" ").some((s) => s === computed);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const valid = await verifySignature(req, rawBody);
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let event: { type: string; data: { message_id?: string; [k: string]: unknown } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messageId = event.data?.message_id as string | undefined;
  if (!messageId) return NextResponse.json({ ok: true });

  const lead = await prisma.referralLead.findFirst({
    where: { resendMessageId: messageId },
  });
  if (!lead) return NextResponse.json({ ok: true });

  const now = new Date();
  const updates: Record<string, unknown> = {};

  switch (event.type) {
    case "email.delivered":
      updates.emailDelivered = true;
      break;
    case "email.bounced":
      updates.emailBounced = true;
      break;
    case "email.opened":
      if (!lead.emailOpenedAt) updates.emailOpenedAt = now;
      break;
    case "email.clicked":
      if (!lead.emailClickedAt) updates.emailClickedAt = now;
      break;
  }

  if (Object.keys(updates).length > 0) {
    await prisma.referralLead.update({ where: { id: lead.id }, data: updates });
  }

  return NextResponse.json({ ok: true });
}
