import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CampaignOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const { id } = await params;

  const [campaign, leads, contacted, accepted, replied, recentEvents] = await Promise.all([
    prisma.campaign.findFirst({
      where: { id, workspaceId: user.workspaceId },
      include: { linkedInAccount: { select: { name: true, connSentToday: true, dailyConnLimit: true } } },
    }),
    prisma.lead.count({ where: { campaignId: id } }),
    prisma.lead.count({ where: { campaignId: id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
    prisma.lead.count({ where: { campaignId: id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
    prisma.lead.count({ where: { campaignId: id, status: "REPLIED" } }),
    prisma.event.findMany({ where: { campaignId: id }, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  if (!campaign) redirect("/campaigns");

  const todaySent = campaign.linkedInAccount.connSentToday;
  const todayLimit = campaign.linkedInAccount.dailyConnLimit;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "TYPE", value: campaign.type.replace("_", " ") },
            { label: "ACCOUNT", value: campaign.linkedInAccount.name },
            { label: "CREATED", value: new Date(campaign.createdAt).toLocaleDateString("en-GB") },
            { label: "STATUS", value: campaign.status },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Leads", value: leads },
              { label: "Contacted", value: contacted },
              { label: "Accepted", value: accepted },
              { label: "Replied", value: replied },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>TODAY</p>
          <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {todaySent} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {todayLimit}</span>
          </p>
          <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
            <div className="h-1.5 rounded-full"
              style={{ width: `${Math.min((todaySent / todayLimit) * 100, 100)}%`, background: "var(--accent)" }} />
          </div>
        </div>
        <Link href={`/campaigns/${id}/leads`}
          className="block text-center text-sm py-2 rounded-lg border transition-colors hover:bg-gray-50"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Manage Leads
        </Link>
      </div>

      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Activity</p>
        {recentEvents.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet. Import leads to get started.</p>
        ) : (
          <ul className="space-y-3">
            {recentEvents.map((ev: { id: string; type: string; createdAt: Date | string }) => (
              <li key={ev.id} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "var(--accent)" }} />
                <div>
                  <p style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ").toLowerCase()}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(ev.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Campaign Settings</p>
        {[
          { label: "Approval", value: campaign.requireApproval ? "Required" : "Auto-send" },
          { label: "Follow-ups", value: campaign.followUpsEnabled ? `${campaign.followUpCount}x after ${campaign.followUpDelayDays}d` : "Disabled" },
          { label: "Auto Book", value: campaign.autoBookEnabled ? "Enabled" : "Disabled" },
        ].map(s => (
          <div key={s.label} className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
            <span style={{ color: "var(--text-primary)" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
