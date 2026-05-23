import Link from "next/link";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { canAddClient } from "@/lib/planLimits";
import { ClientForm } from "@/components/client/ClientForm";

export default async function NewClientPage() {
  const { workspace } = await ensureUser();
  const count = await prisma.client.count({ where: { workspaceId: workspace.id } });

  if (!canAddClient(workspace, count)) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <Link href="/clients" className="text-sm text-text-secondary hover:text-primary">
          ← Back to clients
        </Link>
        <h1 className="text-2xl font-semibold mt-4">Client limit reached</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-2">
          You're on the Free plan, which allows 1 client. Upgrade to Pro for more clients.
        </p>
        <Link href="/settings/billing" className="inline-block mt-4 text-primary hover:underline">
          View billing →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <Link href="/clients" className="text-sm text-text-secondary hover:text-primary">
        ← Back to clients
      </Link>
      <h1 className="text-2xl font-semibold mt-4 mb-6">New client</h1>
      <ClientForm mode="create" />
    </div>
  );
}
