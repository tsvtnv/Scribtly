import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) { console.error("OPENAI_API_KEY env var is required"); process.exit(1); }
const MODEL = "gpt-image-2-2026-04-21";
const OUT_DIR = join(__dirname, "..", "public", "brand");

const IMAGES = [
  {
    name: "og-hero",
    size: "1536x1024",
    prompt: `Marketing hero image for "Scribtly" — an AI video script writing platform for freelancers and social media agencies.
Style: clean, modern, minimal flat design.
Color palette: rich purple (#7F77DD) as dominant accent on a warm cream/off-white (#F1EFE8) background.
The image shows a sleek floating UI card — a dark panel labeled "Scribtly" with glowing purple lines representing AI-generated video script text, formatted like sections (Hook, Intro, Story Beat, CTA).
On the side, subtle icons for YouTube, TikTok, Reels, LinkedIn.
Typography feel: modern sans-serif. No photorealistic people. No watermarks. No text logos embedded.`
  },
  {
    name: "feature-voice",
    size: "1024x1024",
    prompt: `Illustration for "Write in your client's exact voice" feature of Scribtly, an AI video script platform.
Style: minimal, modern, slightly isometric illustration. Warm cream background (#F1EFE8). Purple (#7F77DD) and soft violet accents.
Shows two floating cards side by side — left card says "Client: Sarah's Fitness" with small personality traits (Energetic, Motivational, Direct). Right card shows a clean formatted script output with a purple glowing cursor at the end.
An elegant curved purple arrow connects left to right, symbolising voice capture to AI generation.
No people. No watermarks. Crisp vector-art aesthetic.`
  },
  {
    name: "feature-platforms",
    size: "1024x1024",
    prompt: `Illustration for "One script, every platform" feature of Scribtly, an AI video script generator.
Style: minimal, modern, flat design. Warm cream background (#F1EFE8). Purple (#7F77DD) primary accent.
Shows 5 floating rounded rectangles arranged in a gentle arc, each representing a platform: YouTube (red), TikTok (black), Instagram Reels (pink gradient), LinkedIn (blue), Podcast (purple).
Each rectangle has a small formatted script preview inside with a subtle purple glow.
Clean, no people, no watermarks. Feels premium and modern.`
  },
  {
    name: "social-banner",
    size: "1536x1024",
    prompt: `Twitter/LinkedIn social media banner for "Scribtly" — AI video scripts for freelancers.
Style: bold, modern, gradient. Left side: deep purple (#7F77DD) to dark indigo gradient background. Right side: cream (#F1EFE8) panel with a floating dark UI card showing formatted AI script lines (Hook, Intro, CTA) glowing softly.
Large bold text space on left for overlaying tagline. The overall feel is premium SaaS — clean, confident, and modern.
No faces, no people, no watermarks. No embedded text.`
  },
  {
    name: "feature-library",
    size: "1024x1024",
    prompt: `Illustration for "Your script library" feature of Scribtly, an AI script platform for agencies.
Style: minimal, clean, modern. Warm cream background (#F1EFE8). Purple (#7F77DD) accents.
Shows a grid of small floating script cards, each with a tiny platform badge (YouTube, TikTok, etc.) and a client name label. Cards cast soft shadows. A search bar floats at top with a subtle purple glow. One card is highlighted/selected with a purple border and glow.
No people. Vector-art style. Premium SaaS feel.`
  },
];

async function generateImage(spec) {
  console.log(`\nGenerating: ${spec.name} (${spec.size})...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: spec.prompt,
      n: 1,
      size: spec.size,
      quality: "high",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error for ${spec.name}: ${res.status} ${err}`);
  }

  const data = await res.json();

  // Handle both b64_json and url response formats
  let buf;
  if (data.data[0].b64_json) {
    buf = Buffer.from(data.data[0].b64_json, "base64");
  } else {
    const imgUrl = data.data[0].url;
    console.log(`  Downloading from URL...`);
    const imgRes = await fetch(imgUrl);
    const arrBuf = await imgRes.arrayBuffer();
    buf = Buffer.from(arrBuf);
  }

  const outPath = join(OUT_DIR, `${spec.name}.png`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ Saved to public/brand/${spec.name}.png`);
  return outPath;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log("Scribtly brand image generation — GPT Image 2");
  console.log("=".repeat(50));

  const results = [];
  for (const spec of IMAGES) {
    try {
      const path = await generateImage(spec);
      results.push({ name: spec.name, path, ok: true });
    } catch (err) {
      console.error(`  ✗ Failed ${spec.name}:`, err.message);
      results.push({ name: spec.name, ok: false, error: err.message });
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Done!");
  results.forEach(r => {
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.name}${r.error ? " — " + r.error : ""}`);
  });
}

main().catch(console.error);
