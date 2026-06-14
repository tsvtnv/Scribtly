import { NextRequest, NextResponse } from "next/server";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/sendEmail";
import { checkRateLimit, forgotPasswordLimiter } from "@/lib/rateLimit";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(forgotPasswordLimiter(), req);
  if (limited) return limited;

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: true });
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.passwordHash) {
    const token = generateId(40);
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addHours(new Date(), 1),
      },
    });
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    void sendPasswordResetEmail({ to: email, name: user.name || undefined, resetUrl }).catch(console.error);
  }

  return NextResponse.json({ ok: true });
}
