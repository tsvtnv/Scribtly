"use client";

import { useEffect, useState } from "react";
import type { Client, Platform, Plan } from "@prisma/client";
import { PlatformPicker } from "./PlatformPicker";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { allowedPlatforms, canUseExtras } from "@/lib/planLimits";
import promptsConfig from "@/config/prompts.config.json";
import { Plus, X, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const cfg = (promptsConfig as any).platforms as Record<string, { durations: string[]; hook_styles: string[]; extra_outputs: string[] }>;

export interface BulkRow {
  platform: Platform;
  topic: string;
  duration: string;
}

const MAX_ROWS = 10;

function newRow(): BulkRow {
  return { platform: "YOUTUBE", topic: "", duration: cfg.YOUTUBE.durations[0] };
}

export function GenerateBulkForm({
  clients,
  workspacePlan,
  onSubmit,
  onLockedExtras,
}: {
  clients: Client[];
  workspacePlan: Plan;
  onSubmit: (clientId: string, rows: BulkRow[], shared: { hookStyle?: string; extras?: string[] }) => void;
  onLockedExtras: () => void;
}) {
  const [clientId, setClientId] = useState(clients[0]?.id || "");
  const [rows, setRows] = useState<BulkRow[]>([newRow()]);
  const [hookStyle, setHookStyle] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const planAllowed = allowedPlatforms(workspacePlan);
  const extrasAllowed = canUseExtras({ plan: workspacePlan });

  // Reset hook/extras options when platforms change — use first row as reference
  const sharedPlatform = rows[0]?.platform || "YOUTUBE";
  useEffect(() => {
    setHookStyle("");
    setExtras([]);
  }, [sharedPlatform]);

  function updateRow(i: number, patch: Partial<BulkRow>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch, ...(patch.platform ? { duration: cfg[patch.platform].durations[0] } : {}) } : r)));
  }

  function removeRow(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  function addRow() {
    if (rows.length >= MAX_ROWS) return;
    setRows((prev) => [...prev, newRow()]);
  }

  function toggleExtra(key: string) {
    if (!extrasAllowed) return onLockedExtras();
    setExtras((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    const valid = rows.filter((r) => r.topic.trim() && planAllowed.includes(r.platform));
    if (!valid.length) return;
    onSubmit(clientId, valid, { hookStyle: hookStyle || undefined, extras: extras.length ? extras : undefined });
  }

  // Extras options based on first row's platform
  const extraOptions = cfg[sharedPlatform].extra_outputs;

  return (
    <form onSubmit={submit} className="space-y-5">
      <Card className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Client</label>
          <Select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.niche}</option>)}
          </Select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Scripts to generate</label>
          {rows.map((row, i) => (
            <div key={i} className="border-hair border-[var(--color-border)] rounded-md p-3 space-y-2 relative">
              <PlatformPicker
                value={row.platform}
                onChange={(p) => updateRow(i, { platform: p })}
                allowed={planAllowed}
                onLockedClick={() => {}}
              />
              <Textarea
                value={row.topic}
                onChange={(e) => updateRow(i, { topic: e.target.value })}
                placeholder="Topic"
                maxLength={300}
                required
              />
              <Select value={row.duration} onChange={(e) => updateRow(i, { duration: e.target.value })}>
                {cfg[row.platform].durations.map((d) => <option key={d} value={d}>{d}</option>)}
              </Select>
              {rows.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-danger/10 text-danger"
                  aria-label="Remove row"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
          ))}
          {rows.length < MAX_ROWS ? (
            <Button type="button" variant="ghost" size="sm" onClick={addRow}>
              <Plus size={14} /> Add another script
            </Button>
          ) : (
            <p className="text-xs text-text-secondary">Max {MAX_ROWS} scripts per batch.</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Hook style (applied to all)</label>
            <Select value={hookStyle} onChange={(e) => setHookStyle(e.target.value)}>
              <option value="">Let Claude decide</option>
              {cfg[sharedPlatform].hook_styles.map((h) => (
                <option key={h} value={h}>{h.replace(/_/g, " ")}</option>
              ))}
            </Select>
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
            <div className={cn("flex flex-wrap gap-1.5", !extrasAllowed && "opacity-60")}>
              {extraOptions.map((key) => {
                const active = extras.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleExtra(key)}
                    className={cn(
                      "text-xs px-2 py-1 rounded-sm border-hair",
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-[var(--color-surface)] border-[var(--color-border)]"
                    )}
                  >
                    {key.replace(/_/g, " ")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      <Button type="submit" size="lg" fullWidth>
        <Sparkles size={16} /> Generate {rows.length} {rows.length === 1 ? "script" : "scripts"}
      </Button>
    </form>
  );
}
