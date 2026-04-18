/**
 * Seeds a test referral lead so you can try the /ref/ landing page locally.
 *
 * Run with: npx tsx scripts/seed-test-lead.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const lead = await prisma.referralLead.upsert({
    where: { leadId: "lead_001" },
    update: {},
    create: {
      leadId: "lead_001",
      agencyName: "Social Boost Agency",
      agencyWebsite: "https://example.com",
      agencyLocation: "London, UK",
      agencyServices: "TikTok,short-form video,Instagram Reels",
      fitScore: 5,
    },
  });

  console.log(`✅ Test lead created: ${lead.agencyName}`);
  console.log(`👉 Visit: http://localhost:3000/ref/lead_001`);
  console.log(`📊 Admin:  http://localhost:3000/admin/outreach`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
