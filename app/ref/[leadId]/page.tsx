import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCopyForServices } from "@/lib/referral-copy";
import { RefLandingClient } from "./RefLandingClient";

interface Props {
  params: { leadId: string };
}

export default async function RefLandingPage({ params }: Props) {
  const lead = await prisma.referralLead.findUnique({
    where: { leadId: params.leadId },
    select: { leadId: true, agencyName: true, agencyServices: true, isBetaOffer: true },
  });

  if (!lead) redirect("/");

  const copy = getCopyForServices(lead.agencyServices ?? "");

  return (
    <RefLandingClient
      leadId={lead.leadId}
      agencyName={lead.agencyName}
      tagline={copy.tagline}
      painPoints={copy.painPoints}
      solutions={copy.solutions}
      isBetaOffer={lead.isBetaOffer}
    />
  );
}
