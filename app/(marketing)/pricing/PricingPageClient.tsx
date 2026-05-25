"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowRight, ShieldCheck, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PricingSlider, type PlanId } from "@/components/marketing/PricingSlider";
import { EnterpriseContactForm } from "@/components/marketing/EnterpriseContactForm";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";
import { PlanCTA } from "@/components/marketing/PlanCTA";

type BillingPeriod = "monthly" | "annual";

type PlanCard = {
  id: PlanId;
  label: string;
  monthlyPrice: number | null;
  accentClass: string;
  ringClass: string;
  tagline: string;
  scripts: string;
  features: string[];
  popular?: boolean;
};

const PLANS: PlanCard[] = [
  {
    id: "FREE",
    label: "Free",
    monthlyPrice: null,
    accentClass: "text-text-primary dark:text-dark-text",
    ringClass: "",
    tagline: "Try risk-free",
    scripts: "5 scripts / month",
    features: [
      "5 scripts / month",
      "1 client profile",
      "All 5 platforms",
      "Standard quality model",
      "Script library",
    ],
  },
  {
    id: "BASIC",
    label: "Basic",
    monthlyPrice: 5,
    accentClass: "text-primary",
    ringClass: "ring-primary/20",
    tagline: "Solo freelancers",
    scripts: "25 scripts / month",
    features: [
      "25 scripts / month",
      "3 client profiles",
      "All 5 platforms",
      "All quality models",
      "Script library",
    ],
  },
  {
    id: "PRO",
    label: "Pro",
    monthlyPrice: 19,
    accentClass: "text-primary",
    ringClass: "ring-primary/40",
    tagline: "Growing freelancers",
    scripts: "100 scripts / month",
    features: [
      "100 scripts / month",
      "10 client profiles",
      "Everything in Basic",
      "Content pipeline",
      "Calendar view",
      "PDF export",
      "Titles & hashtag extras",
    ],
    popular: true,
  },
  {
    id: "AGENCY",
    label: "Agency",
    monthlyPrice: 49,
    accentClass: "text-primary",
    ringClass: "ring-primary/20",
    tagline: "Agencies & teams",
    scripts: "350 scripts / month",
    features: [
      "350 scripts / month",
      "Unlimited clients",
      "Everything in Pro",
      "3 team members",
      "Bulk generation",
      "Priority support",
    ],
  },
];

type CellValue = string | boolean;

const TABLE_ROWS: { label: string; values: CellValue[] }[] = [
  { label: "Scripts per month", values: ["5", "25", "100", "350"] },
  { label: "Client profiles", values: ["1", "3", "10", "Unlimited"] },
  { label: "Platforms supported", values: ["All 5", "All 5", "All 5", "All 5"] },
  { label: "Quality models", values: ["Standard", "All", "All", "All"] },
  { label: "Script library", values: [true, true, true, true] },
  { label: "Content pipeline", values: [false, false, true, true] },
  { label: "Calendar view", values: [false, false, true, true] },
  { label: "PDF export", values: [false, false, true, true] },
  { label: "Titles & hashtags", values: [false, false, true, true] },
  { label: "Team members", values: ["—", "—", "—", "3"] },
  { label: "Bulk generation", values: [false, false, false, true] },
  { label: "Priority support", values: [false, false, false, true] },
];

function annualPrice(monthly: number) {
  return Math.round(monthly * 10);
}

