import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={140} height={35} className="h-9 w-auto" />
          </Link>
          <p className="text-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
            LinkedIn outreach that books meetings
          </p>
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}
        >
          {children}
        </div>
      </div>

      <footer className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
        Powered by{" "}
        <a
          href="https://octelis.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--accent)" }}
        >
          octelis.com
        </a>
      </footer>
    </div>
  );
}
