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

const CONTENT_GOALS = [
  { value: "", label: "Not specified" },
  { value: "Grow audience", label: "Grow audience" },
  { value: "Sell products or services", label: "Sell products or services" },
  { value: "Build authority and credibility", label: "Build authority and credibility" },
  { value: "Drive traffic to website", label: "Drive traffic to website" },
  { value: "Build community engagement", label: "Build community engagement" },
  { value: "Educate and inform", label: "Educate and inform" },
  { value: "Entertain", label: "Entertain" },
  { value: "Generate leads", label: "Generate leads" },
];

const VIDEO_PACES = [
  { value: "", label: "Not specified" },
  { value: "Fast-paced with quick cuts", label: "Fast-paced (quick cuts, high energy)" },
  { value: "Medium-paced and conversational", label: "Medium (conversational, balanced)" },
  { value: "Slow and deliberate", label: "Slow and deliberate (educational depth)" },
];

const LANGUAGE_STYLES = [
  { value: "", label: "Not specified" },
  { value: "Casual and conversational", label: "Casual and conversational" },
  { value: "Professional and polished", label: "Professional and polished" },
  { value: "Formal and academic", label: "Formal and academic" },
  { value: "Slang-heavy and street", label: "Slang-heavy / street" },
  { value: "Humorous and playful", label: "Humorous and playful" },
  { value: "Inspirational and motivational", label: "Inspirational and motivational" },
  { value: "Raw and unfiltered", label: "Raw and unfiltered" },
];

const CTA_STYLES = [
  { value: "", label: "Not specified" },
  { value: "Soft nudge — comment or share your thoughts", label: "Soft nudge (comment / share thoughts)" },
  { value: "Direct — buy now / sign up / click the link", label: "Direct (buy now / sign up / link)" },
  { value: "Question-based — ask the audience a question", label: "Question-based (ask the audience)" },
  { value: "No explicit CTA", label: "No explicit CTA" },
];

const POSTING_FREQUENCIES = [
  { value: "", label: "Not specified" },
  { value: "Daily", label: "Daily" },
  { value: "3-4 times per week", label: "3–4x per week" },
  { value: "Weekly", label: "Weekly" },
  { value: "Bi-weekly", label: "Bi-weekly" },
  { value: "Monthly", label: "Monthly" },
];

type Mode = "create" | "edit";