export function PricingPageClient({
  userPlan,
  hasSubscription,
}: {
  userPlan: PlanId | null;
  hasSubscription: boolean;
}) {
  const [activePlan, setActivePlan] = useState<PlanId>("PRO");
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-text-secondary dark:text-dark-muted mb-5 shadow-sm">
          <Sparkles size={11} className="text-primary" />
          Launch pricing — lock in your rate early
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Simple pricing that scales with you
        </h1>
        <p className="text-sm md:text-base text-text-secondary dark:text-dark-muted mt-3 max-w-xl mx-auto">
          Start free. Upgrade when your client list grows. No per-seat surprises.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 mt-7 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              billing === "monthly"
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
              billing === "annual"
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text"
            }`}
          >
            Annual
            <span
              className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 transition-colors ${
                billing === "annual"
                  ? "bg-white/20 text-white"
                  : "bg-[var(--color-primary-tint)] text-primary"
              }`}
            >
              2 months free
            </span>
          </button>
        </div>

        {/* Trust chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-text-secondary dark:text-dark-muted">
          <span className="inline-flex items-center gap-1.5">
            <Zap size={11} className="text-primary" /> Free plan, forever
          </span>
          <span className="text-[var(--color-border)]">·</span>
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw size={11} className="text-primary" /> 7-day money-back guarantee
          </span>
          <span className="text-[var(--color-border)]">·</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={11} className="text-primary" /> Cancel anytime
          </span>
        </div>
      </section>

      {/* ── SLIDER ── */}
      <section className="max-w-4xl mx-auto px-5 pb-8">
        <PricingSlider value={activePlan} onPlanChange={setActivePlan} />
      </section>

      {/* ── PLAN CARDS ── */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p) => {
            const isActive = p.id === activePlan;
            const displayPrice =
              p.monthlyPrice === null
                ? null
                : billing === "annual"
                ? annualPrice(p.monthlyPrice)
                : p.monthlyPrice;

            return (
              <div key={p.id} className="relative flex flex-col">
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide text-white bg-primary shadow-sm">
                      Most popular
                    </span>
                  </div>
                )}

                <div
                  className={`flex-1 rounded-xl p-6 flex flex-col transition-all duration-200 border ${
                    p.popular ? "bg-[var(--color-primary-tint)]" : "bg-[var(--color-surface)]"
                  } ${
                    isActive
                      ? `border-primary ring-2 ${p.ringClass || "ring-primary/20"} scale-[1.02] shadow-[0_16px_50px_rgba(127,119,221,0.18)]`
                      : p.popular
                      ? "border-primary/40 hover:shadow-sm"
                      : "border-[var(--color-border)] opacity-80 hover:opacity-100 hover:shadow-sm"
                  }`}
                >
                  {/* Plan header */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-secondary dark:text-dark-muted uppercase tracking-wide">
                        {p.tagline}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text">{p.label}</h2>

                    <div className="mt-3 flex items-baseline gap-1">
                      {displayPrice === null ? (
                        <>
                          <span className={`text-4xl font-bold ${p.accentClass}`}>£0</span>
                          <span className="text-xs text-text-secondary dark:text-dark-muted">forever</span>
                        </>
                      ) : (
                        <>
                          <span className={`text-4xl font-bold ${p.accentClass}`}>£{displayPrice}</span>
                          <span className="text-xs text-text-secondary dark:text-dark-muted">
                            {billing === "annual" ? "/yr" : "/mo"}
                          </span>
                        </>
                      )}
                    </div>
                    {billing === "annual" && p.monthlyPrice !== null && (
                      <p className="text-[11px] text-primary mt-1">
                        Save £{p.monthlyPrice * 2} vs monthly
                      </p>
                    )}

                    <div className="mt-2 text-xs font-medium text-text-secondary dark:text-dark-muted">
                      {p.scripts}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-text-primary dark:text-dark-text">
                        <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <PlanCTA
                    cardPlan={p.id}
                    userPlan={userPlan}
                    hasSubscription={hasSubscription}
                    isActive={isActive}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <h2 className="text-xl font-semibold text-center mb-8 text-text-primary dark:text-dark-text">
          Full feature comparison
        </h2>

        <div className="overflow-x-auto rounded-xl border-hair border-[var(--color-border)]">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[var(--color-surface)] border-b-hair border-[var(--color-border)]">
                <th className="text-left px-5 py-3 font-medium text-text-secondary dark:text-dark-muted w-[36%]">
                  Feature
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} className={`text-center px-3 py-3 font-semibold text-text-primary dark:text-dark-text ${p.popular ? "text-primary" : ""}`}>
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b-hair border-[var(--color-border)] last:border-0 ${
                    i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-bg)]"
                  }`}
                >
                  <td className="px-5 py-3 text-text-primary dark:text-dark-text">{row.label}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="text-center px-3 py-3">
                      {typeof v === "boolean" ? (
                        v ? (
                          <Check size={15} className="mx-auto text-primary" />
                        ) : (
                          <X size={14} className="mx-auto text-[var(--color-border)]" />
                        )
                      ) : (
                        <span className="text-text-primary dark:text-dark-text">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── ENTERPRISE ── */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="rounded-2xl border-hair border-[var(--color-border)] p-8 md:p-10 bg-gradient-to-br from-primary/[0.07] to-primary/[0.02]">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary dark:text-dark-text">
              Need more than 350 scripts a month?
            </h2>
            <p className="text-sm md:text-base text-text-secondary dark:text-dark-muted mt-2">
              We offer custom Enterprise plans for larger agencies and teams with higher volume, extra team seats, and dedicated support. Tell us what you need and we&apos;ll get back to you within one business day.
            </p>
          </div>
          <EnterpriseContactForm />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-5 pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 text-text-primary dark:text-dark-text">
          Frequently asked questions
        </h2>
        <PricingFAQ />

        <div className="mt-10 text-center">
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">Still have questions?</p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.28)]">
              Start free — no card required <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
