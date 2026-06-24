import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Scribtly – Script Writing Tips for Creators",
  description:
    "Practical guides and tips on script writing, client voice profiles, short-form video, and content workflows for freelancers, creators, and agencies.",
  openGraph: {
    title: "Blog | Scribtly – Script Writing Tips for Creators",
    description:
      "Practical guides and tips on script writing, client voice profiles, short-form video, and content workflows for freelancers, creators, and agencies.",
    url: "https://scribtly.com/blog",
    siteName: "Scribtly",
    type: "website",
  },
  alternates: {
    canonical: "https://scribtly.com/blog",
  },
};

const posts = [
  {
    slug: "how-to-write-scripts-in-a-clients-voice",
    title: "How to Write Scripts in a Client's Voice",
    description:
      "Writing scripts that genuinely sound like your client is one of the hardest parts of freelance content work. Here's a practical system that actually works.",
    date: "24 June 2026",
    readTime: "8 min read",
    category: "Freelance Workflow",
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
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto">
        <nav className="text-xs mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Blog</span>
        </nav>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Scribtly Blog
        </h1>
        <p className="text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
          Practical guides on script writing, client voice, short-form video, and content workflows for freelancers, creators, and agencies.
        </p>
      </section>

      {/* Posts */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border p-8 transition-all hover:shadow-md group"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
                >
                  {post.category}
                </span>
                <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</span>
              </div>
              <h2
                className="text-xl font-bold mb-2 group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                {post.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Read article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stop starting from a blank page</h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly generates client-ready scripts in under 60 seconds. Save your client's voice once and use it forever.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
