import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { canAccessPipeline } from "@/lib/planLimits";
import { redirect } from "next/navigation";
import { NewCronScheduleForm } from "./NewCronScheduleForm";

export default async function NewCronSchedulePage() {
  const { workspace } = await ensureUser();

  if (!canAccessPipeline(workspace.plan)) {
    redirect("/settings/cron");
  }

  const clients = await prisma.client.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true, niche: true, targetAudience: true, primaryPlatform: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6 md:p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">New auto-generate schedule</h1>
      <p className="text-sm text-text-secondary dark:text-dark-muted">
        Each auto-generated script costs 2 credits. Use <code className="bg-[var(--color-surface-raised,#f4f4f4)] dark:bg-white/10 px-1 rounded text-xs">{"{{niche}}"}</code> and{" "}
        <code className="bg-[var(--color-surface-raised,#f4f4f4)] dark:bg-white/10 px-1 rounded text-xs">{"{{targetAudience}}"}</code> in your topic template.
      </p>
      <NewCronScheduleForm clients={clients} />
    </div>
  );
}
