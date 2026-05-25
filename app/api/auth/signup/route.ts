import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { sendVerificationEmail, sendWelcome } from "@/lib/sendEmail";
import { addDays } from "@/lib/utils";
import { checkRateLimit, signupLimiter } from "@/lib/rateLimit";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(signupLimiter, req);
  if (limited) return limited;

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Return the same response as success to avoid revealing whether an email is registered
    return NextResponse.json({ ok: true, pendingVerification: true });
  }

  const passwordHash = await hash(password);
  const verificationToken = generateId(40);

  const user = await prisma.$transaction(async (tx) => {
    const invite = await tx.invite.findFirst({
      where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });

    const newUser = await tx.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        emailVerified: false,
      },
    });

    if (invite) {
      await tx.workspaceMember.create({
        data: { workspaceId: invite.workspaceId, userId: newUser.id, role: "MEMBER" },
      });
      await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
      await tx.user.update({
        where: { id: newUser.id },
        data: { defaultWorkspaceId: invite.workspaceId },
      });
    } else {
      const wsName = `${name?.split(" ")[0] || email.split("@")[0]}'s workspace`;
      const ws = await tx.workspace.create({
        data: { name: wsName, ownerId: newUser.id, scriptCountResetAt: addDays(new Date(), 30) },
      });
      await tx.workspaceMember.create({
        data: { workspaceId: ws.id, userId: newUser.id, role: "OWNER" },
      });
      await tx.user.update({ where: { id: newUser.id }, data: { defaultWorkspaceId: ws.id } });
    }

    await tx.emailVerificationToken.create({
      data: {
        userId: newUser.id,
        token: verificationToken,
        expiresAt: addDays(new Date(), 1),
      },
    });

    return newUser;
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
  void sendVerificationEmail({ to: email, name, verificationUrl }).catch(console.error);

  return NextResponse.json({ ok: true, pendingVerification: true });
}
