import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { email, password } = parsed.data;

  try {
    const created = await unipile.createAccount(email, password);

    if (created.checkpoint) {
      return NextResponse.json({
        checkpoint: true,
        account_id: created.account_id,
        checkpoint_type: created.checkpoint.type,
        message: created.checkpoint.message ?? "Enter the verification code sent by LinkedIn",
      });
    }

    // Fetch rich profile data
    const [account, profile] = await Promise.allSettled([
      unipile.getAccount(created.account_id),
      unipile.getAccountProfile(created.account_id),
    ]);

    const accountData = account.status === "fulfilled" ? account.value : null;
    const profileData = profile.status === "fulfilled" ? profile.value : null;

    const name = profileData
      ? `${profileData.first_name} ${profileData.last_name}`.trim()
      : (accountData?.name ?? email);

    const avatarUrl = profileData?.profile_picture_url ?? null;

    const dbAccount = await prisma.linkedInAccount.create({
      data: {
        workspaceId: user.workspaceId,
        unipileAccountId: created.account_id,
        name,
        avatarUrl: avatarUrl ?? null,
        headline: profileData?.occupation && profileData.occupation !== "--" ? profileData.occupation : null,
        email: profileData?.email ?? null,
        location: profileData?.location ?? null,
        linkedinPublicId: profileData?.public_identifier ?? accountData?.connection_params?.im?.publicIdentifier ?? null,
        premium: profileData?.premium ?? false,
        proxyCountry: accountData?.connection_params?.im?.proxy?.country ?? null,
        limitsResetAt: new Date(),
        lastSyncAt: new Date(),
      },
    });

    return NextResponse.json(dbAccount);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to connect account";
    console.error("[accounts/connect]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
