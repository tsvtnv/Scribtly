"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Client, Platform } from "@prisma/client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { getTonePresets } from "@/lib/buildPrompt";

const PLATFORMS: Platform[] = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"];
const PLATFORM_LABEL: Record<Platform, string> = {
  YOUTUBE: "YouTube",
  TIKTOK: "TikTok",
  REELS: "Instagram Reels",
  LINKEDIN: "LinkedIn",
  PODCAST: "Podcast",
};

const SWATCHES = ["#7F77DD", "#F0997B", "#ED93B1", "#85B7EB", "#AFA9EC", "#1D9E75", "#BA7517", "#E24B4A"];

type Mode = "create" | "edit";

export function ClientForm({ mode, initial }: { mode: Mode; initial?: Client }) {
  const router = useRouter();
  const toast = useToast();
  const tonePresets = getTonePresets();

  const [name, setName] = useState(initial?.name ?? "");
  const [niche, setNiche] = useState(initial?.niche ?? "");
  const [targetAudience, setTargetAudience] = useState(initial?.targetAudience ?? "");
  const [toneMode, setToneMode] = useState<"preset" | "custom">(() => {
    const match = initial?.toneOfVoice && tonePresets.find((t) => t.label === initial.toneOfVoice || t.id === initial.toneOfVoice);
    return match ? "preset" : initial ? "custom" : "preset";
  });
  const [tonePreset, setTonePreset] = useState(() => {
    const match = initial?.toneOfVoice ? tonePresets.find((t) => t.label === initial.toneOfVoice || t.id === initial.toneOfVoice) : undefined;
    return match?.label || tonePresets[0].label;
  });
  const [toneCustom, setToneCustom] = useState(initial && toneMode === "custom" ? initial.toneOfVoice : "");
  const [examplePhrases, setExamplePhrases] = useState(initial?.examplePhrases ?? "");
  const [avoidTopics, setAvoidTopics] = useState(initial?.avoidTopics ?? "");
  const [primaryPlatform, setPrimaryPlatform] = useState<Platform>(initial?.primaryPlatform ?? "YOUTUBE");
  const [avatarColor, setAvatarColor] = useState(initial?.avatarColor ?? "#7F77DD");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const toneOfVoice = toneMode === "preset" ? tonePreset : toneCustom.trim();
    const payload = {
      name,
      niche,
      targetAudience,
      toneOfVoice,
      examplePhrases: examplePhrases.trim() || null,
      avoidTopics: avoidTopics.trim() || null,
      primaryPlatform,
      avatarColor,
    };
    try {
      const url = mode === "create" ? "/api/clients" : `/api/clients/${initial!.id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.code === "upgrade_required") {
          toast.push("Upgrade your plan to add more clients", "error");
        } else {
          toast.push(body.error || "Save failed", "error");
        }
        return;
      }
      if (mode === "create") {
        toast.push("Client created", "success");
        router.push("/clients");
        router.refresh();
      } else {
        toast.push("Saved", "success");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/clients/${initial.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.push("Client deleted", "success");
        router.push("/clients");
        router.refresh();
      } else {
        toast.push("Delete failed", "error");
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <Card className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Client name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Their niche</label>
          <Input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness coach, travel blogger, SaaS founder"
            required
            maxLength={200}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Their target audience</label>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. busy professionals aged 30-45 who want to get fit without going to the gym"
            required
            maxLength={600}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tone of voice</label>
          <div className="flex items-center gap-2 mb-2 text-xs">
            <button type="button" onClick={() => setToneMode("preset")} className={toneMode === "preset" ? "text-primary font-medium" : "text-text-secondary"}>Presets</button>
            <span className="text-text-secondary">·</span>
            <button type="button" onClick={() => setToneMode("custom")} className={toneMode === "custom" ? "text-primary font-medium" : "text-text-secondary"}>Custom</button>
          </div>
          {toneMode === "preset" ? (
            <Select value={tonePreset} onChange={(e) => setTonePreset(e.target.value)}>
              {tonePresets.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label} — {t.description}
                </option>
              ))}
            </Select>
          ) : (
            <Textarea
              value={toneCustom}
              onChange={(e) => setToneCustom(e.target.value)}
              placeholder="Describe the tone in their own words"
              required
              maxLength={600}
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Example phrases they use (optional)</label>
          <Textarea
            value={examplePhrases}
            onChange={(e) => setExamplePhrases(e.target.value)}
            placeholder="e.g. 'no fluff', 'let's get into it', 'real talk'"
            maxLength={1000}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Topics to never mention (optional)</label>
          <Textarea
            value={avoidTopics}
            onChange={(e) => setAvoidTopics(e.target.value)}
            placeholder="e.g. competitor names, diet culture, political topics"
            maxLength={1000}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Primary platform</label>
          <Select value={primaryPlatform} onChange={(e) => setPrimaryPlatform(e.target.value as Platform)}>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Profile colour</label>
          <div className="flex flex-wrap gap-2 items-center">
            {SWATCHES.map((sw) => (
              <button
                key={sw}
                type="button"
                onClick={() => setAvatarColor(sw)}
                className={`w-8 h-8 rounded-full border-2 ${avatarColor.toUpperCase() === sw.toUpperCase() ? "border-text-primary dark:border-dark-text" : "border-transparent"}`}
                style={{ background: sw }}
                aria-label={`Select colour ${sw}`}
              />
            ))}
            <Input
              value={avatarColor}
              onChange={(e) => setAvatarColor(e.target.value)}
              className="w-28 h-8 text-xs ml-2"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" loading={saving}>
          {mode === "create" ? "Create client" : "Save changes"}
        </Button>
      </div>

      {mode === "edit" && initial ? (
        <Card className="border-danger/30">
          <h3 className="text-sm font-medium text-danger mb-2">Danger zone</h3>
          <p className="text-xs text-text-secondary dark:text-dark-muted mb-3">
            Delete this client. Their scripts will remain in your library but won't be linked to a client.
          </p>
          {!deleteConfirm ? (
            <Button type="button" variant="danger" size="sm" onClick={() => setDeleteConfirm(true)}>
              Delete client
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button type="button" variant="danger" size="sm" loading={deleting} onClick={onDelete}>
                Confirm delete
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Card>
      ) : null}
    </form>
  );
}
