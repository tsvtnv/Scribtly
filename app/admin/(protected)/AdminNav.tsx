"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Share2, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Workspaces", icon: Users, exact: false },
  { href: "/admin/outreach", label: "Outreach", icon: Share2, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex flex-col w-52 min-h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
      <div className="px-5 pt-6 pb-4">
        <div className="text-lg font-semibold tracking-tight">Scribtly</div>
        <div className="text-xs text-danger font-medium mt-0.5">Admin</div>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium"
                  : "text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)]"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-3 border-t border-[var(--color-border)]">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-md text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
