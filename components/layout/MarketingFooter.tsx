import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t-hair border-[var(--color-border)] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-wrap gap-6 items-center justify-between text-xs text-text-secondary dark:text-dark-muted">
        <div>© {new Date().getFullYear()} Scribtly</div>
        <div className="flex items-center gap-5">
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/youtube-scripts" className="hover:text-primary">YouTube scripts</Link>
          <Link href="/tiktok-scripts" className="hover:text-primary">TikTok scripts</Link>
          <Link href="/login" className="hover:text-primary">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
