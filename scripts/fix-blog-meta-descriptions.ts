/**
 * One-time script to fix blog post meta descriptions that exceeded 155 chars.
 * Run with: npx ts-node scripts/fix-blog-meta-descriptions.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = [
  {
    slug: "broll-notes-in-video-scripts",
    metaDescription:
      "B-roll notes tell editors exactly what to cut to — saving time, preventing bad edits, and making your deliverable more useful. Here's how to write them.",
  },
  {
    slug: "client-voice-profile-guide-for-script-writers",
    metaDescription:
      "A good client voice profile means every script sounds like them, not like you. Here's how to capture tone, phrases, and audience in a format you can reuse.",
  },
];

async function main() {
  console.log("Updating blog post meta descriptions...");

  for (const update of updates) {
    const result = await prisma.blogPost.updateMany({
      where: { slug: update.slug },
      data: { metaDescription: update.metaDescription },
    });
    if (result.count > 0) {
      console.log(`  ✓  updated: ${update.slug} (${update.metaDescription.length} chars)`);
    } else {
      console.log(`  ↩  not found: ${update.slug}`);
    }
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
