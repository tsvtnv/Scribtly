import Link from "next/link";
import { OpenCookieSettingsButton } from "@/components/consent/OpenCookieSettingsButton";

export function MarketingFooter() {
  return (
    <footer className="border-t-hair border-[var(--color-border)] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-3">
              Platform
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/youtube-scripts" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">YouTube scripts</Link></li>
              <li><Link href="/tiktok-scripts" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">TikTok scripts</Link></li>
              <li><Link href="/instagram-reels-scripts" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Instagram Reels scripts</Link></li>
              <li><Link href="/ai-script-writer" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">AI script writer</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-3">
              Solutions
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/for-freelancers" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">For freelancers</Link></li>
              <li><Link href="/for-agencies" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">For agencies</Link></li>
              <li><Link href="/pricing" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-3">
              Resources
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-3">
              Company
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/cookies" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Cookies</Link></li>
              <li><OpenCookieSettingsButton variant="footer" /></li>
              <li><Link href="/login" className="text-text-secondary dark:text-dark-muted hover:text-primary transition-colors">Log in</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t-hair border-[var(--color-border)] pt-6 flex flex-wrap gap-4 items-center justify-between text-xs text-text-secondary dark:text-dark-muted">
          <span>© {new Date().getFullYear()} Scribtly · Made for freelancers</span>
          <span>
            Developed &amp; hosted by{" "}
            <a
              href="https://tsvweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              tsvweb.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
