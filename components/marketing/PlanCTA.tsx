"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { getPlanCtaAction } from "@/lib/planCtaLogic";
import type { PlanId } from "@/components/marketing/PricingSlider";

export function PlanCTA({
  cardPlan,
  userPlan,
  hasSubscription,
  isActive,
}: {
  cardPlan: PlanId;
  userPlan: PlanId | null;
  hasSubscription: boolean;
  isActive: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const action = getPlanCtaAction({ cardPlan, userPlan, hasSubscription });

  if (action.type === "signup") {
    return (
      <Link href={action.href}>
        <Button fullWidth variant={isActive ? "primary" : "outline"} size="sm">
          {cardPlan === "FREE" ? "Start free" : `Start ${cardPlan.charAt(0) + cardPlan.slice(1).toLowerCase()}`}
        </Button>
      </Link>
    );
  }

  if (action.type === "current") {
    return (
      <Button fullWidth variant="outline" size="sm" disabled>
        Current plan
      </Button>
    );
  }

  async function handleCheckout() {
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: cardPlan }),
      });
      const body = await res.json();
      if (!res.ok || !body.url) {
        toast.push(body.error || "Checkout failed", "error");
        return;
      }
      window.location.href = body.url;
    } catch {
      toast.push("Network error — please try again", "error");
    } finally {
      setBusy(false);
    }
  }

  async function handlePortal() {
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const body = await res.json();
      if (!res.ok || !body.url) {
        toast.push(body.error || "Could not open billing portal", "error");
        return;
      }
      window.location.href = body.url;
    } catch {
      toast.push("Network error — please try again", "error");
    } finally {
      setBusy(false);
    }
  }

  const { label } = action;
  const handler = action.type === "checkout" ? handleCheckout : handlePortal;

  return (
    <Button
      fullWidth
      variant={isActive ? "primary" : "outline"}
      size="sm"
      disabled={busy}
      onClick={handler}
    >
      {busy ? "Loading…" : label}
    </Button>
  );
}
