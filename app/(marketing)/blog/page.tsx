import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Script Writing Tips for Freelancers & Creators | Scribtly",
  description: "Practical guides on video script writing, client voice, hooks, platforms, and content workflows for freelancers, agencies, and content creators.",
};

const posts = [
  {
    slug: "how-to-write-scripts-in-your-clients-voice",
    category: "Freelance Workflow",
    title: "How to Write Video Scripts in Your Client's Voice",
    excerpt:
      "If you write scripts for multiple clients, you know the real challenge isn't the structure — it's sounding like the right person. Here's how to capture client voice once and use it on every script.",
    readTime: "8 min read",
    date: "9 Jul 2026",
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
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Scribtly Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Script writing guides for creators and freelancers
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)", maxWidth: "560px" }}>
            Practical articles on hooks, client voice, platform-specific scripts, and content workflows. No filler.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border p-8 transition-all hover:shadow-lg"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
                >
                  {post.category}
                </span>
                <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {post.date}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                Read article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Stop writing scripts from a blank page
          </h2>
          <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
            Scribtly saves your client&apos;s voice once and generates platform-native scripts in under 60 seconds.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — no card required
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          <span>© 2026 Scribtly. All rights reserved.</span>
          <Link href="/blog" className="underline" style={{ color: "var(--accent)" }}>
            Blog
          </Link>
        </div>
      </footer>
    </div>
  );
}
