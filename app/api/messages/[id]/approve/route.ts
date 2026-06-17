import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const message = await prisma.message.findFirst({
    where: { id },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
  });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    if (message.type === "CONNECTION_NOTE") {
      await unipile.sendConnectionRequest(
        message.campaign.linkedInAccount.unipileAccountId,
        message.lead.linkedInProfileId,
        message.content
      );
    } else {
      const conv = await prisma.conversation.findUnique({ where: { leadId: message.leadId } });
      if (conv) {
        await unipile.sendMessage(
          message.campaign.linkedInAccount.unipileAccountId,
          conv.unipileThreadId,
          message.content
        );
      }
    }
    await prisma.message.update({ where: { id }, data: { status: "SENT", sentAt: new Date() } });
    await prisma.lead.update({ where: { id: message.leadId }, data: { status: "CONTACTED", contactedAt: new Date() } });
    await prisma.linkedInAccount.update({ where: { id: message.campaign.linkedInAccountId }, data: { connSentToday: { increment: 1 } } });
    return NextResponse.json({ success: true });
  } catch (err) {
    await prisma.message.update({ where: { id }, data: { status: "FAILED" } });
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
