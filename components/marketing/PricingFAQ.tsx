"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as one script?",
    a: "Each time you click Generate counts as one script, regardless of length or which quality model you use.",
  },
  {
    q: "When do my scripts reset?",
    a: "Your script count resets on the same date each month as your billing date. You can see your reset date on your dashboard.",
  },
  {
    q: "Can I change plans anytime?",
    a: "Yes. Upgrade instantly and get the new limit immediately. Downgrade takes effect at the next billing date.",
  },
  {
    q: "What's the difference between Standard, Quality and Premium?",
    a: "Standard is fast and great for short-form content. Quality is balanced. Premium produces the highest quality output for long YouTube scripts and complex topics.",
  },
  {
    q: "Can I try Pro before paying?",
    a: "The Free plan lets you generate 5 scripts. If you want to test Pro features, reach out and we can arrange a trial.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — if you're not happy in your first 7 days on any paid plan, email us and we'll refund you in full.",
  },
];

export function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={f.q}
            className="border-hair border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)] transition-colors"
            >
              <span>{f.q}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <div className="px-4 pb-4 text-sm text-text-secondary dark:text-dark-muted">
                {f.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
