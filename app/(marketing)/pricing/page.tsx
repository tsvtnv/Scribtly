import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PricingPageClient } from "./PricingPageClient";
import type { PlanId } from "@/components/marketing/PricingSlider";

export const metadata: Metadata = {
  title: "Pricing — Plans for freelancers, agencies, and teams",
  description:
    "Scribtly offers flexible plans for solo freelancers through to large agencies. Start free, upgrade when you're ready. No contracts, cancel any time.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
    siteName: "Scribtly",
    title: "Scribtly Pricing — Plans for freelancers and agencies",
    description:
      "Start free and scale as your client roster grows. Flexible plans for solo freelancers through to large agencies.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly pricing plans" }],
  },
};

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
