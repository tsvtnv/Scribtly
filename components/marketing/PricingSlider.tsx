"use client";

import { useMemo } from "react";

export type PlanId = "FREE" | "BASIC" | "PRO" | "AGENCY";

const NOTCHES: { value: number; label: string; plan: PlanId }[] = [
  { value: 5, label: "Just trying", plan: "FREE" },
  { value: 25, label: "Getting started", plan: "BASIC" },
  { value: 100, label: "Growing fast", plan: "PRO" },
  { value: 350, label: "Full agency", plan: "AGENCY" },
];

interface PricingSliderProps {
  value?: PlanId;
  onPlanChange: (plan: PlanId) => void;
}

export function PricingSlider({ value = "BASIC", onPlanChange }: PricingSliderProps) {
  const activeIndex = useMemo(
    () => NOTCHES.findIndex((n) => n.plan === value),
    [value]
  );
  const safeIndex = activeIndex < 0 ? 1 : activeIndex;
  const fillPct = (safeIndex / (NOTCHES.length - 1)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const n = NOTCHES[idx];
    if (n) onPlanChange(n.plan);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 select-none sm:px-1">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="text-xs text-text-secondary dark:text-dark-muted sm:text-sm">
          How many scripts do you need per month?
        </span>
        <span className="text-xl font-semibold sm:text-2xl" style={{ color: "#7F77DD" }}>
          {NOTCHES[safeIndex].value}
          <span className="text-xs text-text-secondary dark:text-dark-muted ml-1 font-normal sm:text-sm">
            scripts
          </span>
        </span>
      </div>

      <div className="relative h-10">
        {/* Track */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full"
          style={{ height: 4, background: "var(--color-border)" }}
        />
        {/* Fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
          style={{ height: 4, width: `${fillPct}%`, background: "#7F77DD" }}
        />
        {/* Notch ticks */}
        {NOTCHES.map((n, i) => {
          const left = (i / (NOTCHES.length - 1)) * 100;
          const isActive = i === safeIndex;
          return (
            <div
              key={n.value}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-colors"
              style={{
                left: `${left}%`,
                width: 10,
                height: 10,
                background: i <= safeIndex ? "#7F77DD" : "var(--color-border)",
                border: isActive ? "2px solid #7F77DD" : "none",
              }}
              aria-hidden
            />
          );
        })}
        {/* Thumb (visual) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white transition-all duration-200 pointer-events-none"
          style={{
            left: `${fillPct}%`,
            width: 20,
            height: 20,
            border: "2px solid #7F77DD",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          aria-hidden
        />
        {/* Native range input overlay */}
        <input
          type="range"
          min={0}
          max={NOTCHES.length - 1}
          step={1}
          value={safeIndex}
          onChange={handleChange}
          aria-label="Scripts per month"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Labels */}
      <div className="relative mt-4 h-10">
        {NOTCHES.map((n, i) => {
          const left = (i / (NOTCHES.length - 1)) * 100;
          const isActive = i === safeIndex;
          const isFirst = i === 0;
          const isLast = i === NOTCHES.length - 1;
          const translateClass = isFirst
            ? "translate-x-0"
            : isLast
            ? "-translate-x-full"
            : "-translate-x-1/2";
          const alignClass = isFirst
            ? "items-start text-left"
            : isLast
            ? "items-end text-right"
            : "items-center text-center";
          return (
            <button
              key={n.value}
              type="button"
              onClick={() => onPlanChange(n.plan)}
              className={`absolute flex flex-col gap-0.5 text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 rounded px-1 ${translateClass} ${alignClass}`}
              style={{ left: `${left}%` }}
            >
              <span
                className={
                  isActive
                    ? "font-semibold"
                    : "text-text-secondary dark:text-dark-muted"
                }
                style={isActive ? { color: "#7F77DD" } : undefined}
              >
                {n.value}
              </span>
              <span
                className={
                  isActive
                    ? "font-semibold whitespace-nowrap"
                    : "whitespace-nowrap text-text-secondary dark:text-dark-muted"
                }
                style={isActive ? { color: "#7F77DD" } : undefined}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
