import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function POST() {
  try {
    const { workspace, role } = await ensureUser();
    requireOwner(role);
    if (!workspace.stripeCustomerId) throw new ValidationError("No Stripe customer for this workspace");

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: workspace.stripeCustomerId,
      return_url: `${appUrl}/settings/billing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return errorResponse(err);
  }
}
