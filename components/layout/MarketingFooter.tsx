import Link from "next/link";
import { OpenCookieSettingsButton } from "@/components/consent/OpenCookieSettingsButton";

export function MarketingFooter() {
  return (
    <footer className="border-t-hair border-[var(--color-border)] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-wrap gap-6 items-center justify-between text-xs text-text-secondary dark:text-dark-muted">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Scribtly</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>Made for freelancers</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/youtube-scripts" className="hover:text-primary">YouTube scripts</Link>
          <Link href="/tiktok-scripts" className="hover:text-primary">TikTok scripts</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          <Link href="/terms" className="hover:text-primary">Terms</Link>
          <Link href="/cookies" className="hover:text-primary">Cookies</Link>
          <OpenCookieSettingsButton variant="footer" />
          <Link href="/login" className="hover:text-primary">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
