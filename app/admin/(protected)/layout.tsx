import { requireAdmin } from "@/lib/adminAuth";
import { AdminNav } from "./AdminNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const themeScript = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s?s==='dark':p)document.documentElement.classList.add('dark');}catch(_){}})();`;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <div className="min-h-screen flex bg-[var(--color-bg)]">
        <AdminNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  );
}
