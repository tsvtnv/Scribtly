import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Script Writing Blog | Scribtly",
  description: "Practical guides on writing video scripts for YouTube, TikTok, Reels, LinkedIn, and more. For freelancers, creators, and agencies.",
  alternates: {
    canonical: "https://scribtly.com/blog",
  },
};

const posts = [
  {
    slug: "how-to-write-a-video-script",
    title: "How to Write a Video Script That People Actually Watch",
    description:
      "A complete guide to video script structure — hooks, body sections, CTAs, formatting, and platform differences for YouTube, TikTok, Reels, and LinkedIn.",
    category: "Script Writing Guide",
    date: "14 July 2026",
    readTime: "12 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 text-white"
            style={{ background: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          Scribtly Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Script writing guides for creators and freelancers
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Practical advice on hooks, structure, client voice, platform formats, and everything else
          that goes into a video script that actually works.
        </p>
      </header>

      {/* Posts */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border p-8 transition-all hover:shadow-md"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
                >
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {post.date}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  · {post.readTime}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-3 group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                {post.description}
              </p>
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Read the guide
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
