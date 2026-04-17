// components/onboarding/OnboardingBanner.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const LS_KEY = "sf_banner_dismissed";

export function OnboardingBanner({ onboardingStep }: { onboardingStep: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (onboardingStep === 0 && !localStorage.getItem(LS_KEY)) {
      setVisible(true);
    }
  }, [onboardingStep]);

  const dismissing = useRef(false);

  async function dismiss() {
    if (dismissing.current) return;
    dismissing.current = true;
    localStorage.setItem(LS_KEY, "1");
    setVisible(false);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 1 }),
      });
    } catch {
      // non-critical
    }
  }

  if (!visible) return null;

  return (
    <Card className="relative border-[var(--color-primary)] bg-[var(--color-primary-tint)]">
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-3 text-text-secondary hover:text-text-primary"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
      <div className="pr-6">
        <h2 className="font-semibold text-base mb-1">Welcome to Scribtly</h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
          You're 3 steps away from your first AI-generated script.
        </p>
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center font-semibold">1</span>
            Add client
          </span>
          <span className="text-text-secondary">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full border border-text-secondary text-text-secondary text-xs flex items-center justify-center font-semibold">2</span>
            Generate script
          </span>
          <span className="text-text-secondary">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full border border-text-secondary text-text-secondary text-xs flex items-center justify-center font-semibold">3</span>
            Ship content
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/clients/new">
            <Button size="sm" onClick={dismiss}>Add your first client</Button>
          </Link>
          <button type="button" onClick={dismiss} className="text-sm text-text-secondary hover:underline">
            Dismiss
          </button>
        </div>
      </div>
    </Card>
  );
}
