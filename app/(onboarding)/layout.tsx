import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="flex items-center justify-center py-6 md:hidden">
        <Link href="/" className="text-xl font-semibold tracking-tight text-text-primary">
          Scribtly
        </Link>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left panel — hero image, desktop only */}
        <div className="hidden md:flex md:w-[44%] lg:w-1/2 relative bg-[#EEEDFE] items-center justify-center p-10 sticky top-0 h-screen">
          <div className="w-full max-w-md">
            <Link href="/" className="block mb-8 text-xl font-semibold tracking-tight text-text-primary">
              Scribtly
            </Link>
            <div className="rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(127,119,221,0.25)]">
              <Image
                src="/brand/onboarding-hero.png"
                alt="Set up your first client profile in Scribtly"
                width={1024}
                height={1024}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="mt-6 text-sm text-text-secondary text-center">
              Set up once. Generate forever.
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-10 md:py-16 md:overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
