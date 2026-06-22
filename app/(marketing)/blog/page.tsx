import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly Blog — Script Writing Guides & Resources",
  description:
    "Practical guides for freelancers, creators, and agencies on video script writing, client voice, hooks, platform formats, and content workflows.",
  alternates: {
    canonical: "https://scribtly.com/blog",
  },
};

const posts = [
  {
    slug: "how-to-write-a-video-script",
    title: "How to Write a Video Script: The Complete Guide",
    description:
      "Hook, structure, platform formats, client voice, and B-roll notes. Everything you need to write scripts that hold attention.",
    date: "22 June 2026",
    tag: "Script Writing Guide",
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
          <Link
            href="/"
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--text-muted)" }}
            >
              Pricing
            </Link>
          </div>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Resources
          </p>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Script Writing Guides
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Practical guides for freelancers, creators, and agencies who want to
            write better scripts, build client workflows, and stop starting from a
            blank page.
          </p>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border p-6 block transition-all hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-subtle)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    background: "rgba(224,120,48,0.08)",
                    borderColor: "rgba(224,120,48,0.25)",
                    color: "var(--accent)",
                  }}
                >
                  {post.tag}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h2
                className="text-lg font-bold mb-2 group-hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {post.description}
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                Read guide <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t mt-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link
            href="/"
            className="font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
