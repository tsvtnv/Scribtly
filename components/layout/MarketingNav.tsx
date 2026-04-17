import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MarketingNav() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[var(--color-bg)]/80 backdrop-blur border-b-hair border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Scribtly
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/login" className="hover:text-primary">Log in</Link>
          <Link href="/signup">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
