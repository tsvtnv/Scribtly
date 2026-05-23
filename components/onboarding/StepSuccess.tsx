"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Library, Plus } from "lucide-react";

interface StepSuccessProps {
  scriptText: string;
}

const NEXT_STEPS = [
  {
    icon: Plus,
    title: "Generate more scripts",
    desc: "Add topics and produce scripts for any client in seconds.",
    href: "/generate",
    primary: true,
  },
  {
    icon: LayoutDashboard,
    title: "Go to dashboard",
    desc: "See your workspace overview and recent activity.",
    href: "/dashboard",
    primary: false,
  },
  {
    icon: Library,
    title: "View script library",
    desc: "Browse, search, and export all your scripts.",
    href: "/scripts",
    primary: false,
  },
];

export function StepSuccess({ scriptText }: StepSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.55 }, colors: ["#5B6AF0", "#7C3AED", "#10B981", "#F59E0B"] });
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.5, x: 0.2 } });
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.5, x: 0.8 } });
    }, 300);
  }, []);

  async function markComplete() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingCompleted: true, onboardingStep: 3 }),
    });
  }

  const preview = scriptText.slice(0, 280).trim();

  return (
    <div className="w-full space-y-7">
      <div className="text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Your first script is done
        </h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
          That took under 60 seconds. Now imagine doing that for every client, every single week.
        </p>
      </div>

      {preview && (
        <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-border)] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs font-medium text-text-secondary dark:text-dark-muted">Script preview</span>
          </div>
          <div className="px-4 py-3 text-sm text-text-primary leading-relaxed line-clamp-5 font-mono">
            {preview}
            {scriptText.length > 280 && "…"}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none" />
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary dark:text-dark-muted uppercase tracking-wide">What's next</p>
        {NEXT_STEPS.map((step) => (
          <button
            key={step.href}
            onClick={async () => {
              await markComplete();
              router.push(step.href);
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors">
              <step.icon size={16} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary">{step.title}</p>
              <p className="text-xs text-text-secondary dark:text-dark-muted">{step.desc}</p>
            </div>
            <span className="text-text-secondary dark:text-dark-muted group-hover:text-primary transition-colors text-sm">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
