import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Script Writing Blog | Scribtly",
  description:
    "Practical guides for freelance script writers, content creators, and agencies. Tips on client voice, hooks, platforms, and faster script workflows.",
  alternates: { canonical: "https://scribtly.com/blog" },
};

const posts = [
  {
    slug: "how-to-write-in-a-clients-voice",
    title: "How to Write Scripts in a Client's Voice",
    excerpt:
      "One of the hardest parts of writing scripts for clients is capturing their voice accurately. Here's a practical framework that actually works.",
    date: "2 July 2026",
    readTime: "8 min read",
    category: "Freelance Script Writing",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="px-6 pt-16 pb-10 max-w-5xl mx-auto">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--accent)" }}
        >
          Resources
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Script Writing Blog
        </h1>
        <p className="text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
          Practical guides for freelancers, creators, and agencies writing better scripts
          in less time.
        </p>
      </header>

      {/* Posts */}
      <main className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border p-8 flex flex-col gap-3 transition-all hover:shadow-md"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
                >
                  {post.category}
                </span>
              </div>
              <h2
                className="text-xl font-bold group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {post.excerpt}
              </p>
              <div
                className="flex items-center gap-4 text-xs pt-1"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span>{post.readTime}</span>
                <span
                  className="ml-auto flex items-center gap-1 font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--dark)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stop writing scripts from scratch
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Save your client's voice once. Generate client-ready scripts in under 60 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <span>© 2026 Scribtly. All rights reserved. · </span>
        <Link href="/" className="underline" style={{ color: "var(--accent)" }}>
          Home
        </Link>
        {" · "}
        <Link href="/blog" className="underline" style={{ color: "var(--accent)" }}>
          Blog
        </Link>
      </footer>
    </div>
  );
}
