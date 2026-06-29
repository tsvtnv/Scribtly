import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

const buildStub: PrismaClient = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    if (prop === "then") return undefined;
    return new Proxy(() => Promise.resolve(null), {
      get: (_t2, p2) => {
        if (p2 === "then") return undefined;
        return () => Promise.resolve(null);
      },
      apply: () => Promise.resolve(null),
    });
  },
});

function getOrCreatePrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!process.env.DATABASE_URL) return buildStub;
  return (globalForPrisma.prisma = createClient());
}

export const prisma: PrismaClient = getOrCreatePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
