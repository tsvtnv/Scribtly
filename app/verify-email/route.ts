import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { sendWelcome, sendBetaWelcome } from "@/lib/sendEmail";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", appUrl));
  }

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token_expired", appUrl));
  }

  const [user] = await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } }),
    prisma.emailVerificationToken.delete({ where: { id: record.id } }),
  ]);

  // Create session now that email is verified
  const session = await lucia.createSession(user.id, {});
  await setSessionCookie(session.id);

  void sendWelcome({ to: user.email, name: user.name || undefined }).catch(console.error);

  // Auto-activate beta if user arrived via a beta referral link
  const refLeadId = req.cookies.get("ref_lead_id")?.value;
  if (refLeadId) {
    const lead = await prisma.referralLead.findUnique({
      where: { leadId: refLeadId },
      select: { isBetaOffer: true, signedUp: true },
    });
    if (lead?.isBetaOffer && !lead.signedUp) {
      const workspace = await prisma.workspace.findFirst({
        where: { ownerId: user.id },
        select: { id: true },
      });
      if (workspace) {
        const betaExpiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: { isBetaTester: true, betaExpiresAt },
          }),
          prisma.workspace.update({
            where: { id: workspace.id },
            data: { plan: "BASIC" },
          }),
          prisma.referralLead.update({
            where: { leadId: refLeadId },
            data: { signedUp: true, signedUpAt: new Date(), clerkUserId: user.id },
          }),
        ]);
        void sendBetaWelcome({
          to: user.email,
          name: user.name ?? undefined,
          betaExpiresAt,
        }).catch(console.error);
      }
    }
  }

  return NextResponse.redirect(new URL("/onboarding", appUrl));
}
