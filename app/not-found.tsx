import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Activity } from "lucide-react";

export const metadata = {
  title: "Page not found — Scribtly",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="relative max-w-md w-full text-center">
        {/* Background orbs */}
        <div className="absolute top-[-80px] left-[-60px] w-[280px] h-[280px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full bg-primary/6 blur-[70px] pointer-events-none" />

        <div className="relative">
          <p className="text-[120px] font-bold leading-none text-primary/15 select-none">
            404
          </p>
          <div className="mt-[-20px]">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Page not found
            </h1>
            <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-8">
              The page you're looking for doesn't exist or has been moved.
              If something looks broken, check the status page.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
                  Go home <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
              <a
                href="https://status.tsvweb.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Activity size={14} />
                  System status
                </Button>
              </a>
            </div>

            <p className="mt-8 text-xs text-text-secondary dark:text-dark-muted">
              Uptime &amp; VPS status at{" "}
              <a
                href="https://status.tsvweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                status.tsvweb.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
