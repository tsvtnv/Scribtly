import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const logs = await prisma.automationLog.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { startedAt: "desc" },
    take: 100,
  });
  return NextResponse.json(logs);
}
