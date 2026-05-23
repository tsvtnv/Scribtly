"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface StepWorkspaceProps {
  initialName: string;
  onNext: (workspaceName: string) => void;
}

export function StepWorkspace({ initialName, onNext }: StepWorkspaceProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setError("Workspace name is required."); return; }
    setError(null);
    setLoading(true);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 1 }),
      });
      onNext(trimmed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Welcome to Scribtly</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">Let's get you set up in 3 steps.</p>
      </div>
      <div className="space-y-1">
        <label htmlFor="workspace-name" className="text-sm font-medium text-text-primary">
          Workspace name
        </label>
        <input
          id="workspace-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. My Agency"
          autoFocus
          maxLength={80}
          className="w-full h-10 px-3 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <p className="text-xs text-text-secondary dark:text-dark-muted">You can change this later in settings.</p>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
      <Button type="submit" size="lg" fullWidth loading={loading}>Continue</Button>
    </form>
  );
}
