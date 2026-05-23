import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MarketingNav() {
  return (
    <div className="sticky top-0 z-40 w-full">
      <Link
        href="/signup"
        className="block w-full bg-[#E8E5DF] dark:bg-dark-elevated text-text-secondary dark:text-dark-muted text-xs py-1.5 text-center hover:text-primary transition-colors"
      >
        <span>Scribtly is in early access — join free today</span>
        <ArrowRight size={12} className="inline ml-1 -mt-0.5" />
      </Link>
      <nav className="w-full bg-[var(--color-bg)]/80 backdrop-blur border-b-hair border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Scribtly
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/pricing" className="hover:text-primary">Pricing</Link>
            <Link href="/login" className="hidden sm:inline hover:text-primary">Log in</Link>
            <Link href="/signup">
              <Button size="sm">Start free</Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
