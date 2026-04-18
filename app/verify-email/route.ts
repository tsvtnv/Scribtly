import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } }),
    prisma.emailVerificationToken.delete({ where: { id: record.id } }),
  ]);

  return NextResponse.redirect(new URL("/team-onboarding", appUrl));
}
