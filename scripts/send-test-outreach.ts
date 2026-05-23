/**
 * Sends a test cold outreach email to kristiyan@Scribtly.com simulating
 * the agency outreach flow for lead_scribtly_test.
 *
 * Run: npx tsx scripts/send-test-outreach.ts
 */

// Load env vars manually (dotenv not installed as a dep)
import { readFileSync } from "fs";
for (const file of [".env.local", ".env"]) {
  try {
    readFileSync(file, "utf8").split("\n").forEach((line) => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  } catch {}
}

import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const LEAD_ID = "lead_scribtly_test";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const subject = "Quick idea for your client script workflow";
const body = `Hi Scribtly team,

I came across Scribtly while looking for agencies helping brands with TikTok content and short-form video.

I'm building Scribtly, a tool for social media teams and agencies that creates client-ready video scripts from reusable client voice profiles. The idea is to help agencies avoid rewriting generic AI drafts and keep scripts consistent across TikTok, Reels, YouTube, LinkedIn, and podcast content.

Thought it might be useful if your team writes scripts or content outlines for multiple clients.

Happy to set you up with free access and create a few example scripts for one of your client types if useful.

Best,
Kristiyan
Scribtly
${APP_URL}/ref/${LEAD_ID}

If this is not relevant, just reply 'no thanks' and I will not contact you again.`;

async function main() {
  const result = await resend.emails.send({
    from: "Kristiyan@scribtly.com",
    to: "kristiyan@Scribtly.com",
    replyTo: "Kristiyan@scribtly.com",
    subject,
    text: body,
  });

  if (result.error) {
    console.error("❌ Send failed:", result.error);
    return;
  }

  const messageId = result.data!.id;
  console.log("✅ Email sent! Message ID:", messageId);

  // Log the outreach in DB
  await prisma.referralLead.update({
    where: { leadId: LEAD_ID },
    data: {
      contactedAt: new Date(),
      contactMethod: "RESEND_EMAIL",
      resendMessageId: messageId,
      messageSubject: subject,
      messageBody: body,
      outreachStatus: "CONTACTED_VIA_EMAIL",
    },
  });

  console.log("✅ Lead updated in DB with outreach details");
  console.log(`📊 Admin: ${APP_URL}/admin/outreach`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
