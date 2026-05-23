import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { agencyName: true },
  });
  if (!lead) return NextResponse.json({ agencyName: null });
  return NextResponse.json({ agencyName: lead.agencyName });
}
