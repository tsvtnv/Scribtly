import Link from "next/link";
import { Sparkles, Plus } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ClientCard } from "@/components/client/ClientCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { PlatformBadge, StatusBadge } from "@/components/ui/Badge";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import { relativeDate } from "@/lib/utils";
import { getRemainingScripts, getScriptLimit } from "@/lib/planLimits";
import { OnboardingBanner } from "@/components/onboarding/OnboardingBanner";
import { OnboardingChecklist } from "@/components/onboarding/OnboardingChecklist";
import { HelpTooltip } from "@/components/ui/HelpTooltip";

export default async function DashboardPage() {
  const { user, workspace } = await ensureUser();

  const betaData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isBetaTester: true, betaExpiresAt: true },
  });
  const betaActive =
    (betaData?.isBetaTester ?? false) &&
    betaData?.betaExpiresAt != null &&
    betaData.betaExpiresAt > new Date();
  const betaExpiresAt = betaData?.betaExpiresAt ?? null;

  const [totalClients, recentScripts, clients, onboardingData] = await Promise.all([
    prisma.client.count({ where: { workspaceId: workspace.id } }),
    prisma.script.findMany({
      where: { workspaceId: workspace.id },
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.client.findMany({
      where: { workspaceId: workspace.id },
      include: { _count: { select: { scripts: true } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.workspace.findUnique({
      where: { id: workspace.id },
      select: {
        onboardingStep: true,
        onboardingCompleted: true,
        firstClientAddedAt: true,
        firstScriptGeneratedAt: true,
        plan: true,
        scriptCount: true,
        scriptCountResetAt: true,
      },
    }),
  ]);

  const firstName = user.name?.split(" ")[0] || user.email.split("@")[0];
  const remaining = getRemainingScripts(workspace);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      {onboardingData && !onboardingData.onboardingCompleted && (
        <OnboardingBanner onboardingStep={onboardingData.onboardingStep} />
      )}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {firstName}</h1>
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)]">
            {workspace.name}
          </span>
          {betaActive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
              🧪 Beta Tester
            </span>
          )}
        </div>
        {betaActive && betaExpiresAt && (
          <p className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
            Beta access until{" "}
            {betaExpiresAt.toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </p>
        )}
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
          Generate your next client script in under 60 seconds.
        </p>
      </div>

      {workspace.plan === "FREE" && workspace.scriptCount >= 2 ? (
        <Card className="bg-primary/5 border-primary/30">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-medium text-sm">You've used {workspace.scriptCount} of {getScriptLimit(workspace.plan)} free scripts.</div>
              <div className="text-xs text-text-secondary dark:text-dark-muted">
                Upgrade to Pro for more scripts and all platforms.
              </div>
            </div>
            <Link href="/settings/billing"><Button size="sm">Upgrade</Button></Link>
          </div>
        </Card>
      ) : null}

      {onboardingData && !onboardingData.onboardingCompleted && (
        <OnboardingChecklist
          initialCompleted={[
            { id: 1, key: "add_client", completed: onboardingData.firstClientAddedAt !== null },
            { id: 2, key: "generate_script", completed: onboardingData.firstScriptGeneratedAt !== null },
            { id: 3, key: "explore_library", completed: onboardingData.onboardingStep >= 3 },
            { id: 4, key: "invite_or_upgrade", completed: onboardingData.plan !== "FREE" },
          ]}
          initialOnboardingCompleted={onboardingData.onboardingCompleted}
        />
      )}

      {(() => {
        const limit = getScriptLimit(workspace.plan);
        const used = workspace.scriptCount;
        const resetDate = workspace.scriptCountResetAt.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
        if (limit !== Infinity && used / limit >= 0.8) {
          return (
            <div className="rounded-md border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-sm text-amber-800 dark:text-amber-300">
                You've used <strong>{used}</strong> of <strong>{limit}</strong> scripts this month — resets {resetDate}.
              </span>
              <Link href="/pricing" className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline flex-shrink-0">
                Upgrade for more →
              </Link>
            </div>
          );
        }
        return null;
      })()}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-1">
            Scripts this period
            <HelpTooltip text="Total scripts generated in your current billing period. This counter resets on your monthly renewal date." position="bottom" />
          </div>
          <div className="text-3xl font-semibold">{workspace.scriptCount}</div>
          <div className="mt-3">
            <UsageMeter plan={workspace.plan} scriptCount={workspace.scriptCount} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-1">
            Clients
            <HelpTooltip text="Each client profile stores their niche, tone of voice, and style. Every script you generate will be written to match that client's voice automatically." position="bottom" />
          </div>
          <div className="text-3xl font-semibold">{totalClients}</div>
          <div className="text-xs text-text-secondary dark:text-dark-muted mt-1">
            {workspace.plan === "FREE" ? `of 1 on Free plan` : `On ${workspace.plan}`}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-1">
            Scripts remaining
            <HelpTooltip text="How many more scripts you can generate before your monthly limit resets. Upgrade your plan for a higher limit or unlimited generation." position="bottom" />
          </div>
          <div className="text-3xl font-semibold">{remaining === Infinity ? "∞" : remaining}</div>
          <div className="text-xs text-text-secondary dark:text-dark-muted mt-1">
            {workspace.plan === "FREE" ? "Resets monthly" : "All you need"}
          </div>
        </Card>
      </div>

      <Card className="flex items-center justify-between gap-4 flex-wrap bg-primary/5 border-primary/20">
        <div>
          <div className="font-semibold text-base">Generate a new script</div>
          <div className="text-xs text-text-secondary dark:text-dark-muted mt-1">
            Pick a client and get a script in 60 seconds.
          </div>
        </div>
        <Link href="/generate">
          <Button size="lg">
            <Sparkles size={16} /> Start generating
          </Button>
        </Link>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted flex items-center gap-1.5">
            Recent scripts
            <HelpTooltip text="Your 5 most recently generated scripts. Click any script to view, edit, or export it." position="right" />
          </h2>
          <Link href="/scripts" className="text-xs text-primary hover:underline">View all →</Link>
        </div>
        {recentScripts.length === 0 ? (
          <Card className="text-center text-sm text-text-secondary dark:text-dark-muted">
            No scripts yet. <Link href="/generate" className="text-primary hover:underline">Generate your first.</Link>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentScripts.map((s) => (
              <Link key={s.id} href={`/scripts/${s.id}`} className="block">
                <div className="flex items-center gap-3 p-3 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] hover:border-primary/40 transition-colors">
                  <PlatformBadge platform={s.platform} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{s.title}</div>
                    {s.client ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <ClientAvatar name={s.client.name} color={s.client.avatarColor} size={12} />
                        <span className="text-xs text-text-secondary dark:text-dark-muted truncate">{s.client.name}</span>
                      </div>
                    ) : null}
                  </div>
                  <span className="text-xs text-text-secondary dark:text-dark-muted">{relativeDate(s.createdAt)}</span>
                  <StatusBadge status={s.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted">
            Clients
          </h2>
          <Link href="/clients" className="text-xs text-primary hover:underline">Manage all →</Link>
        </div>
        {clients.length === 0 ? (
          <Card className="text-center py-4 flex flex-col items-center gap-4">
            <p className="text-sm text-text-secondary dark:text-dark-muted">Add your first client to start generating scripts in their voice.</p>
            <Link href="/clients/new"><Button size="sm"><Plus size={14} /> Add client</Button></Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c) => <ClientCard key={c.id} client={c} scriptCount={c._count.scripts} />)}
          </div>
        )}
      </div>
    </div>
  );
}
