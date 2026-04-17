/**
 * One-time setup script to create Stripe products + prices.
 *
 * Run with: npx tsx scripts/setup-stripe-products.ts
 *
 * Requires STRIPE_SECRET_KEY in .env.local
 * Outputs the price IDs — copy them into .env.local.
 */
import Stripe from "stripe";
import { readFileSync } from "node:fs";

// Minimal .env.local loader (avoids dotenv dependency)
try {
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
} catch {}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });

const PRODUCTS = [
  { key: "BASIC", name: "ScriptFast Basic", amount_gbp: 500, envVar: "STRIPE_BASIC_PRICE_ID" },
  { key: "PRO", name: "ScriptFast Pro", amount_gbp: 1900, envVar: "STRIPE_PRO_PRICE_ID" },
  { key: "AGENCY", name: "ScriptFast Agency", amount_gbp: 4900, envVar: "STRIPE_AGENCY_PRICE_ID" },
];

async function main() {
  console.log("Creating Stripe products + prices...\n");
  const lines: string[] = [];
  for (const p of PRODUCTS) {
    const product = await stripe.products.create({ name: p.name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount_gbp,
      currency: "gbp",
      recurring: { interval: "month" },
    });
    console.log(`  ${p.key.padEnd(8)} product=${product.id}  price=${price.id}`);
    lines.push(`${p.envVar}=${price.id}`);
  }
  console.log("\nAdd to .env.local:\n");
  console.log(lines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
