import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ensureUser } from "@/lib/ensureUser";
import { lucia, clearSessionCookie } from "@/lib/auth";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
  try {
    const { user } = await ensureUser();
    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== "DELETE") throw new ValidationError("Confirmation missing");

    const ownedWorkspaces = await prisma.workspace.findMany({
      where: { ownerId: user.id, stripeSubscriptionId: { not: null } },
    });
    for (const ws of ownedWorkspaces) {
      try {
        if (ws.stripeSubscriptionId) {
          await stripe.subscriptions.cancel(ws.stripeSubscriptionId);
        }
      } catch (err) {
        console.error("Failed to cancel subscription", ws.id, err);
      }
    }

    await lucia.invalidateUserSessions(user.id);
    await prisma.user.delete({ where: { id: user.id } });
    await clearSessionCookie();

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
