import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { Card } from "@/components/ui/Card";
import { OutreachTable } from "./OutreachTable";

function serializeLead(lead: Awaited<ReturnType<typeof fetchLeads>>[number]) {
  return {
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
    contactedAt: lead.contactedAt?.toISOString() ?? null,
    emailOpenedAt: lead.emailOpenedAt?.toISOString() ?? null,
    emailClickedAt: lead.emailClickedAt?.toISOString() ?? null,
    firstVisitAt: lead.firstVisitAt?.toISOString() ?? null,
    lastVisitAt: lead.lastVisitAt?.toISOString() ?? null,
    signupFormStartedAt: lead.signupFormStartedAt?.toISOString() ?? null,
    signupFormAbandonedAt: lead.signupFormAbandonedAt?.toISOString() ?? null,
    signedUpAt: lead.signedUpAt?.toISOString() ?? null,
    onboardingStartedAt: lead.onboardingStartedAt?.toISOString() ?? null,
    onboardingCompletedAt: lead.onboardingCompletedAt?.toISOString() ?? null,
    optedOutAt: lead.optedOutAt?.toISOString() ?? null,
    events: lead.events.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
    })),
  };
}

async function fetchLeads() {
  return prisma.referralLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { events: { orderBy: { createdAt: "asc" } } },
    take: 500,
  });
}

export type SerializedLead = ReturnType<typeof serializeLead>;

export default async function AdminOutreachPage() {
  await requireAdmin();

  const leads = await fetchLeads();

  const contacted = leads.filter((l) =>
    ["CONTACTED_VIA_FORM", "CONTACTED_VIA_EMAIL"].includes(l.outreachStatus)
  ).length;
  const delivered = leads.filter((l) => l.emailDelivered).length;
  const opened = leads.filter((l) => l.emailOpenedAt !== null).length;
  const visited = leads.filter((l) => l.totalVisits > 0).length;
  const signedUp = leads.filter((l) => l.signedUp).length;
  const convRate = contacted > 0 ? ((signedUp / contacted) * 100).toFixed(1) : "0";

  const serializedLeads = leads.map(serializeLead);

  return (
    <div className="p-6 md:p-10 w-full">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Outreach</h1>
      <p className="text-sm text-text-secondary mb-8">{leads.length} total leads</p>

      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mb-8 w-full">
        {[
          { label: "Total Leads", value: String(leads.length) },
          { label: "Contacted", value: String(contacted) },
          { label: "Email Delivered", value: String(delivered) },
          { label: "Email Opened", value: String(opened) },
          { label: "Visited", value: String(visited) },
          { label: "Signed Up", value: String(signedUp) },
          { label: "Conversion Rate", value: `${convRate}%` },
        ].map(({ label, value }) => (
          <Card key={label}>
            <div className="text-xs uppercase tracking-wider text-text-secondary">{label}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
          </Card>
        ))}
      </div>

      <OutreachTable leads={serializedLeads} />
    </div>
  );
}
