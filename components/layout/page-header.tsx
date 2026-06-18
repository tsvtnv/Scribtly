"use client";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/campaigns": "Campaigns",
  "/inbox": "Inbox",
  "/accounts": "Accounts",
  "/automation": "Automation",
  "/settings": "Settings",
};

function getTitle(pathname: string): string {
  for (const [prefix, title] of Object.entries(TITLES)) {
    if (pathname.startsWith(prefix)) return title;
  }
  return "Scribtly";
}

export function PageHeader() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <div
      className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 border-b"
      style={{ background: "#ffffff", borderColor: "var(--border)" }}
    >
      <PanelLeft size={18} style={{ color: "var(--text-muted)" }} />
      <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h1>
    </div>
  );
}
