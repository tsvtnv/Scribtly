import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureUser } from "@/lib/ensureUser";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const { session } = await getSession();
  if (!session) redirect("/login");

  const { user, workspace } = await ensureUser();

  if (workspace.onboardingCompleted) redirect("/dashboard");

  return (
    <OnboardingWizard
      initialStep={workspace.onboardingStep}
      workspaceName={workspace.name}
      userName={user.name ?? null}
    />
  );
}
