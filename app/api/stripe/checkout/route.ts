import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

const bodySchema = z.object({
  plan: z.enum(["PRO", "AGENCY"]),
});

export async function POST(req: NextRequest) {
  try {
    const { user, workspace, role } = await ensureUser();
    requireOwner(role);

    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) throw new ValidationError("Invalid plan");

    const priceId =
      parsed.data.plan === "PRO"
        ? process.env.STRIPE_PRO_PRICE_ID
        : process.env.STRIPE_AGENCY_PRICE_ID;

    if (!priceId) throw new ValidationError("Stripe price not configured");

    let customerId = workspace.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: workspace.name,
        metadata: { workspaceId: workspace.id, userId: user.id },
      });
      customerId = customer.id;
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: workspace.id,
      metadata: { workspaceId: workspace.id },
      success_url: `${appUrl}/settings/billing?success=1`,
      cancel_url: `${appUrl}/settings/billing?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return errorResponse(err);
  }
}
