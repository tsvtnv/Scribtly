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

    // LinkedIn may require OTP verification (checkpoint)
    if (created.checkpoint) {
      return NextResponse.json({
        checkpoint: true,
        account_id: created.account_id,
        message: created.checkpoint.message ?? "Enter the verification code sent by LinkedIn",
      });
    }

    const profile = await unipile.getAccount(created.account_id);

    const account = await prisma.linkedInAccount.create({
      data: {
        workspaceId: user.workspaceId,
        unipileAccountId: created.account_id,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        headline: profile.headline,
        limitsResetAt: new Date(),
      },
    });

    return NextResponse.json(account);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to connect account";
    console.error("[accounts/connect]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
