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

  const openRate = delivered > 0 ? ((opened / delivered) * 100).toFixed(1) : "0";
  const clickRate = opened > 0 ? ((leads.filter((l) => l.emailClickedAt !== null).length / opened) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Outreach</h1>
        <p className="text-sm text-text-secondary mt-0.5">{leads.length} total leads</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-8 w-full">
        {[
          { label: "Total Leads", value: String(leads.length), accent: true },
          { label: "Contacted", value: String(contacted) },
          { label: "Delivered", value: String(delivered) },
          { label: "Opened", value: String(opened) },
          { label: "Open Rate", value: `${openRate}%` },
          { label: "Clicked", value: `${clickRate}%` },
          { label: "Visited", value: String(visited) },
          { label: "Signed Up", value: String(signedUp) },
          { label: "Conv. Rate", value: `${convRate}%`, accent: true },
        ].map(({ label, value, accent }) => (
          <div
            key={label}
            className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 ${accent ? "ring-1 ring-[var(--color-primary)]/20" : ""}`}
          >
            <div className="text-xs uppercase tracking-wider text-text-secondary mb-1">{label}</div>
            <div className={`text-2xl font-bold ${accent ? "text-[var(--color-primary)]" : ""}`}>{value}</div>
          </div>
        ))}
      </div>

      <OutreachTable leads={serializedLeads} />
    </div>
  );
}
