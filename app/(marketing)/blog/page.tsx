import Link from "next/link";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

export const metadata = {
  title: "Blog — Script writing tips for freelancers",
  description:
    "Practical guides on writing YouTube, TikTok, and Reels scripts faster. Tips on client management, AI tools, hooks, and script structure for freelancers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Scribtly",
    title: "Blog · Scribtly",
    description:
      "Practical guides on writing YouTube, TikTok, and Reels scripts faster for freelancers and content agencies.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Scribtly",
    description:
      "Practical guides on writing YouTube, TikTok, and Reels scripts faster for freelancers and content agencies.",
    images: ["/og-image.svg"],
  },
};

const PER_PAGE = 12;

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));

  let posts: { slug: string; title: string; excerpt: string; tags: string[]; readingMins: number; publishedAt: Date }[] = [];
  let total = 0;
  try {
    [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * PER_PAGE,
        take: PER_PAGE,
        select: {
          slug: true,
          title: true,
          excerpt: true,
          tags: true,
          readingMins: true,
          publishedAt: true,
        },
      }),
      prisma.blogPost.count({ where: { published: true } }),
    ]);
  } catch {
    // DB not available at build time
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Scribtly Blog",
    description: "Script writing tips, freelancer guides, and AI tools for content creators.",
    url: `${BASE_URL}/blog`,
    publisher: { "@type": "Organization", name: "Scribtly", url: BASE_URL },
    ...(posts.length > 0 && {
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${BASE_URL}/blog/${p.slug}`,
        datePublished: p.publishedAt.toISOString(),
      })),
    }),
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-5xl mx-auto px-5 pt-16 pb-20">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Blog</h1>
      <p className="text-sm text-text-secondary dark:text-dark-muted mb-10">
        Script writing tips, freelancer guides, and AI tools for content creators.
      </p>

      {posts.length === 0 ? (
        <p className="text-sm text-text-secondary dark:text-dark-muted">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-hair border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium uppercase tracking-wide text-text-secondary dark:text-dark-muted bg-[var(--color-bg)] border-hair border-[var(--color-border)] rounded px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-text-secondary dark:text-dark-muted line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-[10px] text-text-secondary dark:text-dark-muted">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingMins} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12 text-sm">
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}`}
              className="px-3 py-1.5 border-hair border-[var(--color-border)] rounded hover:border-primary/40 transition-colors"
            >
              ← Previous
            </Link>
          )}
          <span className="text-text-secondary dark:text-dark-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/blog?page=${page + 1}`}
              className="px-3 py-1.5 border-hair border-[var(--color-border)] rounded hover:border-primary/40 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
    </>
  );
}
