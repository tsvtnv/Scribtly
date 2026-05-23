import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="flex items-center justify-center py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-text-primary">
          Scribtly
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
