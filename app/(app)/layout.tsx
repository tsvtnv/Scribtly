import { ensureUser } from "@/lib/ensureUser";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkspaceProvider } from "@/components/layout/WorkspaceProvider";
import { ToastProvider } from "@/components/ui/Toast";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, workspace, role } = await ensureUser();

  return (
    <WorkspaceProvider value={{ user, workspace, role }}>
      <ToastProvider>
        <div className="min-h-screen flex bg-[var(--color-bg)]">
          <Sidebar />
          <main className="flex-1 min-w-0 md:pt-0 pt-12">{children}</main>
        </div>
      </ToastProvider>
    </WorkspaceProvider>
  );
}
