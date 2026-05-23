import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const PLAN_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 5,
  PRO: 19,
  AGENCY: 49,
  ENTERPRISE: 0,
};

const PLAN_COLOR: Record<string, string> = {
  FREE: "bg-gray-400",
  BASIC: "bg-blue-400",
  PRO: "bg-violet-500",
  AGENCY: "bg-amber-500",
  ENTERPRISE: "bg-emerald-500",
};

const PLAN_BADGE: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  BASIC: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PRO: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  AGENCY: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
  ENTERPRISE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function trend(current: number, previous: number) {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const abs = Math.abs(pct).toFixed(1);
  if (pct > 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <TrendingUp size={11} />+{abs}%
      </span>
    );
  if (pct < 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-rose-500 dark:text-rose-400">
        <TrendingDown size={11} />-{abs}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-text-secondary">
      <Minus size={11} />0%
    </span>
  );
}

function StatCard({
  label,
  value,
  sub,
  trend: trendPct,
  trendLabel,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: number | null;
  trendLabel?: string;
  accent?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 overflow-hidden`}
    >
      {accent && (
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 ${accent}`}
        />
      )}
      <div className="text-xs font-medium uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-2">
        {label}
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {trendPct !== undefined && <TrendBadge pct={trendPct ?? null} />}
        {(sub || trendLabel) && (
          <span className="text-xs text-text-secondary">{trendLabel || sub}</span>
        )}
      </div>
      {sub && trendPct !== undefined && (
        <div className="text-xs text-text-secondary mt-0.5">{sub}</div>
      )}
    </div>
  );
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thirtyDaysAgo = new Date(todayStart);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixtyDaysAgo = new Date(todayStart);
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const [
    workspaces,
    totalScripts,
    scriptsToday,
    scriptsThisWeek,
    scriptsThisMonth,
    scriptsPrevMonth,
    newWorkspacesToday,
    newWorkspacesThisWeek,
    newWorkspacesThisMonth,
    newWorkspacesPrevMonth,
    activeWorkspacesLast30,
    activeWorkspacesPrev30,
    totalBlogPosts,
    recentWorkspaces,
  ] = await Promise.all([
    prisma.workspace.findMany({ select: { plan: true, stripeSubscriptionId: true, createdAt: true } }),
    prisma.script.count(),
    prisma.script.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.script.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.script.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.script.count({ where: { createdAt: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.workspace.count({ where: { createdAt: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.workspace.count({ where: { scripts: { some: { createdAt: { gte: thirtyDaysAgo } } } } }),
    prisma.workspace.count({ where: { scripts: { some: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } } } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.workspace.findMany({
      select: {
        id: true,
        name: true,
        plan: true,
        createdAt: true,
        owner: { select: { email: true } },
        stripeSubscriptionId: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const planCounts: Record<string, number> = { FREE: 0, BASIC: 0, PRO: 0, AGENCY: 0, ENTERPRISE: 0 };
  let mrr = 0;
  let prevMrr = 0;
  for (const ws of workspaces) {
    planCounts[ws.plan] = (planCounts[ws.plan] ?? 0) + 1;
    if (ws.stripeSubscriptionId) {
      mrr += PLAN_PRICE[ws.plan] ?? 0;
      const inPrevMonth = ws.createdAt < monthStart;
      if (inPrevMonth) prevMrr += PLAN_PRICE[ws.plan] ?? 0;
    }
  }

  const totalWorkspaces = workspaces.length;
  const paying = workspaces.filter((w) => w.stripeSubscriptionId).length;
  const avgScripts = totalWorkspaces > 0 ? (totalScripts / totalWorkspaces).toFixed(1) : "0";
  const convRate = totalWorkspaces ? ((paying / totalWorkspaces) * 100).toFixed(1) : "0";

  const mrrTrend = trend(mrr, prevMrr);
  const workspaceTrend = trend(newWorkspacesThisMonth, newWorkspacesPrevMonth);
  const scriptTrend = trend(scriptsThisMonth, scriptsPrevMonth);
  const activeTrend = trend(activeWorkspacesLast30, activeWorkspacesPrev30);

  const planOrder = ["FREE", "BASIC", "PRO", "AGENCY", "ENTERPRISE"] as const;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-text-secondary mt-0.5">Platform health at a glance</p>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          label="Est. MRR"
          value={`£${mrr.toLocaleString()}`}
          sub={`${paying} paying workspaces`}
          trend={mrrTrend}
          trendLabel="vs last month"
          accent="bg-gradient-to-r from-emerald-400 to-teal-500"
        />
        <StatCard
          label="Workspaces"
          value={totalWorkspaces.toLocaleString()}
          sub={`+${newWorkspacesToday} today · +${newWorkspacesThisWeek} this week`}
          trend={workspaceTrend}
          trendLabel="vs last month"
          accent="bg-gradient-to-r from-blue-400 to-blue-500"
        />
        <StatCard
          label="Conversion"
          value={`${convRate}%`}
          sub="free → paid"
          accent="bg-gradient-to-r from-violet-400 to-purple-500"
        />
        <StatCard
          label="Total Scripts"
          value={totalScripts.toLocaleString()}
          sub={`${scriptsToday} today · ${scriptsThisWeek} this week`}
          trend={scriptTrend}
          trendLabel="vs last month"
          accent="bg-gradient-to-r from-amber-400 to-orange-400"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active (30d)"
          value={activeWorkspacesLast30.toLocaleString()}
          sub="workspaces with scripts"
          trend={activeTrend}
          trendLabel="vs prior 30d"
        />
        <StatCard
          label="Scripts this month"
          value={scriptsThisMonth.toLocaleString()}
          sub={`${scriptsPrevMonth} last month`}
        />
        <StatCard
          label="Avg scripts / workspace"
          value={avgScripts}
          sub="all time"
        />
        <StatCard
          label="Blog posts"
          value={totalBlogPosts.toLocaleString()}
          sub="published"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Plan breakdown */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-sm font-semibold mb-5">Plan breakdown</h2>
          <div className="space-y-3">
            {planOrder.map((plan) => {
              const count = planCounts[plan] ?? 0;
              const pct = totalWorkspaces > 0 ? (count / totalWorkspaces) * 100 : 0;
              const rev = PLAN_PRICE[plan] > 0 ? planCounts[plan] * PLAN_PRICE[plan] : null;
              return (
                <div key={plan}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${PLAN_BADGE[plan]}`}
                      >
                        {plan}
                      </span>
                      <span className="text-sm font-semibold">{count}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      {rev != null && <span>£{rev.toLocaleString()}/mo</span>}
                      <span>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${PLAN_COLOR[plan]} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent signups */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-sm font-semibold mb-5">Recent signups</h2>
          <div className="space-y-1">
            {recentWorkspaces.map((ws) => {
              const daysAgo = Math.floor(
                (now.getTime() - ws.createdAt.getTime()) / (1000 * 60 * 60 * 24)
              );
              const timeLabel =
                daysAgo === 0
                  ? "today"
                  : daysAgo === 1
                  ? "yesterday"
                  : `${daysAgo}d ago`;
              return (
                <a
                  key={ws.id}
                  href={`/admin/users/${ws.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-primary-tint)] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center text-xs font-semibold text-[var(--color-primary)] shrink-0">
                    {ws.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate group-hover:text-[var(--color-primary)]">
                      {ws.name}
                    </div>
                    <div className="text-xs text-text-secondary truncate">{ws.owner.email}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded font-medium ${PLAN_BADGE[ws.plan]}`}
                    >
                      {ws.plan}
                    </span>
                    <span className="text-xs text-text-secondary">{timeLabel}</span>
                  </div>
                </a>
              );
            })}
            {recentWorkspaces.length === 0 && (
              <p className="text-sm text-text-secondary text-center py-4">No signups yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
