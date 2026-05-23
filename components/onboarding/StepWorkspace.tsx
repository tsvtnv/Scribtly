"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Sparkles, Users, BookOpen } from "lucide-react";

interface StepWorkspaceProps {
  initialName: string;
  onNext: (workspaceName: string) => void;
  userName?: string | null;
}

const PREVIEW_STEPS = [
  { icon: Users, label: "Add a client", desc: "Save their voice, tone, and niche" },
  { icon: Sparkles, label: "Generate a script", desc: "Platform-perfect in under 60 seconds" },
  { icon: BookOpen, label: "Build your library", desc: "Every script, searchable and reusable" },
];

export function StepWorkspace({ initialName, onNext, userName }: StepWorkspaceProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstName = userName?.split(" ")[0];

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
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">
          {firstName ? `Welcome, ${firstName}` : "Welcome to Scribtly"} 👋
        </h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          You're 3 steps away from generating your first script. Let's go.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
        {PREVIEW_STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3.5 px-4 py-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <s.icon size={14} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-primary leading-tight">{i + 1}. {s.label}</p>
              <p className="text-xs text-text-secondary dark:text-dark-muted">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="workspace-name" className="text-sm font-medium text-text-primary">
          Name your workspace
        </label>
        <input
          id="workspace-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. My Agency"
          autoFocus
          maxLength={80}
          className="w-full h-11 px-3.5 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
        />
        <p className="text-xs text-text-secondary dark:text-dark-muted">You can change this later in settings.</p>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>

      <Button type="submit" size="lg" fullWidth loading={loading}>
        Let's get started →
      </Button>
    </form>
  );
}
