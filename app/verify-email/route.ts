import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { sendWelcome } from "@/lib/sendEmail";

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

  return NextResponse.redirect(new URL("/team-onboarding", appUrl));
}
