"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;
type Platform = typeof PLATFORMS[number];

const PLATFORM_META: Record<Platform, { label: string; color: string; icon: string }> = {
  YOUTUBE: { label: "YouTube", color: "#FF0000", icon: "▶" },
  TIKTOK: { label: "TikTok", color: "#000000", icon: "♪" },
  REELS: { label: "Reels", color: "#E1306C", icon: "◎" },
  LINKEDIN: { label: "LinkedIn", color: "#0077B5", icon: "in" },
  PODCAST: { label: "Podcast", color: "#8940FA", icon: "🎙" },
};

const TONE_META: Record<string, { label: string; desc: string }> = {
  Conversational: { label: "Conversational", desc: "Friendly, like talking to a friend" },
  Educational: { label: "Educational", desc: "Clear, structured, informative" },
  Motivational: { label: "Motivational", desc: "Energetic, inspiring, action-focused" },
  Authoritative: { label: "Authoritative", desc: "Expert, confident, data-backed" },
  Entertaining: { label: "Entertaining", desc: "Fun, witty, keeps them watching" },
};

const NICHE_CHIPS = [
  "Fitness", "Finance", "Food", "Travel", "Tech", "Beauty",
  "Real Estate", "Gaming", "Education", "Business", "Health", "Lifestyle",
];

interface StepClientProps {
  onNext: (clientId: string, niche: string, platform: string) => void;
  onSkip: () => void;
}

export function StepClient({ onNext, onSkip }: StepClientProps) {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<string>("Conversational");
  const [platform, setPlatform] = useState<Platform>("YOUTUBE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedNiche = niche.trim();
    if (!trimmedName) { setError("Client name is required."); return; }
    if (!trimmedNiche) { setError("Niche is required."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          niche: trimmedNiche,
          targetAudience: targetAudience.trim() || trimmedNiche,
          toneOfVoice: tone,
          primaryPlatform: platform,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as Record<string, string>)?.error ?? "Failed to create client.");
        return;
      }
      const data = await res.json();
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 2, firstClientAddedAt: new Date().toISOString() }),
      });
      onNext(data.client.id as string, trimmedNiche, platform);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSkip() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingStep: 2 }),
    });
    onSkip();
  }

  const inputCls = "w-full h-11 px-3.5 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Add your first client</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          This is their voice profile — Scribtly will write every script to sound exactly like them.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="client-name" className="text-sm font-medium text-text-primary">Client name</label>
        <input
          id="client-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah's Fitness"
          autoFocus
          maxLength={120}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Niche</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {NICHE_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setNiche(chip)}
              className={cn(
                "px-3 py-1 rounded-full text-xs border transition-all",
                niche === chip
                  ? "bg-primary text-white border-primary"
                  : "border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:border-primary hover:text-primary"
              )}
            >
              {chip}
            </button>
          ))}
        </div>
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Or type a custom niche…"
          maxLength={200}
          className={inputCls}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="target-audience" className="text-sm font-medium text-text-primary">
          Target audience <span className="text-text-secondary dark:text-dark-muted font-normal">(optional)</span>
        </label>
        <input
          id="target-audience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g. Busy professionals aged 25–40"
          maxLength={600}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Platform</p>
        <div className="grid grid-cols-5 gap-2">
          {PLATFORMS.map((p) => {
            const meta = PLATFORM_META[p];
            const isSelected = platform === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:border-primary/50"
                )}
              >
                <span className="text-base leading-none">{meta.icon}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Tone of voice</p>
        <div className="grid grid-cols-1 gap-1.5">
          {Object.entries(TONE_META).map(([key, meta]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTone(key)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg border text-left transition-all",
                tone === key
                  ? "border-primary bg-primary/5"
                  : "border-[var(--color-border)] hover:border-primary/40"
              )}
            >
              <div className={cn("w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors",
                tone === key ? "border-primary bg-primary" : "border-[var(--color-border)]"
              )} />
              <div className="min-w-0">
                <span className={cn("text-sm font-medium", tone === key ? "text-primary" : "text-text-primary")}>
                  {meta.label}
                </span>
                <span className="text-xs text-text-secondary dark:text-dark-muted ml-1.5">{meta.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      <Button type="submit" size="lg" fullWidth loading={loading}>
        Save client & continue →
      </Button>
      <button
        type="button"
        onClick={handleSkip}
        className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors text-center py-1"
      >
        Skip for now
      </button>
    </form>
  );
}
