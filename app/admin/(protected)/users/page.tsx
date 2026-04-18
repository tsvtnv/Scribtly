import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { WorkspacesTable } from "./WorkspacesTable";

export default async function AdminUsersPage() {
  await requireAdmin();

  const workspaces = await prisma.workspace.findMany({
    include: {
      owner: {
        select: {
          id: true,
          email: true,
          isBetaTester: true,
          betaExpiresAt: true,
        },
      },
      _count: { select: { scripts: true, clients: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = workspaces.map((ws) => {
    const betaActive =
      ws.owner.isBetaTester &&
      ws.owner.betaExpiresAt != null &&
      ws.owner.betaExpiresAt > new Date();
    return {
      id: ws.id,
      ownerId: ws.owner.id,
      name: ws.name,
      ownerEmail: ws.owner.email,
      plan: ws.plan,
      scriptCount: ws.scriptCount,
      totalScripts: ws._count.scripts,
      clientCount: ws._count.clients,
      hasSubscription: !!ws.stripeSubscriptionId,
      createdAt: ws.createdAt.toISOString(),
      isBetaTester: ws.owner.isBetaTester,
      betaActive,
      betaExpiresAt: ws.owner.betaExpiresAt?.toISOString() ?? null,
    };
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Workspaces</h1>
      <p className="text-sm text-text-secondary mb-8">{rows.length} total workspaces</p>
      <WorkspacesTable rows={rows} />
    </div>
  );
}
