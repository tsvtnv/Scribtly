"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PricingSlider, type PlanId } from "@/components/marketing/PricingSlider";
import { EnterpriseContactForm } from "@/components/marketing/EnterpriseContactForm";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";

type PlanCard = {
  id: PlanId;
  label: string;
  price: string;
  period: string;
  features: string[];
  cta: { text: string; href: string };
  popular?: boolean;
};

const PLANS: PlanCard[] = [
  {
    id: "FREE",
    label: "Free",
    price: "£0",
    period: "forever",
    features: [
      "5 scripts/month",
      "1 client",
      "Script library",
      "Standard quality model",
      "All platforms",
    ],
    cta: { text: "Start free", href: "/signup" },
  },
  {
    id: "BASIC",
    label: "Basic",
    price: "£5",
    period: "/mo",
    features: [
      "25 scripts/month",
      "3 clients",
      "All quality models",
      "All platforms",
      "Script library",
    ],
    cta: { text: "Start Basic", href: "/signup?plan=BASIC" },
  },
  {
    id: "PRO",
    label: "Pro",
    price: "£19",
    period: "/mo",
    features: [
      "100 scripts/month",
      "10 clients",
      "Everything in Basic",
      "Content pipeline",
      "Calendar view",
      "PDF export",
      "Title and hashtag extras",
    ],
    cta: { text: "Start Pro", href: "/signup?plan=PRO" },
    popular: true,
  },
  {
    id: "AGENCY",
    label: "Agency",
    price: "£49",
    period: "/mo",
    features: [
      "350 scripts/month",
      "Unlimited clients",
      "Everything in Pro",
      "3 team members",
      "Bulk generation",
      "Priority support",
    ],
    cta: { text: "Start Agency", href: "/signup?plan=AGENCY" },
  },
];

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState<PlanId>("BASIC");

  return (
    <>
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-6 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary dark:text-dark-text">
          Simple pricing that scales with you
        </h1>
        <p className="text-sm md:text-base text-text-secondary dark:text-dark-muted mt-3 max-w-2xl mx-auto">
          Choose the plan that matches your script volume. Upgrade anytime.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-10">
        <PricingSlider value={activePlan} onPlanChange={setActivePlan} />
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((p) => {
            const isActive = p.id === activePlan;
            return (
              <div key={p.id} className="relative">
                {p.popular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide text-white"
                      style={{ background: "#7F77DD" }}
                    >
                      Most popular
                    </span>
                  </div>
                ) : null}
                <div
                  className={`h-full rounded-xl p-6 flex flex-col transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-surface)] scale-[1.02]"
                      : "bg-[var(--color-surface)] opacity-70 scale-100 border-hair border-[var(--color-border)]"
                  }`}
                  style={
                    isActive
                      ? { border: "2px solid #7F77DD" }
                      : undefined
                  }
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text">
                      {p.label}
                    </h2>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-text-primary dark:text-dark-text">
                        {p.price}
                      </span>
                      <span className="text-xs text-text-secondary dark:text-dark-muted">
                        {p.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-text-primary dark:text-dark-text"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#7F77DD" }}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={p.cta.href}>
                    <Button
                      fullWidth
                      variant={isActive ? "primary" : "secondary"}
                    >
                      {p.cta.text}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div
          className="rounded-2xl border-hair border-[var(--color-border)] p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(127,119,221,0.08), rgba(127,119,221,0.02))",
          }}
        >
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary dark:text-dark-text">
              Need more than 350 scripts a month?
            </h2>
            <p className="text-sm md:text-base text-text-secondary dark:text-dark-muted mt-2">
              We offer custom Enterprise plans for larger agencies and teams
              with higher volume, extra team seats, and dedicated support. Tell
              us what you need and we&apos;ll get back to you within one business
              day.
            </p>
          </div>
          <EnterpriseContactForm />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-6 text-text-primary dark:text-dark-text">
          Frequently asked questions
        </h2>
        <PricingFAQ />
      </section>
    </>
  );
}
