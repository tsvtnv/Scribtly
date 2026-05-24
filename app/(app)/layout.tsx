import { redirect } from "next/navigation";
import { ensureUser } from "@/lib/ensureUser";
import { shouldRedirectToOnboarding } from "@/lib/onboarding/shouldRedirectToOnboarding";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkspaceProvider } from "@/components/layout/WorkspaceProvider";
import { ToastProvider } from "@/components/ui/Toast";

// Runs before paint — applies saved dark preference only for dashboard pages
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s?s==='dark':p)document.documentElement.classList.add('dark');}catch(_){}})();`;

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, workspace, role } = await ensureUser();

  if (shouldRedirectToOnboarding(workspace.onboardingCompleted)) {
    redirect("/onboarding");
  }

  return (
    <WorkspaceProvider value={{ user, workspace, role }}>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ToastProvider>
        <div className="min-h-screen flex bg-[var(--color-bg)]">
          <Sidebar />
          <main className="flex-1 min-w-0 md:pt-0 pt-12">{children}</main>
        </div>
      </ToastProvider>
    </WorkspaceProvider>
  );
}
