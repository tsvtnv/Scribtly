import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ensureUser } from "@/lib/ensureUser";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
  try {
    const { user } = await ensureUser();
    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== "DELETE") throw new ValidationError("Confirmation missing");

    // Cancel any active subscriptions on workspaces this user owns
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

    // Delete Clerk user — Prisma cascade will remove owned workspaces,
    // and workspace memberships where this user is a member.
    try {
      await clerkClient().users.deleteUser(user.clerkId);
    } catch (err) {
      console.error("Clerk delete failed", err);
    }

    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
