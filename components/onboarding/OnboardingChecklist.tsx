// components/onboarding/OnboardingChecklist.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ChecklistItem = { id: number; key: string; completed: boolean };

const STEPS = [
  { id: 1, key: "add_client", title: "Add your first client", description: "Set up a client profile with their niche and tone of voice", cta: "Add a client", link: "/clients/new" },
  { id: 2, key: "generate_script", title: "Generate your first script", description: "See AI write in your client's exact voice", cta: "Generate a script", link: "/generate" },
  { id: 3, key: "explore_library", title: "View your script library", description: "See your saved scripts organised by client", cta: "View library", link: "/scripts" },
  { id: 4, key: "invite_or_upgrade", title: "Unlock the full toolkit", description: "Get the pipeline, calendar, PDF export and more", cta: "See plans", link: "/pricing" },
];

export function OnboardingChecklist({
  initialCompleted,
  initialOnboardingCompleted,
}: {
  initialCompleted: ChecklistItem[];
  initialOnboardingCompleted: boolean;
}) {
  const [items, setItems] = useState(initialCompleted);
  const [dismissed, setDismissed] = useState(initialOnboardingCompleted);
  const [celebrating, setCelebrating] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const allDone = completedCount === 4;
  const progress = (completedCount / 4) * 100;

  useEffect(() => {
    if (allDone && !dismissed) {
      setCelebrating(true);
      const t = setTimeout(() => {
        setDismissed(true);
        void fetch("/api/user/onboarding", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ onboardingCompleted: true }),
        });
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [allDone, dismissed]);

  async function dismiss() {
    setDismissed(true);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingCompleted: true }),
      });
    } catch {
      // non-critical
    }
  }

  if (dismissed && !celebrating) return null;

  return (
    <Card
      className={`transition-opacity duration-700 ${celebrating ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm">Getting started</h2>
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {completedCount} of 4 complete
        </span>
      </div>
      <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "#7F77DD" }}
        />
      </div>
      <div className="space-y-3">
        {STEPS.map((step) => {
          const item = items.find((i) => i.id === step.id);
          const done = item?.completed ?? false;
          return (
            <div key={step.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {done ? (
                  <CheckCircle size={18} className="text-[#7F77DD]" />
                ) : (
                  <Circle size={18} className="text-text-secondary dark:text-dark-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${done ? "line-through text-text-secondary dark:text-dark-muted" : ""}`}>
                  {step.title}
                </div>
                {!done && (
                  <div className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
                    {step.description}
                  </div>
                )}
              </div>
              {!done && (
                <Link
                  href={step.link}
                  className="text-xs text-[#7F77DD] hover:underline flex-shrink-0"
                >
                  {step.cta} →
                </Link>
              )}
            </div>
          );
        })}
      </div>
      {!allDone && (
        <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
          <button type="button" onClick={dismiss} className="text-xs text-text-secondary hover:underline">
            Dismiss
          </button>
        </div>
      )}
    </Card>
  );
}
