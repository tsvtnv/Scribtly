import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyOutreachApiKey } from "@/lib/outreachApiAuth";
import { createLeadSchema } from "@/app/api/v1/outreach/leads/route";

const bulkBodySchema = z.object({
  leads: z.array(createLeadSchema).min(1).max(50),
});

export async function POST(req: NextRequest) {
  const auth = verifyOutreachApiKey(req);
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = bulkBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { leads } = parsed.data;

  const existingIds = new Set(
    (await prisma.referralLead.findMany({
      where: { leadId: { in: leads.map((l) => l.leadId) } },
      select: { leadId: true },
    })).map((l) => l.leadId)
  );

  let created = 0;
  let updated = 0;
  const upsertedIds: string[] = [];
  const errors: Array<{ leadId: string; error: string }> = [];

  for (const lead of leads) {
    try {
      await prisma.referralLead.upsert({
        where: { leadId: lead.leadId },
        create: lead,
        update: lead,
      });
      if (existingIds.has(lead.leadId)) {
        updated++;
      } else {
        created++;
      }
      upsertedIds.push(lead.leadId);
    } catch (err) {
      errors.push({ leadId: lead.leadId, error: String(err) });
    }
  }

  return NextResponse.json({
    data: {
      upserted: created + updated,
      created,
      updated,
      leadIds: upsertedIds,
      ...(errors.length > 0 ? { errors } : {}),
    },
  });
}
