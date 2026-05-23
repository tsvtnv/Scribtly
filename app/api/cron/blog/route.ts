import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { buildBlogPrompt } from "@/lib/buildBlogPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type BlogPostJson = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  tags: string[];
  readingMins: number;
  content: string;
};

function isValidBlogPost(data: unknown): data is BlogPostJson {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.slug === "string" &&
    typeof d.title === "string" &&
    typeof d.metaDescription === "string" &&
    typeof d.excerpt === "string" &&
    Array.isArray(d.tags) &&
    typeof d.readingMins === "number" &&
    typeof d.content === "string" &&
    d.slug.length > 0 &&
    d.title.length > 0
  );
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let suffix = 2;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix++;
  }
  return slug;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recentTitles = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: { title: true },
  });

  const { system, userMessage } = buildBlogPrompt(
    recentTitles.map((p) => p.title)
  );

  let parsed: BlogPostJson;
  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system,
      messages: [{ role: "user", content: userMessage }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    parsed = JSON.parse(text);

    if (!isValidBlogPost(parsed)) {
      throw new Error("Invalid blog post shape from Claude");
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron/blog] Generation error:", msg);
    return NextResponse.json(
      { error: "Generation failed", detail: msg },
      { status: 500 }
    );
  }

  const slug = await uniqueSlug(parsed.slug);

  try {
    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: parsed.title,
        metaDescription: parsed.metaDescription,
        excerpt: parsed.excerpt,
        content: parsed.content,
        tags: parsed.tags,
        readingMins: parsed.readingMins,
      },
    });

    return NextResponse.json({
      success: true,
      slug: post.slug,
      title: post.title,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron/blog] DB error:", msg);
    return NextResponse.json(
      { error: "Database write failed", detail: msg },
      { status: 500 }
    );
  }
}
