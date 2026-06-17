"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Send, Inbox, Users, Zap, Settings, LogOut, Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Send },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/accounts", label: "Accounts", icon: Users },
];

const configure = [
  { href: "/automation", label: "Automation", icon: Zap },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ pathname }: { pathname: string }) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
          Scribtly
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                color: active ? "var(--accent)" : "var(--text-muted)",
                background: active ? "rgba(224,120,48,0.08)" : "transparent",
              }}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
        <div className="pt-4 pb-1">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}>Configure</p>
        </div>
        {configure.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                color: active ? "var(--accent)" : "var(--text-muted)",
                background: active ? "rgba(224,120,48,0.08)" : "transparent",
              }}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 rounded-md text-sm w-full transition-colors hover:bg-red-50"
          style={{ color: "var(--text-muted)" }}>
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 min-h-screen border-r"
      style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}>
      <NavLinks pathname={pathname} />
    </aside>
  );
}

export function MobileSidebarTrigger() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2 bg-transparent border-0 cursor-pointer" style={{ color: "var(--text-primary)" }}>
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-56"
        style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}>
        <NavLinks pathname={pathname} />
      </SheetContent>
    </Sheet>
  );
}
