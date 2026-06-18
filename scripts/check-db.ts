import { prisma } from "../lib/prisma";

async function main() {
  const [convs, contacted, accepted, accs] = await Promise.all([
    prisma.conversation.count(),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "ACCEPTED" } }),
    prisma.linkedInAccount.findMany({ select: { id: true, unipileAccountId: true, status: true } }),
  ]);
  console.log("conversations:", convs);
  console.log("leads contacted:", contacted);
  console.log("leads accepted:", accepted);
  console.log("accounts:", JSON.stringify(accs, null, 2));
  await prisma.$disconnect();
}

main();
