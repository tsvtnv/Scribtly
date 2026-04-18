import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendBetaWelcome } from "@/lib/sendEmail";

const schema = z.object({ leadId: z.string().min(1) });

export async function POST(req: NextRequest) {
  const { user } = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { leadId } = parsed.data;

  // Verify this is a beta offer lead
  const lead = await prisma.referralLead.findUnique({ where: { leadId } });
  if (!lead || !lead.isBetaOffer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Get user + their default workspace
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, name: true, isBetaTester: true, defaultWorkspaceId: true },
  });
  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!dbUser.defaultWorkspaceId) {
    return NextResponse.json({ error: "No workspace" }, { status: 400 });
  }

  // Idempotent — if already beta tester, return current expiry
  if (dbUser.isBetaTester) {
    const current = await prisma.user.findUnique({
      where: { id: dbUser.id },
      select: { betaExpiresAt: true },
    });
    return NextResponse.json({ ok: true, betaExpiresAt: current?.betaExpiresAt });
  }

  const betaExpiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: dbUser.id },
      data: { isBetaTester: true, betaExpiresAt },
    }),
    prisma.workspace.update({
      where: { id: dbUser.defaultWorkspaceId },
      data: { plan: "BASIC" },
    }),
    prisma.referralLead.update({
      where: { leadId },
      data: {
        signedUp: true,
        signedUpAt: new Date(),
        clerkUserId: dbUser.id,
      },
    }),
  ]);

  void sendBetaWelcome({
    to: dbUser.email,
    name: dbUser.name ?? undefined,
    betaExpiresAt,
  }).catch(console.error);

  return NextResponse.json({ ok: true, betaExpiresAt: betaExpiresAt.toISOString() });
}
