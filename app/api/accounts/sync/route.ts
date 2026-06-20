import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

function unipileStatusToDb(sources: Array<{ status: string }>): "ACTIVE" | "DISCONNECTED" {
  const mainSource = sources[0];
  if (!mainSource) return "DISCONNECTED";
  return mainSource.status === "OK" ? "ACTIVE" : "DISCONNECTED";
}

function tierLimits(premium: boolean) {
  return premium
    ? { dailyConnLimit: 50, dailyMsgLimit: 150 }
    : { dailyConnLimit: 15, dailyMsgLimit: 50 };
}

export async function POST() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const unipileAccounts = await unipile.listAccounts();
  const existing = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId },
  });
  const existingByUnipileId = new Map<string, (typeof existing)[number]>(existing.map(a => [a.unipileAccountId, a]));

  const added: string[] = [];
  const updated: string[] = [];

  for (const ua of unipileAccounts.items) {
    const profile = await unipile.getAccountProfile(ua.id).catch(() => null);
    const avatarUrl = profile?.profile_picture_url ?? null;

    const name = profile ? `${profile.first_name} ${profile.last_name}`.trim() : ua.name;
    const dbStatus = unipileStatusToDb(ua.sources);
    const proxyCountry = ua.connection_params?.im?.proxy?.country ?? null;
    const linkedinPublicId = ua.connection_params?.im?.publicIdentifier ?? null;
    const isPremium = profile?.premium ?? false;

    if (existingByUnipileId.has(ua.id)) {
      const existingRecord = existingByUnipileId.get(ua.id)!;
      const premiumChanged = existingRecord.premium !== isPremium;

      await prisma.linkedInAccount.update({
        where: { id: existingRecord.id },
        data: {
          name,
          avatarUrl: avatarUrl ?? existingRecord.avatarUrl,
          headline: profile?.occupation && profile.occupation !== "--" ? profile.occupation : existingRecord.headline,
          email: profile?.email ?? existingRecord.email,
          location: profile?.location ?? existingRecord.location,
          linkedinPublicId: linkedinPublicId ?? existingRecord.linkedinPublicId,
          premium: isPremium,
          proxyCountry: proxyCountry ?? existingRecord.proxyCountry,
          status: dbStatus,
          lastSyncAt: new Date(),
          // Only auto-reset limits if the premium tier changed
          ...(premiumChanged ? tierLimits(isPremium) : {}),
        },
      });
      updated.push(ua.id);
    } else {
      await prisma.linkedInAccount.create({
        data: {
          workspaceId: user.workspaceId,
          unipileAccountId: ua.id,
          name,
          avatarUrl: avatarUrl ?? null,
          headline: profile?.occupation && profile.occupation !== "--" ? profile.occupation : null,
          email: profile?.email ?? null,
          location: profile?.location ?? null,
          linkedinPublicId: linkedinPublicId ?? null,
          premium: isPremium,
          proxyCountry: proxyCountry ?? null,
          status: dbStatus,
          limitsResetAt: new Date(),
          lastSyncAt: new Date(),
          ...tierLimits(isPremium),
        },
      });
      added.push(ua.id);
    }
  }

  return NextResponse.json({ synced: added.length + updated.length, added, updated });
}
