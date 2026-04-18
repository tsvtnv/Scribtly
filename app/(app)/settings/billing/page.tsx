import { redirect } from "next/navigation";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { BillingPageClient } from "./BillingPageClient";

export default async function BillingPage({ searchParams }: { searchParams: { success?: string; canceled?: string } }) {
  const { user, workspace, role } = await ensureUser();
  if (role !== "OWNER") redirect("/settings");

  const betaData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isBetaTester: true, betaExpiresAt: true },
  });
  const betaActive =
    (betaData?.isBetaTester ?? false) &&
    betaData?.betaExpiresAt != null &&
    betaData.betaExpiresAt > new Date();

  return (
    <BillingPageClient
      plan={workspace.plan}
      scriptCount={workspace.scriptCount}
      scriptCountResetAt={workspace.scriptCountResetAt}
      hasSubscription={!!workspace.stripeSubscriptionId}
      success={searchParams.success === "1"}
      canceled={searchParams.canceled === "1"}
      betaActive={betaActive}
      betaExpiresAt={betaData?.betaExpiresAt?.toISOString() ?? null}
    />
  );
}
