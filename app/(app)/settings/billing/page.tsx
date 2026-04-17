import { redirect } from "next/navigation";
import { ensureUser } from "@/lib/ensureUser";
import { BillingPageClient } from "./BillingPageClient";

export default async function BillingPage({ searchParams }: { searchParams: { success?: string; canceled?: string } }) {
  const { workspace, role } = await ensureUser();
  if (role !== "OWNER") redirect("/settings");

  return (
    <BillingPageClient
      plan={workspace.plan}
      scriptCount={workspace.scriptCount}
      scriptCountResetAt={workspace.scriptCountResetAt}
      hasSubscription={!!workspace.stripeSubscriptionId}
      success={searchParams.success === "1"}
      canceled={searchParams.canceled === "1"}
    />
  );
}
