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
import { allowedPlatforms, canUseExtras } from "@/lib/planLimits";
import promptsConfig from "@/config/prompts.config.json";
import { cn } from "@/lib/utils";
import { Sparkles, Lock } from "lucide-react";

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
}

export function GenerateForm({
  clients,
  workspacePlan,
  onSubmit,
  isStreaming,
  onLockedPlatform,
  onLockedExtras,
}: {
  clients: Client[];
  workspacePlan: Plan;
  onSubmit: (p: GeneratePayload) => void;
  isStreaming: boolean;
  onLockedPlatform: (p: Platform) => void;
  onLockedExtras: () => void;
}) {
  const planAllowed = useMemo(() => allowedPlatforms(workspacePlan), [workspacePlan]);
  const extrasAllowed = canUseExtras({ plan: workspacePlan });

  const [clientId, setClientId] = useState<string>(clients[0]?.id || "");
  const [platform, setPlatform] = useState<Platform>("YOUTUBE");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState<string>(cfg.YOUTUBE.durations[0]);
  const [hookStyle, setHookStyle] = useState<string>("");
  const [extraOutputs, setExtraOutputs] = useState<string[]>([]);

  useEffect(() => {
    setDuration(cfg[platform].durations[0]);
    setHookStyle("");
    setExtraOutputs([]);
  }, [platform]);

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
              <option value="">Let Claude decide</option>
              {platformCfg.hook_styles.map((h) => (
                <option key={h} value={h}>{h.replace(/_/g, " ")}</option>
              ))}
            </Select>
          </div>
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
          <div className={cn("grid grid-cols-2 gap-1.5", !extrasAllowed && "opacity-60")}>
            {platformCfg.extra_outputs.map((key) => {
              const active = extraOutputs.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleExtra(key)}
                  className={cn(
                    "text-xs px-2.5 py-2 rounded-md border-hair text-left capitalize",
                    active
                      ? "bg-primary text-white border-primary dark:bg-primary-onDark dark:text-dark-base"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-primary/40"
                  )}
                >
                  {key.replace(/_/g, " ")}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Button type="submit" size="lg" fullWidth loading={isStreaming}>
        <Sparkles size={16} /> Generate script
      </Button>
    </form>
  );
}
