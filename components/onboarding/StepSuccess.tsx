"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface StepSuccessProps {
  scriptText: string;
}

export function StepSuccess({ scriptText }: StepSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, []);

  async function markComplete() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingCompleted: true, onboardingStep: 3 }),
    });
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Your first script is ready</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          That took less than 60 seconds. Imagine doing that for every client, every week.
        </p>
      </div>
      <Card className="text-sm whitespace-pre-wrap overflow-y-auto" style={{ maxHeight: "400px", lineHeight: "1.7" }}>
        {scriptText}
      </Card>
      <div className="space-y-3">
        <Button size="lg" fullWidth onClick={async () => { await markComplete(); router.push("/dashboard"); }}>
          Go to my dashboard
        </Button>
        <Button size="lg" fullWidth variant="outline" onClick={async () => { await markComplete(); router.push("/scripts"); }}>
          View script library
        </Button>
      </div>
    </div>
  );
}
