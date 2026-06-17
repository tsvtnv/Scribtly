import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Sidebar, MobileSidebarTrigger } from "@/components/layout/sidebar";
import { AppFooter } from "@/components/layout/app-footer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b md:hidden"
          style={{ borderColor: "var(--border)" }}>
          <MobileSidebarTrigger />
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</span>
        </div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
