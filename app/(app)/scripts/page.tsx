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

  const makeHref = (patch: Partial<Search>) => {
    const params = new URLSearchParams();
    const merged = { ...searchParams, ...patch } as Record<string, string | undefined>;
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
    });
    const qs = params.toString();
    return qs ? `/scripts?${qs}` : "/scripts";
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <ScriptsPageTracker />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Script library</h1>
          <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
            {total} {total === 1 ? "script" : "scripts"}
          </p>
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

      <div className="flex flex-wrap gap-2 mb-5 text-xs">
        <Link
          href={makeHref({ platform: undefined })}
          className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.platform ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
        >
          All platforms
        </Link>
        {PLATFORMS.map((p) => (
          <Link
            key={p}
            href={makeHref({ platform: p })}
            className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            {p[0] + p.slice(1).toLowerCase()}
          </Link>
        ))}
        <span className="text-text-secondary mx-1">·</span>
        <Link
          href={makeHref({ status: undefined })}
          className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.status ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
        >
          Any status
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={makeHref({ status: s })}
            className={cn("px-2.5 py-1 rounded-full border-hair uppercase", searchParams.status === s ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            {s}
          </Link>
        ))}
      </div>

      {clients.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          <Link
            href={makeHref({ clientId: undefined })}
            className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.clientId ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
          >
            All clients
          </Link>
          {clients.map((c) => (
            <Link
              key={c.id}
              href={makeHref({ clientId: c.id })}
              className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.clientId === c.id ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
            >
              {c.name}
            </Link>
          ))}
        </div>
      ) : null}

      {scripts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <h2 className="text-lg font-semibold">Your script library is empty</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
            Generate your first script and it will appear here, organised by client and platform.
          </p>
          <Link href="/generate">
            <Button size="sm">Generate a script</Button>
          </Link>
        </div>
      ) : (
        <ScriptsGrid scripts={scripts} clients={clients} />
      )}

      {total > scripts.length ? (
        <div className="flex justify-center mt-6">
          <Link href={makeHref({ page: String(page + 1) })}>
            <Button variant="secondary">Load more</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
