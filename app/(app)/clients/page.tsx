import Link from "next/link";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { canAddClient } from "@/lib/planLimits";
import { ClientCard } from "@/components/client/ClientCard";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default async function ClientsPage() {
  const { workspace } = await ensureUser();
  const clients = await prisma.client.findMany({
    where: { workspaceId: workspace.id },
    include: { _count: { select: { scripts: true } } },
    orderBy: { createdAt: "desc" },
  });

  const canAdd = canAddClient(workspace, clients.length);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
            Save each client once — we'll write every script in their voice.
          </p>
        </div>
        {canAdd ? (
          <Link href="/clients/new">
            <Button>
              <Plus size={16} /> New client
            </Button>
          </Link>
        ) : (
          <div className="relative group">
            <Button disabled>
              <Plus size={16} /> New client
            </Button>
            <div className="absolute right-0 top-full mt-1 w-64 text-xs bg-[var(--color-surface)] border-hair border-[var(--color-border)] rounded-md p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              You're on the Free plan (1 client max). Upgrade to Pro for more clients.
            </div>
          </div>
        )}
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-20 border-hair border-dashed border-[var(--color-border)] rounded-lg">
          <p className="text-text-secondary dark:text-dark-muted">
            Add your first client to get started.
          </p>
          <Link href="/clients/new" className="inline-block mt-4">
            <Button>
              <Plus size={16} /> Add client
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c) => (
            <ClientCard key={c.id} client={c} scriptCount={c._count.scripts} />
          ))}
        </div>
      )}
    </div>
  );
}
