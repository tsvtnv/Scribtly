"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Sparkles, FileText, Users, Settings, UsersRound, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { PlanBadge } from "@/components/billing/PlanBadge";
import { useWorkspace } from "./WorkspaceProvider";

export function Sidebar() {
  const pathname = usePathname();
  const { workspace, role } = useWorkspace();
  const isOwner = role === "OWNER";
  const isAgencyOwner = workspace.plan === "AGENCY" && isOwner;

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generate", label: "Generate", icon: Sparkles },
    { href: "/scripts", label: "Scripts", icon: FileText },
    { href: "/pipeline",  label: "Pipeline",  icon: LayoutGrid },
    { href: "/clients", label: "Clients", icon: Users },
    ...(isAgencyOwner ? [{ href: "/settings/team", label: "Team", icon: UsersRound }] : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen border-r-hair border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="px-5 pt-6 pb-4">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          ScriptFast
        </Link>
        <div className="mt-1 text-xs text-text-secondary dark:text-dark-muted truncate">
          {workspace.name}
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
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

      <div className="px-3 py-3 border-t-hair border-[var(--color-border)] flex items-center justify-between gap-2">
        <PlanBadge plan={workspace.plan} />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
        </div>
      </div>
    </aside>
  );
}
