import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
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

  const { email, password } = parsed.data;

  const result = await unipile.reconnectAccount(account.unipileAccountId, email, password);

  if (result.checkpoint) {
    return NextResponse.json({
      checkpoint: true,
      account_id: result.account_id,
      message: result.checkpoint.message ?? "Enter the verification code sent by LinkedIn",
    });
  }

  await prisma.linkedInAccount.update({
    where: { id },
    data: { status: "ACTIVE" },
  });

  return NextResponse.json({ success: true });
}
