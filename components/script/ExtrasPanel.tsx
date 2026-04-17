"use client";

import { useState } from "react";
import { Copy, RefreshCw, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

const LABELS: Record<string, string> = {
  title_options: "Title options",
  description: "Description",
  tags: "Tags",
  chapters: "Chapters",
  caption: "Caption",
  hashtags: "Hashtags",
  hook_variations: "Hook variations",
  cover_text: "Cover text",
  show_notes: "Show notes",
  social_clip_prompt: "Social clip idea",
};

export function ExtrasPanel({ scriptId, extras: initial }: { scriptId: string; extras: Record<string, string> }) {
  const toast = useToast();
  const [extras, setExtras] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const keys = Object.keys(extras);
  if (keys.length === 0) return null;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.push("Copied", "success");
    } catch {
      toast.push("Copy failed", "error");
    }
  }

  async function regen(key: string) {
    setBusy(key);
    try {
      const res = await fetch("/api/generate-script/extra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scriptId, extraType: key }),
      });
      const body = await res.json();
      if (!res.ok) {
        toast.push(body.error || "Regenerate failed", "error");
        return;
      }
      setExtras((prev) => ({ ...prev, [key]: body.text }));
      toast.push("Regenerated", "success");
    } finally {
      setBusy(null);
    }
  }

  return (
    <aside className="space-y-3">
      <h3 className="text-sm font-semibold">Extras</h3>
      {keys.map((k) => (
        <Card key={k} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium uppercase tracking-wider text-text-secondary dark:text-dark-muted">
              {LABELS[k] || k}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => copy(extras[k])}
                className="p-1 rounded-md hover:bg-[var(--color-primary-tint)]"
                aria-label="Copy"
              >
                <Copy size={12} />
              </button>
              <button
                onClick={() => regen(k)}
                disabled={busy === k}
                className="p-1 rounded-md hover:bg-[var(--color-primary-tint)] disabled:opacity-50"
                aria-label="Regenerate"
              >
                {busy === k ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
              </button>
            </div>
          </div>
          <div className="text-xs whitespace-pre-wrap leading-relaxed">{extras[k]}</div>
        </Card>
      ))}
    </aside>
  );
}
