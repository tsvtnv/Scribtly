import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Sidebar, MobileSidebarTrigger } from "@/components/layout/sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { AppFooter } from "@/components/layout/app-footer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen" style={{ background: "#ffffff" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b md:hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <MobileSidebarTrigger />
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</span>
        </div>
        {/* Desktop page header */}
        <div className="hidden md:block">
          <PageHeader />
        </div>
        <main className="flex-1 px-6 py-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
