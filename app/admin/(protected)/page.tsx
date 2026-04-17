import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/adminAuth";

const PLAN_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 5,
  PRO: 19,
  AGENCY: 49,
  ENTERPRISE: 0,
};

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-xs text-text-secondary mt-1">{sub}</div>}
    </Card>
  );
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const [
    workspaces,
    totalScripts,
    scriptsToday,
    scriptsThisWeek,
    newWorkspacesToday,
    newWorkspacesThisWeek,
  ] = await Promise.all([
    prisma.workspace.findMany({ select: { plan: true, stripeSubscriptionId: true } }),
    prisma.script.count(),
    prisma.script.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.script.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: weekStart } } }),
  ]);

  const planCounts: Record<string, number> = { FREE: 0, BASIC: 0, PRO: 0, AGENCY: 0, ENTERPRISE: 0 };
  let mrr = 0;
  for (const ws of workspaces) {
    planCounts[ws.plan] = (planCounts[ws.plan] ?? 0) + 1;
    if (ws.stripeSubscriptionId) mrr += PLAN_PRICE[ws.plan] ?? 0;
  }

  const totalWorkspaces = workspaces.length;
  const paying = workspaces.filter((w) => w.stripeSubscriptionId).length;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Overview</h1>
      <p className="text-sm text-text-secondary mb-8">Platform health at a glance</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Est. MRR"
          value={`£${mrr.toLocaleString()}`}
          sub={`${paying} paying`}
        />
        <StatCard
          label="Workspaces"
          value={totalWorkspaces.toString()}
          sub={`+${newWorkspacesToday} today · +${newWorkspacesThisWeek} this week`}
        />
        <StatCard
          label="Total scripts"
          value={totalScripts.toLocaleString()}
          sub={`${scriptsToday} today · ${scriptsThisWeek} this week`}
        />
        <StatCard
          label="Conversion"
          value={totalWorkspaces ? `${((paying / totalWorkspaces) * 100).toFixed(1)}%` : "0%"}
          sub="free → paid"
        />
      </div>

      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-4">Plan breakdown</h2>
        <div className="grid grid-cols-5 gap-3 text-center">
          {(["FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"] as const).map((plan) => (
            <div key={plan} className="space-y-1">
              <div className="text-2xl font-semibold">{planCounts[plan]}</div>
              <div className="text-xs text-text-secondary uppercase tracking-wide">{plan}</div>
              {PLAN_PRICE[plan] > 0 && (
                <div className="text-xs text-text-secondary">
                  £{(planCounts[plan] * PLAN_PRICE[plan]).toLocaleString()}/mo
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
