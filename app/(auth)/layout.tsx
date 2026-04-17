import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--color-bg)]">
      <Link href="/" className="mb-8 text-xl font-semibold tracking-tight">
        ScriptFast
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
