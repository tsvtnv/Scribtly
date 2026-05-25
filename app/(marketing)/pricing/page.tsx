import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PricingPageClient } from "./PricingPageClient";
import type { PlanId } from "@/components/marketing/PricingSlider";

export default async function PricingPage() {
  const { session } = await getSession();

  let userPlan: PlanId | null = null;
  let hasSubscription = false;

  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { defaultWorkspaceId: true },
    });

    if (user?.defaultWorkspaceId) {
      const workspace = await prisma.workspace.findUnique({
        where: { id: user.defaultWorkspaceId },
        select: { plan: true, stripeSubscriptionId: true },
      });

      if (workspace) {
        const plan = workspace.plan;
        if (plan === "FREE" || plan === "BASIC" || plan === "PRO" || plan === "AGENCY") {
          userPlan = plan;
        }
        hasSubscription = !!workspace.stripeSubscriptionId;
      }
    }
  }

  return <PricingPageClient userPlan={userPlan} hasSubscription={hasSubscription} />;
}
