import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CampaignWizard } from "@/components/campaigns/campaign-wizard";

export default async function NewCampaignPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const accounts = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId, status: "ACTIVE" },
    select: { id: true, name: true, avatarUrl: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>New Campaign</h1>
      <CampaignWizard accounts={accounts} />
    </div>
  );
}
