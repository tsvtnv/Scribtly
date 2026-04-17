"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Sparkles, FileText, Users, Settings, UsersRound, LayoutGrid, Timer, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { PlanBadge } from "@/components/billing/PlanBadge";
import { useWorkspace } from "./WorkspaceProvider";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { workspace, role } = useWorkspace();
  const isOwner = role === "OWNER";
  const isAgencyOwner = workspace.plan === "AGENCY" && isOwner;
  const canUseCron = ["PRO", "AGENCY", "ENTERPRISE"].includes(workspace.plan);

  // Desktop: collapsed state persisted in localStorage
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebar-collapsed") === "1";
  });
  // Mobile: drawer open state
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generate", label: "Generate", icon: Sparkles },
    { href: "/scripts", label: "Scripts", icon: FileText },
    { href: "/pipeline", label: "Pipeline", icon: LayoutGrid },
    { href: "/clients", label: "Clients", icon: Users },
    ...(canUseCron ? [{ href: "/settings/cron", label: "Auto-generate", icon: Timer }] : []),
    ...(isAgencyOwner ? [{ href: "/settings/team", label: "Team", icon: UsersRound }] : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname?.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            title={collapsed ? label : undefined}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
              collapsed ? "justify-center px-2" : "",
              active
                ? "bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium"
                : "text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)]"
            )}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger button — shown when drawer is closed */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
            ScriptFast
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-[var(--color-primary-tint)]" aria-label="Close menu">
            <X size={16} />
          </button>
        </div>
        <div className="px-4 pb-3 text-xs text-text-secondary dark:text-dark-muted truncate">{workspace.name}</div>
        <NavLinks onClick={() => setMobileOpen(false)} />
        <div className="px-3 py-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
          <PlanBadge plan={workspace.plan} />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
          </div>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col min-h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-200 shrink-0",
          collapsed ? "w-14" : "w-60"
        )}
      >
        <div className={cn("pt-6 pb-4 flex items-center", collapsed ? "justify-center px-2" : "px-5 justify-between")}>
          {!collapsed && (
            <Link href="/dashboard" className="text-lg font-semibold tracking-tight truncate">
              ScriptFast
            </Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded hover:bg-[var(--color-primary-tint)] text-text-secondary shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {!collapsed && (
          <div className="px-5 pb-3 text-xs text-text-secondary dark:text-dark-muted truncate">
            {workspace.name}
          </div>
        )}

        <NavLinks />

        <div className={cn(
          "py-3 border-t border-[var(--color-border)] flex items-center gap-2",
          collapsed ? "flex-col px-2 justify-center" : "px-3 justify-between"
        )}>
          {!collapsed && <PlanBadge plan={workspace.plan} />}
          <div className={cn("flex items-center gap-1", collapsed && "flex-col")}>
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
          </div>
        </div>
      </aside>
    </>
  );
}
