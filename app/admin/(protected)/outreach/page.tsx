import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { Card } from "@/components/ui/Card";
import { OutreachTable } from "./OutreachTable";

export default async function AdminOutreachPage() {
  await requireAdmin();

  const leads = await prisma.referralLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });

  const contacted = leads.filter((l) =>
    ["CONTACTED_VIA_FORM", "CONTACTED_VIA_EMAIL"].includes(l.outreachStatus)
  ).length;
  const delivered = leads.filter((l) => l.emailDelivered).length;
  const opened = leads.filter((l) => l.emailOpenedAt !== null).length;
  const visited = leads.filter((l) => l.totalVisits > 0).length;
  const signedUp = leads.filter((l) => l.signedUp).length;
  const convRate = contacted > 0 ? ((signedUp / contacted) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Outreach</h1>
      <p className="text-sm text-text-secondary mb-8">{leads.length} total leads</p>

      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mb-8">
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

      <OutreachTable leads={leads} />
    </div>
  );
}
