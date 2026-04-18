"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;
type Platform = typeof PLATFORMS[number];
const PLATFORM_LABELS: Record<Platform, string> = {
  YOUTUBE: "YouTube", TIKTOK: "TikTok", REELS: "Reels", LINKEDIN: "LinkedIn", PODCAST: "Podcast",
};
const TONES = ["Conversational", "Educational", "Motivational", "Authoritative", "Entertaining"] as const;

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

  const inputCls = "w-full h-10 px-3 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Add your first client</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">Scribtly writes every script in your client's exact voice.</p>
      </div>
      <div className="space-y-1">
        <label htmlFor="client-name" className="text-sm font-medium text-text-primary">Client name</label>
        <input id="client-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah's Fitness" autoFocus maxLength={120} className={inputCls} />
      </div>
      <div className="space-y-1">
        <label htmlFor="niche" className="text-sm font-medium text-text-primary">Niche</label>
        <input id="niche" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. Fitness, Travel, SaaS" maxLength={200} className={inputCls} />
      </div>
      <div className="space-y-1">
        <label htmlFor="target-audience" className="text-sm font-medium text-text-primary">
          Target audience <span className="text-text-secondary dark:text-dark-muted font-normal">(optional)</span>
        </label>
        <input id="target-audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g. Busy professionals aged 25-40" maxLength={600} className={inputCls} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Tone of voice</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button key={t} type="button" onClick={() => setTone(t)}
              className={cn("px-3 py-1.5 rounded-full text-sm border transition-colors",
                tone === t ? "bg-primary text-white border-primary" : "border-[var(--color-border)] text-text-primary hover:border-primary hover:text-primary"
              )}>{t}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Primary platform</p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button key={p} type="button" onClick={() => setPlatform(p)}
              className={cn("px-3 py-1.5 rounded-full text-sm border transition-colors",
                platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)] text-text-primary hover:border-primary hover:text-primary"
              )}>{PLATFORM_LABELS[p]}</button>
          ))}
        </div>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button type="submit" size="lg" fullWidth loading={loading}>Add client</Button>
      <button type="button" onClick={handleSkip} className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors">
        Skip for now
      </button>
    </form>
  );
}
