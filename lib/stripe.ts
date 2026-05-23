import Stripe from "stripe";

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

export const stripe =
  globalForStripe.stripe ??
  new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2024-06-20",
    typescript: true,
  });

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe;

export function priceIdToPlan(priceId: string | null | undefined): "FREE" | "BASIC" | "PRO" | "AGENCY" {
  if (!priceId) return "FREE";
  if (priceId === process.env.STRIPE_BASIC_PRICE_ID) return "BASIC";
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) return "AGENCY";
  return "FREE";
}

export function planToPriceId(plan: "BASIC" | "PRO" | "AGENCY"): string | undefined {
  switch (plan) {
    case "BASIC":
      return process.env.STRIPE_BASIC_PRICE_ID;
    case "PRO":
      return process.env.STRIPE_PRO_PRICE_ID;
    case "AGENCY":
      return process.env.STRIPE_AGENCY_PRICE_ID;
  }
}
