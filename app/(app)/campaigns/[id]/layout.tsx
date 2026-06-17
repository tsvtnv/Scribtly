import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CampaignTabs } from "@/components/campaigns/campaign-tabs";

export default async function CampaignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const { id } = await params;

  const campaign = await prisma.campaign.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: { linkedInAccount: { select: { name: true } } },
  });
  if (!campaign) redirect("/campaigns");

  return (
    <div>
      <CampaignTabs campaign={campaign} />
      <div className="mt-6">{children}</div>
    </div>
  );
}
