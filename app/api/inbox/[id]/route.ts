import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

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
          linkedInProfileId: true,
          campaign: {
            select: {
              id: true, name: true,
              linkedInAccount: { select: { unipileAccountId: true } },
            },
          },
        },
      },
    },
  });

  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.conversation.update({ where: { id }, data: { hasUnread: false } });

  // Fetch messages live from Unipile
  let messages: Array<{ id: string; content: string; direction: string; sentAt: string }> = [];
  try {
    const raw = await unipile.getMessages(
      conversation.lead.campaign.linkedInAccount.unipileAccountId,
      conversation.unipileThreadId
    );
    const leadProfileId = conversation.lead.linkedInProfileId;
    messages = raw.items.map(m => ({
      id: m.id,
      content: m.text,
      direction: m.sender_id === leadProfileId ? "INBOUND" : "OUTBOUND",
      sentAt: m.created_at,
    }));
  } catch {
    // Return conversation without messages if fetch fails
  }

  const { lead } = conversation;
  return NextResponse.json({
    id: conversation.id,
    lead: {
      name: lead.name,
      headline: lead.headline,
      company: lead.company,
      location: lead.location,
      avatarUrl: lead.avatarUrl,
      profileUrl: lead.profileUrl,
      icpScore: lead.icpScore,
      campaign: { id: lead.campaign.id, name: lead.campaign.name },
    },
    messages,
  });
}
