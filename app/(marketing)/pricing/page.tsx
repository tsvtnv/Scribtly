import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PricingPageClient } from "./PricingPageClient";
import type { PlanId } from "@/components/marketing/PricingSlider";

export default async function PricingPage() {
  const { session } = await getSession();

  let userPlan: PlanId | null = null;
  let hasSubscription = false;

  if (session) {
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId: session.userId },
      include: { workspace: true },
      orderBy: { workspace: { createdAt: "asc" } },
    });

    if (membership) {
      const plan = membership.workspace.plan;
      if (plan === "FREE" || plan === "BASIC" || plan === "PRO" || plan === "AGENCY") {
        userPlan = plan;
      }
      hasSubscription = !!membership.workspace.stripeSubscriptionId;
    }
  }

  return <PricingPageClient userPlan={userPlan} hasSubscription={hasSubscription} />;
}
