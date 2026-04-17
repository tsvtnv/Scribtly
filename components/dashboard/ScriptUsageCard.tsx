import Link from "next/link";
import type { Plan } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import {
  getScriptLimit,
  hasReachedScriptLimit,
  isNearScriptLimit,
} from "@/lib/planLimits";

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

export function ScriptUsageCard({
  plan,
  scriptCount,
  scriptCountResetAt,
}: {
  plan: Plan;
  scriptCount: number;
  scriptCountResetAt: Date;
}) {
  const limit = getScriptLimit(plan);
  const workspace = { plan, scriptCount };
  const pct = Math.min(100, Math.max(0, (scriptCount / limit) * 100));
  const resetDate = formatDate(scriptCountResetAt);

  const reached = hasReachedScriptLimit(workspace);
  const near = isNearScriptLimit(workspace);

  let barColor = "bg-success";
  if (pct >= 80) barColor = "bg-error";
  else if (pct >= 60) barColor = "bg-warning";

  return (
    <Card className="w-full">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-1">
            Scripts this month
          </div>
          <div className="text-4xl font-bold leading-none">{scriptCount}</div>
          {reached ? (
            <div className="text-sm text-text-secondary dark:text-dark-muted mt-2">
              You&apos;ve used all your scripts this month.{" "}
              <Link href="/settings/billing" className="text-primary hover:underline">
                Upgrade
              </Link>{" "}
              or wait until {resetDate}.
            </div>
          ) : (
            <div className="text-sm text-text-secondary dark:text-dark-muted mt-2">
              of {limit} scripts used — resets {resetDate}
              {near ? (
                <>
                  {" "}
                  · Running low —{" "}
                  <Link href="/settings/billing" className="text-primary hover:underline">
                    Upgrade for more scripts
                  </Link>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 h-2 w-full bg-neutral-bg dark:bg-dark-elevated rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </Card>
  );
}
