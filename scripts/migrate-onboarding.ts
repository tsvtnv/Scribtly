// scripts/migrate-onboarding.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const result = await prisma.workspace.updateMany({
    where: { welcomeEmailSentAt: null },
    data: { welcomeEmailSentAt: now },
  });
  console.log(`Marked ${result.count} existing workspaces as welcomed.`);
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