export function ClientForm({ mode, initial }: { mode: Mode; initial?: Client }) {
  const router = useRouter();
  const toast = useToast();
  const tonePresets = getTonePresets();

  // Core fields
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

  // Extended fields
  const [contentGoal, setContentGoal] = useState(initial?.contentGoal ?? "");
  const [videoPace, setVideoPace] = useState(initial?.videoPace ?? "");
  const [languageStyle, setLanguageStyle] = useState(initial?.languageStyle ?? "");
  const [ctaStyle, setCtaStyle] = useState(initial?.ctaStyle ?? "");
  const [brandKeywords, setBrandKeywords] = useState(initial?.brandKeywords ?? "");
  const [competitorNames, setCompetitorNames] = useState(initial?.competitorNames ?? "");
  const [postingFrequency, setPostingFrequency] = useState(initial?.postingFrequency ?? "");
  const [contentPillars, setContentPillars] = useState(initial?.contentPillars ?? "");

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
      contentGoal: contentGoal || null,
      videoPace: videoPace || null,
      languageStyle: languageStyle || null,
      ctaStyle: ctaStyle || null,
      brandKeywords: brandKeywords.trim() || null,
      competitorNames: competitorNames.trim() || null,
      postingFrequency: postingFrequency || null,
      contentPillars: contentPillars.trim() || null,
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
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      {/* Core identity */}
      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-text-secondary dark:text-dark-muted uppercase tracking-wider">Identity</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Client name <span className="text-danger">*</span></label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
          <p className="text-xs text-text-secondary mt-1">{name.length}/120</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Their niche <span className="text-danger">*</span></label>
          <Input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness coach, travel blogger, SaaS founder"
            required
            maxLength={200}
          />
          <p className="text-xs text-text-secondary mt-1">{niche.length}/200</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Target audience <span className="text-danger">*</span></label>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. busy professionals aged 30-45 who want to get fit without going to the gym"
            required
            maxLength={600}
          />
          <p className="text-xs text-text-secondary mt-1">{targetAudience.length}/600</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Primary platform <span className="text-danger">*</span></label>
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

      {/* Voice and style */}
      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-text-secondary dark:text-dark-muted uppercase tracking-wider">Voice & Style</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tone of voice <span className="text-danger">*</span></label>
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
          <label className="block text-sm font-medium mb-1.5">Language style</label>
          <Select value={languageStyle} onChange={(e) => setLanguageStyle(e.target.value)}>
            {LANGUAGE_STYLES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
          <p className="text-xs text-text-secondary mt-1">How formal or casual their language is — layered on top of tone of voice.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Example phrases they use (optional)</label>
          <Textarea
            value={examplePhrases}
            onChange={(e) => setExamplePhrases(e.target.value)}
            placeholder="e.g. 'no fluff', 'let's get into it', 'real talk'"
            maxLength={1000}
          />
          <p className="text-xs text-text-secondary mt-1">{examplePhrases.length}/1000 — specific catchphrases help match their voice exactly</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Brand keywords (optional)</label>
          <Input
            value={brandKeywords}
            onChange={(e) => setBrandKeywords(e.target.value)}
            placeholder="e.g. 'sustainable', 'science-backed', 'no shortcuts'"
            maxLength={500}
          />
          <p className="text-xs text-text-secondary mt-1">Words or phrases that define their brand — AI will weave these in naturally.</p>
        </div>
      </Card>

      {/* Content strategy */}
      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-text-secondary dark:text-dark-muted uppercase tracking-wider">Content Strategy</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Content goal</label>
          <Select value={contentGoal} onChange={(e) => setContentGoal(e.target.value)}>
            {CONTENT_GOALS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
          <p className="text-xs text-text-secondary mt-1">The primary objective behind every piece of content — shapes how scripts are angled.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Content pillars / themes (optional)</label>
          <Textarea
            value={contentPillars}
            onChange={(e) => setContentPillars(e.target.value)}
            placeholder="e.g. workout tips, nutrition myths, mindset, client transformations"
            maxLength={600}
          />
          <p className="text-xs text-text-secondary mt-1">{contentPillars.length}/600 — recurring topics or buckets this client covers</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Video / content pace</label>
          <Select value={videoPace} onChange={(e) => setVideoPace(e.target.value)}>
            {VIDEO_PACES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">CTA style</label>
          <Select value={ctaStyle} onChange={(e) => setCtaStyle(e.target.value)}>
            {CTA_STYLES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Posting frequency</label>
          <Select value={postingFrequency} onChange={(e) => setPostingFrequency(e.target.value)}>
            {POSTING_FREQUENCIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
          <p className="text-xs text-text-secondary mt-1">Helps auto-generate schedules and cron timing.</p>
        </div>
      </Card>

      {/* Restrictions */}
      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-text-secondary dark:text-dark-muted uppercase tracking-wider">Restrictions</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Topics to never mention (optional)</label>
          <Textarea
            value={avoidTopics}
            onChange={(e) => setAvoidTopics(e.target.value)}
            placeholder="e.g. diet culture, political topics, anything health-claim related"
            maxLength={1000}
          />
          <p className="text-xs text-text-secondary mt-1">{avoidTopics.length}/1000</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Competitor names to never mention (optional)</label>
          <Input
            value={competitorNames}
            onChange={(e) => setCompetitorNames(e.target.value)}
            placeholder="e.g. Brand A, Brand B"
            maxLength={500}
          />
          <p className="text-xs text-text-secondary mt-1">Kept strictly out of all generated content.</p>
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
            Delete this client. Their scripts will remain in your library but won&apos;t be linked to a client.
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
