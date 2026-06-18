import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  account_id: z.string().min(1),
  code: z.string().optional(), // omit for app-approval flow
});

async function createAccountRecord(
  workspaceId: string,
  unipileAccountId: string
) {
  const [accountResult, profileResult] = await Promise.allSettled([
    unipile.getAccount(unipileAccountId),
    unipile.getAccountProfile(unipileAccountId),
  ]);

  const accountData = accountResult.status === "fulfilled" ? accountResult.value : null;
  const profileData = profileResult.status === "fulfilled" ? profileResult.value : null;

  const name = profileData
    ? `${profileData.first_name} ${profileData.last_name}`.trim()
    : (accountData?.name ?? "LinkedIn User");

  return prisma.linkedInAccount.create({
    data: {
      workspaceId,
      unipileAccountId,
      name,
      avatarUrl: profileData?.profile_picture_url ?? null,
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
}

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { account_id, code } = parsed.data;

  try {
    if (code) {
      // Standard OTP code flow
      const result = await unipile.submitCheckpoint(account_id, code);

      if (result.checkpoint) {
        return NextResponse.json({
          checkpoint: true,
          account_id: result.account_id,
          checkpoint_type: result.checkpoint.type,
          message: result.checkpoint.message ?? "Enter the next verification code",
        });
      }

      const dbAccount = await createAccountRecord(user.workspaceId, result.account_id);
      return NextResponse.json(dbAccount);
    }

    // App-approval flow — check if LinkedIn already marked the account active
    const accountData = await unipile.getAccount(account_id);
    const isActive = accountData.sources[0]?.status === "OK";

    if (!isActive) {
      return NextResponse.json(
        { pending: true, message: "Approval not detected yet — please approve in your LinkedIn app then try again." },
        { status: 202 }
      );
    }

    const dbAccount = await createAccountRecord(user.workspaceId, account_id);
    return NextResponse.json(dbAccount);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to verify";
    console.error("[accounts/otp]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
