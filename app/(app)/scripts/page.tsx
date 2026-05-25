import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Prisma, Platform, ScriptStatus } from "@prisma/client";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { ScriptsGrid } from "@/components/script/ScriptsGrid";
import { ScriptsPageTracker } from "@/components/onboarding/ScriptsPageTracker";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { makeHref as buildHref } from "@/lib/scriptsPageHelpers";
import { HelpTooltip } from "@/components/ui/HelpTooltip";

const PLATFORMS: Platform[] = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"];
const STATUSES: ScriptStatus[] = ["DRAFT", "FINAL", "SENT"];

interface Search {
  q?: string;
  clientId?: string;
  platform?: string;
  status?: string;
  page?: string;
}

export default async function ScriptsPage({ searchParams }: { searchParams: Search }) {
  const { workspace } = await ensureUser();
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const limit = 20;

  const where: Prisma.ScriptWhereInput = { workspaceId: workspace.id };
  if (searchParams.clientId) where.clientId = searchParams.clientId;
  if (searchParams.platform && PLATFORMS.includes(searchParams.platform as Platform)) {
    where.platform = searchParams.platform as Platform;
  }
  if (searchParams.status && STATUSES.includes(searchParams.status as ScriptStatus)) {
    where.status = searchParams.status as ScriptStatus;
  }
  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { topic: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const [total, scripts, clients] = await Promise.all([
    prisma.script.count({ where }),
    prisma.script.findMany({
      where,
      include: {
        client: true,
        contentItem: { select: { id: true, stage: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.client.findMany({ where: { workspaceId: workspace.id }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <ScriptsPageTracker />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Script library</h1>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {total}
          </span>
        </div>
        <Link href="/generate">
          <Button>
            <Sparkles size={16} /> New script
          </Button>
        </Link>
      </div>

      <form className="mb-4" action="/scripts" method="GET">
        <Input name="q" defaultValue={searchParams.q || ""} placeholder="Search by title or topic…" />
        {searchParams.clientId ? <input type="hidden" name="clientId" value={searchParams.clientId} /> : null}
        {searchParams.platform ? <input type="hidden" name="platform" value={searchParams.platform} /> : null}
        {searchParams.status ? <input type="hidden" name="status" value={searchParams.status} /> : null}
      </form>

      {/* Platform filter row */}
      <div className="flex flex-wrap gap-2 mb-3 text-xs items-center">
        <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Platform:</span>
        <Link
          href={buildHref(searchParams, { platform: undefined })}
          className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.platform ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
        >
          All
        </Link>
        {PLATFORMS.map((p) => (
          <Link
            key={p}
            href={buildHref(searchParams, { platform: p })}
            className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            {p[0] + p.slice(1).toLowerCase()}
          </Link>
        ))}
        <HelpTooltip text="Filter scripts by platform. Each platform has a different script style — YouTube for long-form, TikTok/Reels for short punchy content, LinkedIn for professional audiences, Podcast for conversational audio." position="right" />
      </div>

      {/* Status filter row */}
      <div className="flex flex-wrap gap-2 mb-5 text-xs items-center">
        <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Status:</span>
        <Link
          href={buildHref(searchParams, { status: undefined })}
          className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.status ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
        >
          Any
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={buildHref(searchParams, { status: s })}
            className={cn("px-2.5 py-1 rounded-full border-hair uppercase", searchParams.status === s ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            {s}
          </Link>
        ))}
        <HelpTooltip text="Filter by script status. Draft = work in progress. Final = approved and ready. Sent = delivered to your client." position="right" />
      </div>

      {clients.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-5 text-xs items-center">
          <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Client:</span>
          <Link
            href={buildHref(searchParams, { clientId: undefined })}
            className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.clientId ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            All
          </Link>
          {clients.map((c) => (
            <Link
              key={c.id}
              href={buildHref(searchParams, { clientId: c.id })}
              className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.clientId === c.id ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
            >
              {c.name}
            </Link>
          ))}
        </div>
      ) : null}

      {scripts.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="12" y="8" width="40" height="48" rx="6" stroke="currentColor" strokeWidth="2" className="text-[var(--color-border)]" />
            <rect x="20" y="20" width="24" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
            <rect x="20" y="27" width="24" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
            <rect x="20" y="34" width="16" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
          </svg>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Your script library is empty</h2>
            <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
              Generate your first script and it will appear here, organised by client and platform.
            </p>
          </div>
          <Link href="/generate">
            <Button size="sm">Generate a script</Button>
          </Link>
        </div>
      ) : (
        <ScriptsGrid scripts={scripts} clients={clients} />
      )}

      {total > scripts.length ? (
        <div className="flex justify-center mt-6">
          <Link href={buildHref(searchParams, { page: String(page + 1) })}>
            <Button variant="secondary">Load more</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
