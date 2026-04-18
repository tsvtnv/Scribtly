"use client";

import type { Plan } from "@prisma/client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface PlanCardProps {
  plan: Plan;
  price: string;
  features: string[];
  currentPlan: Plan;
  onUpgrade?: () => void;
  busy?: boolean;
  highlight?: boolean;
}

const LABEL: Record<Plan, string> = { FREE: "Free", BASIC: "Basic", PRO: "Pro", AGENCY: "Agency", ENTERPRISE: "Enterprise" };
const RANK: Record<Plan, number> = { FREE: 0, BASIC: 1, PRO: 2, AGENCY: 3, ENTERPRISE: 4 };

export function PlanCard({ plan, price, features, currentPlan, onUpgrade, busy, highlight }: PlanCardProps) {
  const isCurrent = currentPlan === plan;
  const isUpgrade = RANK[plan] > RANK[currentPlan];

  return (
    <Card className={cn("flex flex-col", highlight && "border-primary/40 bg-primary/5")}>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-semibold">{LABEL[plan]}</h3>
        <div className="text-lg font-bold">{price}</div>
      </div>
      <ul className="space-y-2 text-sm mb-4 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-1.5">
            <Check size={14} className="text-success mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {isCurrent ? (
        <Button variant="secondary" disabled fullWidth>
          Current plan
        </Button>
      ) : isUpgrade ? (
        <Button fullWidth onClick={onUpgrade} loading={busy}>
          Upgrade to {LABEL[plan]}
        </Button>
      ) : (
        <Button variant="secondary" fullWidth onClick={onUpgrade} loading={busy}>
          Downgrade to {LABEL[plan]}
        </Button>
      )}
    </Card>
  );
}
