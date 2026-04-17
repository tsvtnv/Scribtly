"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Plan } from "@prisma/client";
import { PlanCard } from "@/components/billing/PlanCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const FEATURES: Record<Plan, string[]> = {
  FREE: ["3 scripts per month", "1 client profile", "YouTube only", "Script library"],
  PRO: [
    "Unlimited scripts",
    "Unlimited clients",
    "All 5 platforms",
    "All extras (titles, hashtags, etc.)",
    "PDF export",
  ],
  AGENCY: [
    "Everything in Pro",
    "5 team members",
    "Bulk generation",
    "Priority support",
  ],
};

const PRICE: Record<Plan, string> = {
  FREE: "£0",
  PRO: "£29/mo",
  AGENCY: "£79/mo",
};

export function BillingPageClient({
  plan,
  scriptCount,
  hasSubscription,
  success,
  canceled,
}: {
  plan: Plan;
  scriptCount: number;
  hasSubscription: boolean;
  success: boolean;
  canceled: boolean;
}) {
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

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <Link href="/settings" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary">
        <ArrowLeft size={14} /> Back to settings
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-3">Billing</h1>
      <p className="text-sm text-text-secondary dark:text-dark-muted mt-1 mb-6">
        Manage your plan and subscription.
      </p>

      <Card className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted">Current plan</div>
            <div className="text-2xl font-semibold mt-1">{plan}</div>
            <div className="mt-3 w-64">
              <UsageMeter plan={plan} scriptCount={scriptCount} />
            </div>
          </div>
          {hasSubscription ? (
            <Button variant="secondary" onClick={openPortal} loading={busy === "portal"}>
              Manage subscription
            </Button>
          ) : null}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlanCard plan="FREE" price={PRICE.FREE} features={FEATURES.FREE} currentPlan={plan} />
        <PlanCard
          plan="PRO"
          price={PRICE.PRO}
          features={FEATURES.PRO}
          currentPlan={plan}
          onUpgrade={() => upgrade("PRO")}
          busy={busy === "PRO"}
          highlight={plan === "FREE"}
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
  );
}
