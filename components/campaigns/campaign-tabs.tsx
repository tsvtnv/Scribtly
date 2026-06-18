"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  linkedInAccount: { name: string };
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e", DRAFT: "var(--text-muted)", PAUSED: "#f59e0b", COMPLETED: "var(--text-muted)",
};

const TABS = [
  { label: "Overview", path: "overview" },
  { label: "Leads", path: "leads" },
  { label: "Approvals", path: "approvals" },
  { label: "Activity", path: "activity" },
  { label: "Settings", path: "settings" },
];

export function CampaignTabs({ campaign }: { campaign: Campaign }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Link href="/campaigns" className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} />Back
        </Link>
        <h1 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{campaign.name}</h1>
        <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border"
          style={{ borderColor: STATUS_COLORS[campaign.status], color: STATUS_COLORS[campaign.status] }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: STATUS_COLORS[campaign.status] }} />
          {campaign.status.charAt(0) + campaign.status.slice(1).toLowerCase()}
        </span>
      </div>
      <div className="flex gap-0 border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map(tab => {
          const href = `/campaigns/${campaign.id}/${tab.path}`;
          const active = pathname.endsWith(tab.path);
          return (
            <Link key={tab.path} href={href}
              className="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
              style={{ borderBottomColor: active ? "var(--accent)" : "transparent", color: active ? "var(--accent)" : "var(--text-muted)" }}>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
