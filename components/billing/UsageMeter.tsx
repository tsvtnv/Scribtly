import type { Plan } from "@prisma/client";
import { getPlanConfig } from "@/lib/planLimits";

export function UsageMeter({ plan, scriptCount }: { plan: Plan; scriptCount: number }) {
  const cfg = getPlanConfig(plan);
  if (cfg.script_limit === -1) {
    return (
      <div className="text-xs text-text-secondary dark:text-dark-muted">
        Unlimited scripts ({scriptCount} generated this period)
      </div>
    );
  }
  const pct = Math.min(100, Math.round((scriptCount / cfg.script_limit) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-text-secondary dark:text-dark-muted">Scripts this month</span>
        <span className="font-medium">{scriptCount} / {cfg.script_limit}</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-bg dark:bg-dark-elevated rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
