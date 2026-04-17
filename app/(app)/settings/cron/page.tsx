import Link from "next/link";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { canAccessPipeline } from "@/lib/planLimits";
import { Card } from "@/components/ui/Card";
import { CronScheduleList } from "./CronScheduleList";

export default async function CronSettingsPage() {
  const { workspace } = await ensureUser();

  if (!canAccessPipeline(workspace.plan)) {
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Auto-generate</h1>
        <Card>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-3">
            Auto-generate (cron scheduling) is available on PRO, AGENCY, and ENTERPRISE plans.
          </p>
          <Link href="/settings/billing" className="text-primary hover:underline text-sm">
            Upgrade your plan to unlock this feature →
          </Link>
        </Card>
      </div>
    );
  }

  const schedules = await prisma.cronSchedule.findMany({
    where: { workspaceId: workspace.id },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Auto-generate</h1>
        <Link
          href="/settings/cron/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
        >
          + Add schedule
        </Link>
      </div>

      <p className="text-sm text-text-secondary dark:text-dark-muted">
        Cron schedules automatically generate scripts for your clients. Each auto-generated script costs 2 credits.
      </p>

      {schedules.length === 0 ? (
        <Card>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center py-4">
            No schedules yet. Add one to get started.
          </p>
        </Card>
      ) : (
        <CronScheduleList schedules={schedules} />
      )}
    </div>
  );
}
