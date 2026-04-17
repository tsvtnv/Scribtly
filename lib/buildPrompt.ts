import promptsConfig from "@/config/prompts.config.json";
import type { Client, Platform } from "@prisma/client";

interface PlatformConfig {
  label: string;
  durations: string[];
  structure_prompt: string;
  hook_styles: string[];
  extra_outputs: string[];
}

interface PromptsConfig {
  model: string;
  max_tokens: number;
  stream: boolean;
  system_base: string;
  client_voice_template: string;
  platforms: Record<string, PlatformConfig>;
  extras_prompts: Record<string, string>;
  quality_rules: string[];
  tone_presets: { id: string; label: string; description: string }[];
}

const config = promptsConfig as unknown as PromptsConfig;

export interface BuildPromptInput {
  client: Pick<Client, "name" | "niche" | "targetAudience" | "toneOfVoice" | "examplePhrases" | "avoidTopics">;
  platform: Platform;
  topic: string;
  duration: string;
  hookStyle?: string | null;
  extraOutputs?: string[];
  model?: string;
}

export interface BuiltPrompt {
  system: string;
  userMessage: string;
  model: string;
  max_tokens: number;
}

function fillClientVoice(template: string, client: BuildPromptInput["client"]): string {
  return template
    .replace("{{client_name}}", client.name)
    .replace("{{client_niche}}", client.niche)
    .replace("{{client_audience}}", client.targetAudience)
    .replace("{{client_tone}}", client.toneOfVoice)
    .replace("{{client_phrases}}", client.examplePhrases?.trim() || "(none specified)")
    .replace("{{client_avoid}}", client.avoidTopics?.trim() || "(none specified)");
}

export function buildPrompt(input: BuildPromptInput): BuiltPrompt {
  const platformCfg = config.platforms[input.platform];
  if (!platformCfg) throw new Error(`Unknown platform: ${input.platform}`);

  const system = `${config.system_base}\n\n${fillClientVoice(config.client_voice_template, input.client)}`;

  const structurePrompt = platformCfg.structure_prompt
    .replace("{{topic}}", input.topic)
    .replace("{{duration}}", input.duration);

  const hookLine = input.hookStyle
    ? `\n\nHook style to use: ${input.hookStyle.replace(/_/g, " ")}.`
    : "";

  const qualityBlock =
    "\n\nQuality rules — always follow these:\n" + config.quality_rules.map((r) => `- ${r}`).join("\n");

  let userMessage = structurePrompt + hookLine + qualityBlock;

  if (input.extraOutputs && input.extraOutputs.length > 0) {
    const extrasBlocks = input.extraOutputs
      .filter((key) => config.extras_prompts[key])
      .map((key) => `\n\n---\n\nAdditionally, after the script, generate the following — label each clearly with [${key.toUpperCase()}]:\n${config.extras_prompts[key]}`)
      .join("");
    userMessage += extrasBlocks;
  }

  return {
    system,
    userMessage,
    model: input.model || config.model,
    max_tokens: config.max_tokens,
  };
}

export function getPlatformConfig(platform: Platform): PlatformConfig {
  return config.platforms[platform];
}

export function getTonePresets() {
  return config.tone_presets;
}

export function getExtrasPrompt(key: string): string | undefined {
  return config.extras_prompts[key];
}
