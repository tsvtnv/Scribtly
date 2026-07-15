import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly Blog – Script Writing Tips for Creators & Freelancers",
  description:
    "Practical guides on script writing, client voice, hooks, short-form video, and AI content workflows for freelancers, agencies, and creators.",
  openGraph: {
    title: "Scribtly Blog – Script Writing Tips for Creators & Freelancers",
    description:
      "Practical guides on script writing, client voice, hooks, short-form video, and AI content workflows.",
    url: "https://scribtly.com/blog",
    siteName: "Scribtly",
    type: "website",
  },
};

const posts = [
  {
    slug: "how-to-write-scripts-in-a-clients-voice",
    title: "How to Write Scripts in a Client's Voice",
    excerpt:
      "The step-by-step process freelancers and agencies use to capture a client's tone, build a voice profile, and generate scripts that sound right first time.",
    category: "Freelance",
    date: "15 July 2026",
    readTime: "8 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--accent)" }}
        >
          Scribtly Blog
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Script writing guides,<br />tips, and workflows
        </h1>
        <p className="text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
          Practical advice for freelancers, creators, and agencies who write video scripts for clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border p-7 flex flex-col gap-4 transition-all hover:shadow-md"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(224,120,48,0.1)", color: "var(--accent)" }}
              >
                {post.category}
              </span>
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <Calendar size={12} />
                {post.date}
              </div>
            </div>
            <div className="flex-1">
              <h2
                className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {post.excerpt}
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Read article
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
