import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

export async function POST() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const unipileAccounts = await unipile.listAccounts();
  const existing = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId },
    select: { unipileAccountId: true },
  });
  const existingIds = new Set(existing.map((a) => a.unipileAccountId));

  const added: string[] = [];
  for (const ua of unipileAccounts.items) {
    if (existingIds.has(ua.id)) continue;
    const profile = await unipile.getAccount(ua.id);
    await prisma.linkedInAccount.create({
      data: {
        workspaceId: user.workspaceId,
        unipileAccountId: ua.id,
        name: profile.name,
        avatarUrl: profile.avatar_url ?? null,
        headline: profile.headline ?? null,
        limitsResetAt: new Date(),
      },
    });
    added.push(ua.id);
  }

  return NextResponse.json({ synced: added.length, added });
}
