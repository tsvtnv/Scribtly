import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Pricing
            </Link>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {children}

      <footer
        className="px-6 py-8 border-t mt-20"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
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
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/for-freelancers" className="hover:underline">For Freelancers</Link>
            <Link href="/for-agencies" className="hover:underline">For Agencies</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
