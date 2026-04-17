import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe, priceIdToPlan } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ received: true });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    console.error("Stripe sig verify failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const workspaceId = session.metadata?.workspaceId || session.client_reference_id;
        if (!workspaceId || !session.subscription) break;

        const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        const subscription = await stripe.subscriptions.retrieve(subId);
        const priceId = subscription.items.data[0]?.price.id;
        const plan = priceIdToPlan(priceId);

        const workspace = await prisma.workspace.update({
          where: { id: workspaceId },
          data: { plan, stripeSubscriptionId: subscription.id, stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id },
          include: { owner: true },
        });

        void (async () => {
          try {
            const { sendUpgradeConfirmation } = await import("@/lib/sendEmail");
            await sendUpgradeConfirmation({ to: workspace.owner.email, plan });
          } catch (err) {
            console.error("Upgrade email failed", err);
          }
        })();
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          typeof (invoice as any).subscription === "string"
            ? (invoice as any).subscription
            : (invoice as any).subscription?.id;
        if (subId) {
          await prisma.workspace.updateMany({
            where: { stripeSubscriptionId: subId },
            data: {
              scriptCount: 0,
              scriptCountResetAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        let plan: "FREE" | "BASIC" | "PRO" | "AGENCY" = "FREE";
        if (priceId === process.env.STRIPE_BASIC_PRICE_ID) plan = "BASIC";
        else if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = "PRO";
        else if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) plan = "AGENCY";
        else plan = priceIdToPlan(priceId);
        await prisma.workspace.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { plan },
        });
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const ws = await prisma.workspace.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (ws) {
          await prisma.$transaction([
            prisma.workspace.update({
              where: { id: ws.id },
              data: { plan: "FREE", stripeSubscriptionId: null },
            }),
            prisma.workspaceMember.deleteMany({
              where: { workspaceId: ws.id, role: "MEMBER" },
            }),
          ]);
        }
        break;
      }
    }
  } catch (err) {
    console.error("Stripe webhook handler error", err);
  }

  return NextResponse.json({ received: true });
}
