import { NextRequest, NextResponse } from "next/server";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/sendEmail";
import { addDays } from "@/lib/utils";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: true });

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && !user.emailVerified) {
    await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });

    const token = generateId(40);
    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addDays(new Date(), 1),
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    void sendVerificationEmail({
      to: email,
      name: user.name || undefined,
      verificationUrl,
    }).catch(console.error);
  }

  return NextResponse.json({ ok: true });
}
