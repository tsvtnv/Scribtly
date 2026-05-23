import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { ScriptTitleEditor } from "@/components/script/ScriptTitleEditor";
import { ScriptEditor } from "@/components/script/ScriptEditor";
import { ExtrasPanel } from "@/components/script/ExtrasPanel";
import { ScriptActions } from "@/components/script/ScriptActions";
import { ScriptReviewPanel } from "@/components/script/ScriptReviewPanel";
import { PlatformBadge, StatusBadge } from "@/components/ui/Badge";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import { relativeDate } from "@/lib/utils";

export default async function ScriptViewPage({ params }: { params: { id: string } }) {
  const { workspace } = await ensureUser();
  const script = await prisma.script.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      comments: {
        orderBy: { createdAt: 'asc' },
        select: { id: true, authorName: true, body: true, verdict: true, createdAt: true },
      },
    },
  });
  if (!script || script.workspaceId !== workspace.id) notFound();

  const extras = (script.extras as Record<string, string> | null) || {};

  const comments = script.comments.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    verdict: c.verdict as 'APPROVED' | 'REJECTED' | null,
  }));

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto pb-24">
      <Link href="/scripts" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary">
        <ArrowLeft size={14} /> Back to library
      </Link>

      <div className="mt-3 mb-5 text-center">
        <ScriptTitleEditor scriptId={script.id} initial={script.title} />
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs text-text-secondary dark:text-dark-muted">
          {script.client ? (
            <div className="flex items-center gap-1.5">
              <ClientAvatar name={script.client.name} color={script.client.avatarColor} size={16} />
              <Link href={`/clients/${script.client.id}`} className="hover:text-primary">{script.client.name}</Link>
            </div>
          ) : (
            <span>Unassigned</span>
          )}
          <PlatformBadge platform={script.platform} />
          <span>{script.duration}</span>
          <span>·</span>
          <span>{script.wordCount ?? 0} words</span>
          <span>·</span>
          <span>Created {relativeDate(script.createdAt)}</span>
          <StatusBadge status={script.status} />
        </div>
      </div>

      <ScriptReviewPanel comments={comments} />

      <div className={Object.keys(extras).length > 0 ? "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6" : ""}>
        <div>
          <ScriptEditor scriptId={script.id} initialContent={script.content} />
        </div>
        {Object.keys(extras).length > 0 ? <ExtrasPanel scriptId={script.id} extras={extras} /> : null}
      </div>

      <ScriptActions script={script} plan={workspace.plan} />
    </div>
  );
}
