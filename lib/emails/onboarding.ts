// lib/emails/onboarding.ts
import { resend } from "@/lib/resend";
import type { Plan } from "@prisma/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scriptfast.app";
const FROM = "Deyan from ScriptFast <deyan@scriptfast.app>";
const REPLY_TO = "deyan@scriptfast.app";

function footer(workspaceId: string): string {
  return `\n\n---\nTo stop receiving these emails: ${APP_URL}/api/user/unsubscribe?token=${workspaceId}\nScriptFast · hello@scriptfast.app`;
}

async function sendPlain({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === "re_placeholder"
  ) {
    console.log("[email:skipped — no RESEND_API_KEY]", to, subject);
    return;
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to,
      subject,
      text,
    });
    if (error) console.error("Resend error", error);
  } catch (err) {
    console.error("Resend threw", err);
  }
}

export async function sendWelcomeEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYour account is set up.\n\nOne thing to do right now: add your first client.\n\nIt takes 2 minutes — you just enter their niche, who their audience is, and how they talk. After that, every script you generate automatically sounds like them.\n\nAdd your first client here: ${APP_URL}/clients/new\n\nOnce that's done, you're ready to generate your first script.\n\nDeyan\nScriptFast\n\n---\nYou're on the Free plan — 5 scripts included. No card required.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Your ScriptFast account is ready", text });
}

export async function sendDay2NoScriptEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou signed up for ScriptFast 2 days ago but haven't generated a script yet.\n\nI wanted to check — did something go wrong, or did life just get in the way?\n\nIf you hit a snag, reply to this email and I'll sort it out personally.\n\nIf you're ready to try it, here's what to do:\n\n1. Add a client (2 mins): ${APP_URL}/clients/new\n2. Generate a script: ${APP_URL}/generate\n\nThe whole thing takes less than 5 minutes. Your first script will be ready before you finish your coffee.\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Did something go wrong?", text });
}

export async function sendFirstScriptEmail(
  workspaceId: string,
  email: string,
  firstName: string,
  remainingScripts: number
) {
  const text =
    `Hi ${firstName},\n\nYou just generated your first script.\n\nHow did it feel? Did it actually sound like your client?\n\nIf it was off, the fix is usually in the client profile — adding more specific phrases they use makes a big difference. You can edit it here: ${APP_URL}/clients\n\nIf it was good, here's what to do next:\n\nYour script is saved in your library at ${APP_URL}/scripts — you can edit it, copy it, or download it as a PDF (on Pro).\n\nYou have ${remainingScripts} scripts left this month. If you're on Free and running low, Basic is £5/month for 25 scripts.\n\nDeyan\n\nP.S. Reply and let me know what you're creating. I read every reply.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "How was it?", text });
}

export async function sendDay7FreeEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou've been using ScriptFast for a week.\n\nI want to ask you directly: what's stopping you from upgrading?\n\nBasic is £5/month. It gives you 25 scripts, 3 clients, and all quality levels. Most freelancers make that back from one extra script they didn't have to write themselves.\n\nIf something's not working or the tool isn't clicking, I'd genuinely rather know — reply to this and tell me. I'll fix it or help you get more out of it.\n\nIf you're ready: ${APP_URL}/pricing\n\nDeyan\n\nP.S. If you're happy on Free and just don't need more scripts, that's completely fine too. No pressure.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "What's stopping you?", text });
}

export async function sendDay7BasicEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou've been on Basic for a week — glad it's working.\n\nOne thing I want to show you: the content pipeline.\n\nIt's the feature that turns ScriptFast from a script generator into a full content management system. Every piece of content has a card. You drag it from Idea → Scripting → Review → Approved → Published. You can see everything you're working on across all clients in one view.\n\nIt's available on Pro for £19/month — £10 more than you're paying now.\n\nTake a look: ${APP_URL}/pricing\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "You're missing the best part", text });
}

export async function sendDay14ReengagementEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nI noticed you haven't used ScriptFast much in the past two weeks.\n\nNo hard sell here — I just want to make sure it's actually useful for you.\n\nTwo things:\n\n1. If something isn't working or it's harder than it should be, reply and tell me. I personally fix issues that users report.\n\n2. If your situation has changed and you're just not doing video content right now, that's fine — your account will be here when you need it.\n\nIf you do want to give it another shot, the fastest way is: ${APP_URL}/generate — pick a client, enter a topic, and you'll have a full script in 30 seconds.\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Still here if you need me", text });
}

export async function sendUpgradeConfirmationEmail(
  workspaceId: string,
  email: string,
  firstName: string,
  plan: Plan,
  billingDate: string
) {
  let planName: string;
  let body: string;

  if (plan === "BASIC") {
    planName = "Basic";
    body = `Hi ${firstName},\n\nYou're on Basic. Here's what you now have:\n\n- 25 scripts per month (was 5)\n- All 3 quality levels — Standard, Quality, and Premium\n- Up to 3 client profiles\n\nReady to generate: ${APP_URL}/generate\n\nYour billing date is the ${billingDate} each month — that's when your scripts reset.\n\nDeyan`;
  } else if (plan === "PRO") {
    planName = "Pro";
    body = `Hi ${firstName},\n\nYou're on Pro. Here's everything that just unlocked:\n\n- 100 scripts per month\n- The content pipeline: ${APP_URL}/pipeline\n- Calendar view to schedule content\n- PDF export for client reports\n- Title, hashtag, and description extras on every script\n- 10 client profiles\n\nThe pipeline is worth setting up today — add your active content pieces and you'll have a clear picture of everything in flight.\n\nDeyan`;
  } else {
    planName = "Agency";
    body = `Hi ${firstName},\n\nYou're on Agency. You now have:\n\n- 350 scripts per month\n- Unlimited clients\n- 3 team member seats — invite your team at ${APP_URL}/settings/team\n- Bulk generation\n- Priority support — reply to any email and you'll hear back within a few hours\n\nDeyan`;
  }

  const text = body + footer(workspaceId);

  return sendPlain({
    to: email,
    subject: `You're on ${planName} — here's what's new`,
    text,
  });
}
