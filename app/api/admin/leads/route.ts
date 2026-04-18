import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ContactMethod, OutreachStatus } from "@prisma/client";
import { cookies } from "next/headers";

// Use the same admin auth as the rest of the admin section
async function checkAdmin(): Promise<boolean> {
  // Import admin auth dynamically to match existing pattern
  const { verifyAdminToken, COOKIE } = await import("@/lib/adminAuth");
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

const upsertLeadSchema = z.object({
  leadId: z.string().min(1),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  contactedAt: z.string().datetime().optional(),
  contactMethod: z.nativeEnum(ContactMethod).optional(),
  contactFormUrl: z.string().optional(),
  contactFormConfirmation: z.string().optional(),
  resendMessageId: z.string().optional(),
  messageSubject: z.string().optional(),
  messageBody: z.string().optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = 50;
  const skip = (page - 1) * pageSize;

  const [leads, total] = await Promise.all([
    prisma.referralLead.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { events: { orderBy: { createdAt: "asc" } } },
    }),
    prisma.referralLead.count(),
  ]);

  return NextResponse.json({ leads, total, page, pageSize });
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = upsertLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { contactedAt, ...rest } = parsed.data;
  const lead = await prisma.referralLead.upsert({
    where: { leadId: rest.leadId },
    create: {
      ...rest,
      contactedAt: contactedAt ? new Date(contactedAt) : undefined,
    },
    update: {
      ...rest,
      contactedAt: contactedAt ? new Date(contactedAt) : undefined,
    },
  });

  return NextResponse.json(lead, { status: 201 });
}
