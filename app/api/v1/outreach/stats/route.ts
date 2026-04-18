import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OutreachStatus } from "@prisma/client";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";

export async function GET(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const [
    total,
    contacted,
    emailDelivered,
    emailOpened,
    visited,
    signedUp,
    byStatusRaw,
  ] = await Promise.all([
    prisma.referralLead.count(),
    prisma.referralLead.count({
      where: {
        outreachStatus: {
          in: [
            OutreachStatus.CONTACTED_VIA_EMAIL,
            OutreachStatus.CONTACTED_VIA_FORM,
          ],
        },
      },
    }),
    prisma.referralLead.count({ where: { emailDelivered: true } }),
    prisma.referralLead.count({ where: { emailOpenedAt: { not: null } } }),
    prisma.referralLead.count({ where: { totalVisits: { gt: 0 } } }),
    prisma.referralLead.count({ where: { signedUp: true } }),
    prisma.referralLead.groupBy({
      by: ["outreachStatus"],
      _count: { outreachStatus: true },
    }),
  ]);

  const byStatus = Object.fromEntries(
    byStatusRaw.map((r) => [r.outreachStatus, r._count.outreachStatus])
  );

  const conversionRate = total > 0 ? Math.round((signedUp / total) * 10000) / 100 : 0;

  return NextResponse.json({
    data: {
      total,
      contacted,
      emailDelivered,
      emailOpened,
      visited,
      signedUp,
      conversionRate,
      byStatus,
    },
  });
}
