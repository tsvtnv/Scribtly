import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { UsersTable } from "./UsersTable";

export default async function AdminAccountsPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      emailVerified: true,
      disabled: true,
      createdAt: true,
      defaultWorkspaceId: true,
      _count: {
        select: { sessions: true, ownedWorkspaces: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    emailVerified: u.emailVerified,
    disabled: u.disabled,
    createdAt: u.createdAt.toISOString(),
    sessionCount: u._count.sessions,
    workspaceCount: u._count.ownedWorkspaces,
    defaultWorkspaceId: u.defaultWorkspaceId,
  }));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        <p className="text-sm text-text-secondary mt-0.5">{rows.length} user accounts</p>
      </div>
      <UsersTable rows={rows} />
    </div>
  );
}
