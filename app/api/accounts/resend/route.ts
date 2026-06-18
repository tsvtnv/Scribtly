import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  account_id: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  try {
    await unipile.resendCheckpoint(parsed.data.account_id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to resend code";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
