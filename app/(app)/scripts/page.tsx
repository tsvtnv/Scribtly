import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { initials } from "@/lib/utils";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import type { ContentItem } from "@/types/pipeline";
import type { ScriptForPipeline } from "@/app/(app)/pipeline/page";

interface Search {
  clientId?: string;
}

export default async function ScriptsPage({ searchParams }: { searchParams: Search }) {
  const { workspace } = await ensureUser();

  const clients = await prisma.client.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true, avatarColor: true },
    orderBy: { name: "asc" },
  });

  const selectedClient = clients.find(c => c.id === searchParams.clientId) ?? null;

  if (!selectedClient) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Script library</h1>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-8">
            Select a client to view and manage their scripts.
          </p>

          {clients.length === 0 ? (
            <div className="border border-dashed border-[var(--color-border)] rounded-xl p-10 text-center">
              <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">No clients yet.</p>
              <Link href="/clients">
                <Button variant="secondary">Add a client</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {clients.map(c => (
                <Link
                  key={c.id}
                  href={`/scripts?clientId=${c.id}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-tint)] transition-all group"
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                    style={{ backgroundColor: c.avatarColor }}
                  >
                    {initials(c.name)}
                  </span>
                  <span className="text-sm font-medium text-text-primary dark:text-dark-text group-hover:text-[var(--color-primary)] transition-colors text-center leading-tight">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const [rawItems, rawScripts] = await Promise.all([
    prisma.contentItem.findMany({
      where: { workspaceId: workspace.id, clientId: selectedClient.id },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script: { select: { id: true, title: true, wordCount: true, duration: true } },
      },
      orderBy: [{ stage: "asc" }, { position: "asc" }],
    }),
    prisma.script.findMany({
      where: { workspaceId: workspace.id, clientId: selectedClient.id, contentItem: null },
      include: { client: { select: { id: true, name: true, avatarColor: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const items: ContentItem[] = rawItems.map(item => ({
    ...item,
    scheduledDate: item.scheduledDate?.toISOString() ?? null,
    publishedAt:   item.publishedAt?.toISOString()   ?? null,
    createdAt:     item.createdAt.toISOString(),
    updatedAt:     item.updatedAt.toISOString(),
  }));

  const scripts: ScriptForPipeline[] = rawScripts.map(s => ({
    ...s,
    contentItem: null,
  }));

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <Link
            href="/scripts"
            className="text-sm text-text-secondary dark:text-dark-muted hover:text-[var(--color-primary)] transition-colors"
          >
            ← All clients
          </Link>
          <span className="text-[var(--color-border)]">/</span>
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: selectedClient.avatarColor, fontSize: "10px", fontWeight: 500 }}
            >
              {initials(selectedClient.name)}
            </span>
            <h1 className="text-base font-semibold text-text-primary dark:text-dark-text">
              {selectedClient.name}
            </h1>
          </div>
        </div>
        <Link href="/generate">
          <Button size="sm">
            <Sparkles size={14} /> New script
          </Button>
        </Link>
      </div>

      <KanbanBoard
        initialItems={items}
        clients={[selectedClient]}
        initialScripts={scripts}
      />
    </div>
  );
}
