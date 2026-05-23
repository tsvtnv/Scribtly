import type { Plan } from "@prisma/client";
import { getPlanConfig } from "@/lib/planLimits";

export type ModelTier = "STANDARD" | "QUALITY" | "PREMIUM";

export const CLAUDE_MODELS = {
  STANDARD: {
    id: "claude-haiku-4-5-20251001",
    label: "Standard",
    description: "Fast, great for TikTok and short scripts",
    tier: "standard",
  },
  QUALITY: {
    id: "claude-sonnet-4-5-20250929",
    label: "Quality",
    description: "Balanced quality for most scripts",
    tier: "quality",
  },
  PREMIUM: {
    id: "claude-opus-4-5-20251101",
    label: "Premium",
    description: "Best for long YouTube scripts and complex topics",
    tier: "premium",
  },
} as const;

export type ClaudeModelKey = keyof typeof CLAUDE_MODELS;

export const DEFAULT_CLAUDE_MODEL: ClaudeModelKey = "STANDARD";

const LEGACY_ALIASES: Record<string, ClaudeModelKey> = {
  HAIKU: "STANDARD",
  SONNET: "QUALITY",
  OPUS: "PREMIUM",
};

export function normalizeClaudeModelKey(value?: string | null): ClaudeModelKey | null {
  if (!value) return DEFAULT_CLAUDE_MODEL;
  const key = value.toUpperCase();
  if (key in CLAUDE_MODELS) return key as ClaudeModelKey;
  if (key in LEGACY_ALIASES) return LEGACY_ALIASES[key];
  return null;
}

export function canUseClaudeModel(plan: Plan, model: ClaudeModelKey): boolean {
  const allowed = getPlanConfig(plan).models;
  return allowed.includes(model);
}

export function getClaudeModelId(model: ClaudeModelKey): string {
  return CLAUDE_MODELS[model].id;
}

export function getClaudeModelLabel(model: ClaudeModelKey): string {
  return CLAUDE_MODELS[model].label;
}
