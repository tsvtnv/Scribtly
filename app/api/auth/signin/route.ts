import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { checkRateLimit, signinLimiter } from "@/lib/rateLimit";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(signinLimiter, req);
  if (limited) return limited;

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verify(user.passwordHash, password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!user.emailVerified) {
    return NextResponse.json(
      { error: "Please verify your email before signing in.", code: "EMAIL_NOT_VERIFIED" },
      { status: 403 }
    );
  }

  const session = await lucia.createSession(user.id, {});
  await setSessionCookie(session.id);

  return NextResponse.json({ ok: true });
}
