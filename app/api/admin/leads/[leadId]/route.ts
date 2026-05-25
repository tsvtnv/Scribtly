import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { cookies } from "next/headers";

async function checkAdmin(): Promise<boolean> {
  const { verifyAdminToken, COOKIE } = await import("@/lib/adminAuth");
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

const patchSchema = z.object({
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  notes: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lead = await prisma.referralLead.update({
    where: { leadId: params.leadId },
    data: parsed.data,
  });

  return NextResponse.json({ data: lead });
}
