"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Plan } from "@prisma/client";

interface PipelineUpgradePromptProps {
  plan: Plan;
}

const BENEFITS = [
  "Drag scripts between stages",
  "Filter by client and platform",
  "See what's coming up at a glance",
  "Never lose track of a post again",
];

export function PipelineUpgradePrompt({ plan }: PipelineUpgradePromptProps) {
  const subtext =
    plan === "BASIC"
      ? "You're on Basic (£5/month). Upgrade to Pro (£19/month) to unlock the pipeline, calendar, PDF export and more."
      : "The content pipeline is available on Pro and above. Upgrade to Pro (£19/month) to organize your content workflow.";

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <h2 className="text-3xl font-semibold text-text-primary dark:text-dark-text">
        Track every piece of content from idea to published
      </h2>
      <p className="mt-4 text-sm text-text-secondary dark:text-dark-muted">
        {subtext}
      </p>

      <div className="mt-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-left">
        <ul className="space-y-3">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-sm text-text-primary dark:text-dark-text"
            >
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center">
                <Check className="w-3 h-3 text-[var(--color-primary)]" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Link
          href="/settings/billing"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-[var(--color-primary)] text-white font-medium text-base hover:opacity-90 transition-opacity"
        >
          Upgrade to Pro — £19/month
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
