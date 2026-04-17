import plansConfig from "@/config/plans.config.json";
import type { Plan, Platform } from "@prisma/client";

type PlanKey = "FREE" | "PRO" | "AGENCY";

interface PlanEntry {
  label: string;
  price_gbp: number;
  script_limit: number;
  client_limit: number;
  platforms: string[];
  extras_enabled: boolean;
  pdf_export: boolean;
  member_limit: number;
  bulk_generation?: boolean;
  priority_support?: boolean;
}

const plans = plansConfig as Record<PlanKey, PlanEntry>;

export function getPlanConfig(plan: Plan): PlanEntry {
  return plans[plan];
}

export function canGenerateScript(workspace: { plan: Plan; scriptCount: number }): boolean {
  const cfg = plans[workspace.plan];
  if (cfg.script_limit === -1) return true;
  return workspace.scriptCount < cfg.script_limit;
}

export function getRemainingScripts(workspace: { plan: Plan; scriptCount: number }): number {
  const cfg = plans[workspace.plan];
  if (cfg.script_limit === -1) return Infinity;
  return Math.max(0, cfg.script_limit - workspace.scriptCount);
}

export function canUsePlatform(workspace: { plan: Plan }, platform: Platform): boolean {
  return plans[workspace.plan].platforms.includes(platform);
}

export function allowedPlatforms(plan: Plan): string[] {
  return plans[plan].platforms;
}

export function canUseExtras(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].extras_enabled;
}

export function canExportPDF(workspace: { plan: Plan }): boolean {
  return plans[workspace.plan].pdf_export;
}

export function canAddClient(workspace: { plan: Plan }, currentClientCount: number): boolean {
  const cfg = plans[workspace.plan];
  if (cfg.client_limit === -1) return true;
  return currentClientCount < cfg.client_limit;
}

export function canInviteMembers(workspace: { plan: Plan }): boolean {
  return workspace.plan === "AGENCY";
}

export function canBulkGenerate(workspace: { plan: Plan }): boolean {
  return workspace.plan === "AGENCY";
}

export function getMaxMembers(plan: Plan): number {
  return plans[plan].member_limit;
}
