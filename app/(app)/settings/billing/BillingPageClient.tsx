"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Zap } from "lucide-react";
import type { Plan } from "@prisma/client";
import { PlanCard } from "@/components/billing/PlanCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const FEATURES: Record<Plan, string[]> = {
  FREE: ["5 scripts per month", "1 client", "Standard quality model", "Script library"],
  BASIC: ["25 scripts per month", "3 clients", "All quality models", "All platforms"],
  PRO: [
    "100 scripts per month",
    "10 clients",
    "Content pipeline",
    "Calendar view",
    "PDF export",
    "Title and hashtag extras",
  ],
  AGENCY: [
    "350 scripts per month",
    "Unlimited clients",
    "Everything in Pro",
    "3 team members",
    "Bulk generation",
    "Priority support",
  ],
  ENTERPRISE: [
    "Custom script volume",
    "Unlimited clients",
    "Unlimited team members",
    "Dedicated account manager",
    "SLA + custom onboarding",
  ],
};

const PRICE: Record<Plan, string> = {
  FREE: "£0",
  BASIC: "£5/mo",
  PRO: "£19/mo",
  AGENCY: "£49/mo",
  ENTERPRISE: "Custom",
};

export function BillingPageClient({
  plan,
  scriptCount,
  scriptCountResetAt,
  hasSubscription,
  success,
  canceled,
  betaActive,
  betaExpiresAt,
}: {
  plan: Plan;
  scriptCount: number;
  scriptCountResetAt: Date | string;
  hasSubscription: boolean;
  success: boolean;
  canceled: boolean;
  betaActive: boolean;
  betaExpiresAt: string | null;
}) {
  const resetDate = new Date(scriptCountResetAt).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
  const toast = useToast();
  const [busy, setBusy] = useState<Plan | "portal" | null>(null);

  useEffect(() => {
    if (success) toast.push("Plan updated successfully", "success");
    if (canceled) toast.push("Checkout canceled", "info");
  }, [success, canceled, toast]);

  async function upgrade(target: Plan) {
    if (target === "FREE") return;
    setBusy(target);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: target }),
      });
      const body = await res.json();
      if (!res.ok || !body.url) {
        toast.push(body.error || "Checkout failed", "error");
        return;
      }
      window.location.href = body.url;
    } finally {
      setBusy(null);
    }
  }

  async function openPortal() {
    setBusy("portal");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const body = await res.json();
      if (!res.ok || !body.url) {
        toast.push(body.error || "Could not open billing portal", "error");
        return;
      }
      window.location.href = body.url;
    } finally {
      setBusy(null);
    }
  }

  const displayPlan = betaActive && plan === "FREE" ? "BASIC" : plan;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div>
        <Link href="/settings" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-4">
          <ArrowLeft size={14} /> Back to settings
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
          Manage your plan and subscription.
        </p>
      </div>

      {betaActive && betaExpiresAt && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">🧪</span>
            <div>
              <div className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-0.5">Beta Tester — Free BASIC access</div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Active until{" "}
                <strong>
                  {new Date(betaExpiresAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </strong>
                . After that you&apos;ll move to the Free plan unless you subscribe.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-1">Current plan</div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold">{displayPlan}</span>
              <span className="text-sm text-text-secondary dark:text-dark-muted">{PRICE[plan]}</span>
            </div>
            <div className="max-w-xs mb-1">
              <UsageMeter plan={plan} scriptCount={scriptCount} />
            </div>
            <div className="text-xs text-text-secondary dark:text-dark-muted mb-4">
              Resets {resetDate}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {FEATURES[displayPlan].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-text-secondary dark:text-dark-muted">
                  <Check size={12} className="text-[var(--color-primary)] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {hasSubscription && (
              <Button variant="secondary" onClick={openPortal} loading={busy === "portal"}>
                Manage subscription
              </Button>
            )}
            {(plan === "FREE" || plan === "BASIC") && (
              <Button onClick={() => upgrade("PRO")} loading={busy === "PRO"}>
                <Zap size={14} /> Upgrade to Pro
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
          All plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PlanCard plan="FREE" price={PRICE.FREE} features={FEATURES.FREE} currentPlan={plan} />
          <PlanCard
            plan="BASIC"
            price={PRICE.BASIC}
            features={FEATURES.BASIC}
            currentPlan={betaActive && plan !== "BASIC" ? "BASIC" : plan}
            onUpgrade={betaActive ? undefined : () => upgrade("BASIC")}
            busy={busy === "BASIC"}
          />
          <PlanCard
            plan="PRO"
            price={PRICE.PRO}
            features={FEATURES.PRO}
            currentPlan={plan}
            onUpgrade={() => upgrade("PRO")}
            busy={busy === "PRO"}
            highlight={plan === "FREE" || plan === "BASIC"}
          />
          <PlanCard
            plan="AGENCY"
            price={PRICE.AGENCY}
            features={FEATURES.AGENCY}
            currentPlan={plan}
            onUpgrade={() => upgrade("AGENCY")}
            busy={busy === "AGENCY"}
          />
        </div>
      </div>

      <Card className="border-dashed">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-semibold text-sm mb-0.5">Enterprise</div>
            <p className="text-sm text-text-secondary dark:text-dark-muted">
              Custom volume, unlimited team members, SLA, and dedicated support.
            </p>
          </div>
          <a
            href="mailto:hello@scribtly.com"
            className="text-sm font-medium text-[var(--color-primary)] hover:underline shrink-0"
          >
            Contact us →
          </a>
        </div>
      </Card>
    </div>
  );
}
