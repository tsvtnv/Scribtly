import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  account_id: z.string().min(1),
  code: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { account_id, code } = parsed.data;

  try {
    const result = await unipile.submitCheckpoint(account_id, code);

    // Another checkpoint (e.g. 2FA after OTP)
    if (result.checkpoint) {
      return NextResponse.json({
        checkpoint: true,
        account_id: result.account_id,
        message: result.checkpoint.message ?? "Enter the next verification code",
      });
    }

    const profile = await unipile.getAccount(account_id);

    const account = await prisma.linkedInAccount.create({
      data: {
        workspaceId: user.workspaceId,
        unipileAccountId: account_id,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        headline: profile.headline,
        limitsResetAt: new Date(),
      },
    });

    return NextResponse.json(account);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to verify OTP";
    console.error("[accounts/otp]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
