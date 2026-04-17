import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Pricing — ScriptFast",
  description: "Simple pricing for freelancers. Start free, upgrade when you're ready.",
};

const plans = [
  {
    id: "FREE",
    label: "Free",
    price: "£0",
    period: "forever",
    features: ["3 scripts per month", "1 client profile", "YouTube only", "Script library"],
    cta: { text: "Start free", href: "/signup" },
  },
  {
    id: "PRO",
    label: "Pro",
    price: "£29",
    period: "/month",
    features: ["Unlimited scripts", "Unlimited clients", "All 5 platforms", "All extras (titles, hashtags)", "PDF export"],
    cta: { text: "Start Pro", href: "/signup" },
    highlight: true,
  },
  {
    id: "AGENCY",
    label: "Agency",
    price: "£79",
    period: "/month",
    features: ["Everything in Pro", "5 team members", "Bulk generation", "Priority support"],
    cta: { text: "Start Agency", href: "/signup" },
  },
];

const faq = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your settings page, no questions asked. You keep access until the end of your billing period." },
  { q: "What counts as a script?", a: "Each generation counts as one script. Editing a saved script does not count." },
  { q: "Do you offer refunds?", a: "Yes — if you're not happy in your first 7 days, email us for a full refund." },
  { q: "Can I add team members?", a: "On the Agency plan you can invite up to 5 team members who share your client profiles and script library." },
];

export default function PricingPage() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Simple pricing for freelancers</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-3">
          Start free. Upgrade only when you need to.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <Card key={p.id} className={p.highlight ? "border-primary/40 bg-primary/5" : undefined}>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-lg font-semibold">{p.label}</h2>
              <div>
                <span className="text-2xl font-bold">{p.price}</span>
                <span className="text-xs text-text-secondary">{p.period}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check size={14} className="text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link href={p.cta.href}>
              <Button fullWidth variant={p.highlight ? "primary" : "secondary"}>{p.cta.text}</Button>
            </Link>
          </Card>
        ))}
      </section>

      <section className="max-w-2xl mx-auto px-5 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-6">FAQ</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="border-hair border-[var(--color-border)] rounded-md bg-[var(--color-surface)]">
              <summary className="px-4 py-3 cursor-pointer font-medium text-sm">{f.q}</summary>
              <p className="px-4 pb-3 text-sm text-text-secondary dark:text-dark-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
