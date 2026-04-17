"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Client, Platform, Plan } from "@prisma/client";
import { PlatformPicker } from "./PlatformPicker";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import {
  allowedPlatforms,
  canUseAllModels,
  canUseExtras,
  getScriptLimit,
  hasReachedScriptLimit,
  isNearScriptLimit,
} from "@/lib/planLimits";
import { CLAUDE_MODELS, DEFAULT_CLAUDE_MODEL, canUseClaudeModel, type ClaudeModelKey } from "@/lib/modelAccess";
import promptsConfig from "@/config/prompts.config.json";
import { cn } from "@/lib/utils";
import { Sparkles, Lock, AlertTriangle } from "lucide-react";

type PlatformCfg = {
  durations: string[];
  hook_styles: string[];
  extra_outputs: string[];
};
const cfg = (promptsConfig as any).platforms as Record<string, PlatformCfg>;

export interface GeneratePayload {
  clientId: string;
  platform: Platform;
  topic: string;
  duration: string;
  hookStyle?: string | null;
  extraOutputs?: string[];
  model?: ClaudeModelKey;
}

export function GenerateForm({
  clients,
  workspacePlan,
  scriptCount,
  scriptCountResetAt,
  onSubmit,
  isStreaming,
  onLockedPlatform,
  onLockedExtras,
}: {
  clients: Client[];
  workspacePlan: Plan;
  scriptCount: number;
  scriptCountResetAt: string;
  onSubmit: (p: GeneratePayload) => void;
  isStreaming: boolean;
  onLockedPlatform: (p: Platform) => void;
  onLockedExtras: () => void;
}) {
  const planAllowed = useMemo(() => allowedPlatforms(workspacePlan), [workspacePlan]);
  const extrasAllowed = canUseExtras({ plan: workspacePlan });
  const allModelsAllowed = canUseAllModels(workspacePlan);
  const scriptLimit = getScriptLimit(workspacePlan);
  const workspaceLike = { plan: workspacePlan, scriptCount };
  const limitReached = hasReachedScriptLimit(workspaceLike);
  const nearLimit = isNearScriptLimit(workspaceLike) && !limitReached;
  const resetLabel = (() => {
    try {
      return new Date(scriptCountResetAt).toLocaleDateString("en-GB", { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  })();

  const [clientId, setClientId] = useState<string>(clients[0]?.id || "");
  const [platform, setPlatform] = useState<Platform>("YOUTUBE");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState<string>(cfg.YOUTUBE.durations[0]);
  const [hookStyle, setHookStyle] = useState<string>("");
  const [extraOutputs, setExtraOutputs] = useState<string[]>([]);
  const [model, setModel] = useState<ClaudeModelKey>(DEFAULT_CLAUDE_MODEL);
  const [showModelTooltip, setShowModelTooltip] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sf_tooltip_model_seen")) {
      setShowModelTooltip(true);
    }
  }, []);

  useEffect(() => {
    setDuration(cfg[platform].durations[0]);
    setHookStyle("");
    setExtraOutputs([]);
  }, [platform]);

  useEffect(() => {
    if (!canUseClaudeModel(workspacePlan, model)) {
      setModel(DEFAULT_CLAUDE_MODEL);
    }
  }, [workspacePlan, model]);

  const selectedClient = clients.find((c) => c.id === clientId);

  function toggleExtra(key: string) {
    if (!extrasAllowed) {
      onLockedExtras();
      return;
    }
    setExtraOutputs((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId || !topic.trim()) return;
    onSubmit({
      clientId,
      platform,
      topic: topic.trim(),
      duration,
      hookStyle: hookStyle || null,
      extraOutputs: extraOutputs.length ? extraOutputs : undefined,
      model,
    });
  }

  if (clients.length === 0) {
    return (
      <Card className="text-center">
        <p className="text-sm mb-4">Add a client profile to start generating scripts.</p>
        <Link href="/clients/new">
          <Button>Add your first client</Button>
        </Link>
      </Card>
    );
  }

  const platformCfg = cfg[platform];

  return (
    <form onSubmit={submit} className="space-y-5">
      <Card className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Client</label>
          <div className="flex items-center gap-2">
            <Select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} — {c.niche}</option>
              ))}
            </Select>
          </div>
          {selectedClient ? (
            <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary dark:text-dark-muted">
              <ClientAvatar name={selectedClient.name} color={selectedClient.avatarColor} size={18} />
              <span>{selectedClient.toneOfVoice}</span>
              <Link href="/clients/new" target="_blank" className="ml-auto text-primary hover:underline">
                + Add new client
              </Link>
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Platform</label>
          <PlatformPicker
            value={platform}
            onChange={setPlatform}
            allowed={planAllowed}
            onLockedClick={onLockedPlatform}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Video topic</label>
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={300}
            required
            placeholder="e.g. 5 reasons most people never build a morning routine that sticks"
          />
          <div className="text-xs text-text-secondary dark:text-dark-muted mt-1 text-right">
            {topic.length} / 300
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Length</label>
            <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
              {platformCfg.durations.map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Hook style (optional)</label>
            <Select value={hookStyle} onChange={(e) => setHookStyle(e.target.value)}>
              <option value="">AI picks best fit</option>
              {platformCfg.hook_styles.map((h) => (
                <option key={h} value={h}>{h.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Quality</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(CLAUDE_MODELS) as ClaudeModelKey[]).map((key) => {
              const locked = !allModelsAllowed && key !== "STANDARD";
              const active = model === key;
              const info = CLAUDE_MODELS[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { if (!locked) setModel(key); }}
                  disabled={locked}
                  title={locked ? "Upgrade to Basic (£5/mo) to unlock Quality and Premium" : info.description}
                  aria-pressed={active}
                  className={cn(
                    "text-left rounded-md border-hair p-3 transition-colors",
                    active
                      ? "bg-primary text-white border-primary dark:bg-primary-onDark dark:text-dark-base"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-primary/40",
                    locked && "opacity-50 cursor-not-allowed hover:border-[var(--color-border)]"
                  )}
                >
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    {info.label}
                    {locked ? <Lock size={12} /> : null}
                  </div>
                  <div className={cn("text-[11px] mt-0.5", active ? "text-white/80" : "text-text-secondary dark:text-dark-muted")}>
                    {info.description}
                  </div>
                </button>
              );
            })}
          </div>
          {showModelTooltip && (
            <div className="mt-1 p-3 rounded-md bg-[var(--color-primary-tint)] border border-[var(--color-primary)]/20 text-xs text-text-secondary dark:text-dark-muted flex items-start justify-between gap-2">
              <span>Standard is great for TikTok and short clips. Quality works for most scripts. Premium is best for long YouTube videos.</span>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("sf_tooltip_model_seen", "1");
                  setShowModelTooltip(false);
                }}
                className="flex-shrink-0 text-text-secondary hover:text-text-primary"
                aria-label="Dismiss tooltip"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium">Also generate</label>
            {!extrasAllowed ? (
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary inline-flex items-center gap-1">
                <Lock size={10} /> Pro
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {platformCfg.extra_outputs.map((key) => {
              const active = extraOutputs.includes(key);
              const locked = !extrasAllowed;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleExtra(key)}
                  disabled={locked}
                  title={locked ? "Extras are available on Pro — upgrade for £19/month" : undefined}
                  className={cn(
                    "text-xs px-2.5 py-2 rounded-md border-hair text-left capitalize inline-flex items-center justify-between gap-2",
                    active
                      ? "bg-primary text-white border-primary dark:bg-primary-onDark dark:text-dark-base"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-primary/40",
                    locked && "opacity-50 cursor-not-allowed hover:border-[var(--color-border)]"
                  )}
                >
                  <span>{key.replace(/_/g, " ")}</span>
                  {locked ? (
                    <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded-sm bg-primary/10 text-primary inline-flex items-center gap-0.5 normal-case">
                      <Lock size={9} /> Pro
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          {!extrasAllowed ? (
            <p className="text-[11px] text-text-secondary dark:text-dark-muted mt-1.5">
              Extras are available on Pro — upgrade for £19/month.
            </p>
          ) : null}
        </div>
      </Card>

      {limitReached ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="button" size="lg" fullWidth disabled>
            Script limit reached — upgrade to keep generating
          </Button>
          <Link href="/settings/billing" className="sm:w-auto">
            <Button type="button" size="lg" fullWidth>
              Upgrade plan
            </Button>
          </Link>
        </div>
      ) : (
        <Button type="submit" size="lg" fullWidth loading={isStreaming}>
          <Sparkles size={16} /> Generate script
        </Button>
      )}

      <div
        className={cn(
          "text-xs mt-2 inline-flex items-center gap-1.5",
          nearLimit
            ? "text-amber-600 dark:text-amber-400"
            : "text-text-secondary dark:text-dark-muted"
        )}
      >
        {nearLimit ? <AlertTriangle size={12} /> : null}
        <span>
          {scriptCount} of {scriptLimit} scripts used this month
          {resetLabel ? <> — resets {resetLabel}</> : null}
        </span>
      </div>
    </form>
  );
}
