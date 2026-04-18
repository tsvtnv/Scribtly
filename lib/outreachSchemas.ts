import { z } from "zod";
import { OutreachStatus } from "@prisma/client";

export const createLeadSchema = z.object({
  leadId: z.string().min(1).max(64),
  agencyName: z.string().min(1),
  agencyWebsite: z.string().optional(),
  agencyLocation: z.string().optional(),
  agencyServices: z.string().optional(),
  fitScore: z.number().int().min(1).max(5).optional(),
  sourceSearchQuery: z.string().optional(),
  sourceResultUrl: z.string().optional(),
  notes: z.string().optional(),
  isBetaOffer: z.boolean().optional(),
  outreachStatus: z.nativeEnum(OutreachStatus).optional(),
});
