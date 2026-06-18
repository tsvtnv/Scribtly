import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  account_id: z.string().min(1),
  code: z.string().optional(), // omit for app-approval flow
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

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

      await prisma.linkedInAccount.update({
        where: { id },
        data: {
          status: "ACTIVE",
          unipileAccountId: result.account_id,
          lastSyncAt: new Date(),
        },
      });
      return NextResponse.json({ success: true });
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

    await prisma.linkedInAccount.update({
      where: { id },
      data: {
        status: "ACTIVE",
        unipileAccountId: account_id,
        lastSyncAt: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "OTP verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
