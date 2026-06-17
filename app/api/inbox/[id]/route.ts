import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: {
      lead: {
        select: {
          name: true, headline: true, company: true, location: true,
          avatarUrl: true, profileUrl: true, icpScore: true,
          campaign: { select: { id: true, name: true } },
        },
      },
      messages: { orderBy: { sentAt: "asc" } },
    },
  });

  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.conversation.update({ where: { id }, data: { hasUnread: false } });

  return NextResponse.json(conversation);
}
