import { resend, EMAIL_FROM } from "@/lib/resend";
import type { Plan } from "@prisma/client";
import { WelcomeEmail } from "@/lib/emails/Welcome";
import { FreeLimitReachedEmail } from "@/lib/emails/FreeLimitReached";
import { UpgradeConfirmationEmail } from "@/lib/emails/UpgradeConfirmation";
import { InviteEmailTemplate } from "@/lib/emails/InviteEmail";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

async function send(params: Parameters<typeof resend.emails.send>[0]) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
    console.log("[email:skipped — no RESEND_API_KEY]", (params as any).to, (params as any).subject);
    return;
  }
  try {
    const { data, error } = await resend.emails.send(params);
    if (error) console.error("Resend error", error);
    return data;
  } catch (err) {
    console.error("Resend threw", err);
  }
}

export async function sendWelcome({ to, name }: { to: string; name?: string }) {
  return send({
    from: EMAIL_FROM,
    to,
    subject: "Your first script is waiting",
    react: WelcomeEmail({ name, appUrl: APP_URL }),
  });
}

export async function sendFreeLimitReached({ to }: { to: string }) {
  return send({
    from: EMAIL_FROM,
    to,
    subject: "You've used all 3 free scripts",
    react: FreeLimitReachedEmail({ appUrl: APP_URL }),
  });
}

export async function sendUpgradeConfirmation({ to, plan }: { to: string; plan: Plan }) {
  return send({
    from: EMAIL_FROM,
    to,
    subject: `You're now on Scribtly ${plan === "AGENCY" ? "Agency" : "Pro"}`,
    react: UpgradeConfirmationEmail({ plan, appUrl: APP_URL }),
  });
}

export async function sendInvite({
  to,
  inviterName,
  workspaceName,
  acceptUrl,
}: {
  to: string;
  inviterName: string;
  workspaceName: string;
  acceptUrl: string;
}) {
  return send({
    from: EMAIL_FROM,
    to,
    subject: `${inviterName} invited you to ${workspaceName} on Scribtly`,
    react: InviteEmailTemplate({ inviterName, workspaceName, acceptUrl }),
  });
}

export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name?: string;
  verificationUrl: string;
}) {
  const { default: VerifyEmail } = await import("@/lib/emails/VerifyEmail");
  return send({
    from: EMAIL_FROM,
    to,
    subject: "Verify your Scribtly email",
    react: VerifyEmail({ verificationUrl, name }),
  });
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name?: string;
  resetUrl: string;
}) {
  const { default: ResetPassword } = await import("@/lib/emails/ResetPassword");
  return send({
    from: EMAIL_FROM,
    to,
    subject: "Reset your Scribtly password",
    react: ResetPassword({ resetUrl, name }),
  });
}
