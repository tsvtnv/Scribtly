import plansConfig from "@/config/plans.config.json";
import type { Plan, Platform } from "@prisma/client";

type PlanKey = "FREE" | "BASIC" | "PRO" | "AGENCY" | "ENTERPRISE";
type ModelTier = "STANDARD" | "QUALITY" | "PREMIUM";

interface PlanEntry {
  label: string;
  price_gbp: number;
  scripts_per_month: number;
  client_limit: number;
  models: ModelTier[];
  platforms: string[];
  pipeline: boolean;
  calendar: boolean;
  pdf_export: boolean;
  extras_enabled: boolean;
  team_members: number;
  bulk_generation: boolean;
  priority_support: boolean;
}

const plans = plansConfig as Record<PlanKey, PlanEntry>;

export function getPlanConfig(plan: Plan): PlanEntry {
  return plans[plan];
}

// ---- Script quota ----
export function getScriptLimit(plan: Plan): number {
  return plans[plan].scripts_per_month;
}

export function getRemainingScripts(workspace: { plan: Plan; scriptCount: number }): number {
  return Math.max(0, plans[workspace.plan].scripts_per_month - workspace.scriptCount);
}

export function canGenerateScript(workspace: { plan: Plan; scriptCount: number }): boolean {
  return workspace.scriptCount < plans[workspace.plan].scripts_per_month;
}

export function hasReachedScriptLimit(workspace: { plan: Plan; scriptCount: number }): boolean {
  return workspace.scriptCount >= plans[workspace.plan].scripts_per_month;
}

export function isNearScriptLimit(workspace: { plan: Plan; scriptCount: number }): boolean {
  return workspace.scriptCount >= plans[workspace.plan].scripts_per_month * 0.8;
}

// ---- Clients ----
export function getClientLimit(plan: Plan): number {
  return plans[plan].client_limit;
}

export function canAddClient(workspace: { plan: Plan }, currentClientCount: number): boolean {
  const limit = plans[workspace.plan].client_limit;
  if (limit === -1) return true;
  return currentClientCount < limit;
}

// ---- Models ----
export function getAvailableModels(plan: Plan): ModelTier[] {
  return plans[plan].models;
}

export function canUseAllModels(plan: Plan): boolean {
  return plans[plan].models.length > 1;
}

// ---- Features ----
export function canAccessPipeline(plan: Plan): boolean {
  return plans[plan].pipeline;
}

export function canAccessCalendar(plan: Plan): boolean {
  return plans[plan].calendar;
}

export function canExportPDF(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].pdf_export;
}

export function canUseExtras(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].extras_enabled;
}

export function canBulkGenerate(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].bulk_generation;
}

export function canUsePlatform(workspace: { plan: Plan }, platform: Platform): boolean {
  return plans[workspace.plan].platforms.includes(platform);
}

export function allowedPlatforms(plan: Plan): string[] {
  return plans[plan].platforms;
}

// ---- Team ----
export function getTeamMemberLimit(plan: Plan): number {
  return plans[plan].team_members;
}

export function getMaxMembers(plan: Plan): number {
  const limit = plans[plan].team_members;
  return limit === -1 ? 999 : limit;
}

export function canInviteMembers(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].team_members > 1 || plans[workspace.plan].team_members === -1;
}
