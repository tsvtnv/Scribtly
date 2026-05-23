import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isBetaTester: true, betaExpiresAt: true },
  });

  if (!dbUser) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const betaActive =
    dbUser.isBetaTester &&
    dbUser.betaExpiresAt !== null &&
    dbUser.betaExpiresAt > new Date();

  return NextResponse.json({
    isBetaTester: dbUser.isBetaTester,
    betaExpiresAt: dbUser.betaExpiresAt?.toISOString() ?? null,
    betaActive,
  });
}
