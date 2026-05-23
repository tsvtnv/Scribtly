import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { Button } from "@/components/ui/Button";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    select: { title: true, metaDescription: true, slug: true, publishedAt: true },
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "Scribtly",
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt.toISOString(),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  const html = markdownToHtml(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-2xl mx-auto px-5 pt-16 pb-20">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-xs text-text-secondary dark:text-dark-muted hover:text-primary transition-colors"
          >
            ← Blog
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium uppercase tracking-wide text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border-hair border-[var(--color-border)] rounded px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-text-secondary dark:text-dark-muted mb-10 pb-8 border-b-hair border-[var(--color-border)]">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingMins} min read</span>
        </div>

        <div
          className="prose prose-sm max-w-none text-[var(--color-text)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 p-6 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-center">
          <h2 className="font-semibold mb-2">Generate scripts like this in 60 seconds</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            Scribtly writes YouTube, TikTok, and Reels scripts in your client's exact voice. Free to start.
          </p>
          <Link href="/signup">
            <Button size="lg">Start free</Button>
          </Link>
        </div>
      </article>
    </>
  );
}
