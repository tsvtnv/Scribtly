import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken, COOKIE } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";

const schema = z.object({
  plan: z.nativeEnum(Plan),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { userId } = params;
  const { plan } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { defaultWorkspaceId: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.defaultWorkspaceId) {
    return NextResponse.json({ error: "No workspace" }, { status: 400 });
  }

  await prisma.workspace.update({
    where: { id: user.defaultWorkspaceId },
    data: { plan },
  });

  return NextResponse.json({ ok: true, plan });
}
