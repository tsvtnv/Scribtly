import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { workspaceId: user.workspaceId },
    include: {
      lead: {
        select: {
          name: true, company: true, avatarUrl: true, icpScore: true,
          campaign: { select: { id: true, name: true } },
        },
      },
      messages: { orderBy: { sentAt: "desc" }, take: 1 },
    },
    orderBy: { lastMessageAt: "desc" },
  });

  return NextResponse.json(conversations);
}
