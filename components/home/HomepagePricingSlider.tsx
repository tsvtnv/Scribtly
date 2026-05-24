"use client";

import { useState } from "react";
import { PricingSlider, type PlanId } from "@/components/marketing/PricingSlider";

const PLAN_PRICES: Record<PlanId, { price: string; suffix?: string; scripts: string }> = {
  FREE:   { price: "0",  scripts: "5 scripts / month" },
  BASIC:  { price: "5",  suffix: "/mo", scripts: "25 scripts / month" },
  PRO:    { price: "19", suffix: "/mo", scripts: "100 scripts / month" },
  AGENCY: { price: "49", suffix: "/mo", scripts: "350 scripts / month" },
};

export function HomepagePricingSlider() {
  const [plan, setPlan] = useState<PlanId>("PRO");
  const { price, suffix, scripts } = PLAN_PRICES[plan];

  return (
    <div className="mt-8">
      <PricingSlider value={plan} onPlanChange={setPlan} />
      <div className="mt-6 flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold text-primary sm:text-5xl">£{price}</span>
        {suffix && <span className="text-sm text-text-secondary sm:text-base">{suffix}</span>}
      </div>
      <p className="mt-1 text-center text-xs text-text-secondary sm:text-sm">{scripts}</p>
    </div>
  );
}
