import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.referralLead.upsert({
    where: { leadId: "lead_scribtly_test" },
    update: {},
    create: {
      leadId: "lead_scribtly_test",
      agencyName: "Scribtly",
      agencyWebsite: "https://scribtly.com",
      agencyLocation: "UK",
      agencyServices: "TikTok,short-form video,Instagram Reels,social media management",
      fitScore: 5,
      outreachStatus: "NOT_CONTACTED",
    },
  });
  console.log("✅ Scribtly test lead ready");
  console.log("👉 Landing: http://localhost:3000/ref/lead_scribtly_test");
}
main().catch(console.error).finally(() => prisma.$disconnect());
