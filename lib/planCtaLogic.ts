import type { PlanId } from "@/components/marketing/PricingSlider";

const PLAN_ORDER: Record<PlanId, number> = {
  FREE: 0,
  BASIC: 1,
  PRO: 2,
  AGENCY: 3,
};

const PLAN_LABELS: Record<PlanId, string> = {
  FREE: "Free",
  BASIC: "Basic",
  PRO: "Pro",
  AGENCY: "Agency",
};

export type PlanCtaAction =
  | { type: "signup"; href: string }
  | { type: "current" }
  | { type: "checkout"; label: string }
  | { type: "portal"; label: string };

export function getPlanCtaAction({
  cardPlan,
  userPlan,
  hasSubscription,
}: {
  cardPlan: PlanId;
  userPlan: PlanId | null;
  hasSubscription: boolean;
}): PlanCtaAction {
  if (!userPlan) {
    return {
      type: "signup",
      href: cardPlan === "FREE" ? "/signup" : `/signup?plan=${cardPlan}`,
    };
  }

  if (cardPlan === userPlan) return { type: "current" };

  if (!hasSubscription && cardPlan !== "FREE") {
    return { type: "checkout", label: `Upgrade to ${PLAN_LABELS[cardPlan]}` };
  }

  const isUpgrade = PLAN_ORDER[cardPlan] > PLAN_ORDER[userPlan];
  return {
    type: "portal",
    label: `${isUpgrade ? "Upgrade" : "Downgrade"} to ${PLAN_LABELS[cardPlan]}`,
  };
}
