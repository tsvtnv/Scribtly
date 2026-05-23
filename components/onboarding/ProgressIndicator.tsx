"use client";

import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

const STEPS = ["Workspace", "First client", "First script"];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-10">
      <div className="relative flex items-start justify-between">
        {/* Connecting line layer — rendered behind circles */}
        <div className="absolute top-[18px] left-0 right-0 flex items-center px-[calc(100%/6)] pointer-events-none z-0">
          <div
            className="flex-1 h-0.5 transition-colors duration-500"
            style={{ backgroundColor: currentStep > 1 ? "var(--color-primary)" : "var(--color-border)" }}
          />
          <div
            className="flex-1 h-0.5 transition-colors duration-500"
            style={{ backgroundColor: currentStep > 2 ? "var(--color-primary)" : "var(--color-border)" }}
          />
        </div>

        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-2 z-10 flex-1">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                  isCompleted && "bg-primary border-primary text-white",
                  isActive && "bg-[var(--color-bg)] border-primary text-primary shadow-sm",
                  !isCompleted && !isActive && "bg-[var(--color-surface)] border-[var(--color-border)] text-text-secondary dark:text-dark-muted"
                )}
              >
                {isCompleted ? (
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path d="M1.5 6l3.5 3.5L12.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300 text-center",
                  isActive ? "text-primary" : "text-text-secondary dark:text-dark-muted"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
