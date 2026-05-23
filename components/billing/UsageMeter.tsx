import type { Plan } from "@prisma/client";
import { getPlanConfig } from "@/lib/planLimits";

export function UsageMeter({ plan, scriptCount }: { plan: Plan; scriptCount: number }) {
  const cfg = getPlanConfig(plan);
  const limit = cfg.scripts_per_month;
  const pct = Math.min(100, Math.round((scriptCount / limit) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-text-secondary dark:text-dark-muted">Scripts this month</span>
        <span className="font-medium">{scriptCount} / {limit}</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-bg dark:bg-dark-elevated rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
