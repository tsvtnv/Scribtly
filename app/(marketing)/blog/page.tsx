import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Scribtly Blog — Script Writing Tips for Creators & Freelancers",
  description:
    "Practical guides on video script writing, client voice profiles, hooks, platform-native content, and freelance script workflows.",
  alternates: {
    canonical: "https://scribtly.com/blog",
  },
};

const posts = [
  {
    slug: "what-is-a-video-hook",
    title: "What Is a Video Hook?",
    excerpt:
      "A video hook is the opening 3–10 seconds that decides if a viewer keeps watching. Learn the six main types and how to write stronger ones.",
    category: "Glossary",
    date: "21 June 2026",
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
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            From Scribtly
          </p>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            The Script Writing Blog
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)", maxWidth: "560px" }}>
            Practical guides on hooks, brand voice, client workflows, platform-native scripts, and
            everything in between.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border p-6 transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{
                    background: "rgba(224,120,48,0.08)",
                    borderColor: "rgba(224,120,48,0.25)",
                    color: "var(--accent)",
                  }}
                >
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {post.date}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer
        className="px-6 py-8 border-t mt-12"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
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
          <span>
            Powered by{" "}
            <a
              href="https://octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              octelis.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
