import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { GeneratePageClient } from "./GeneratePageClient";

export default async function GeneratePage() {
  const { workspace } = await ensureUser();
  const clients = await prisma.client.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Generate a script</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
          Pick a client, pick a platform, and your script will stream in.
        </p>
      </div>
      <GeneratePageClient
        clients={clients}
        plan={workspace.plan}
        scriptCount={workspace.scriptCount}
        scriptCountResetAt={workspace.scriptCountResetAt.toISOString()}
      />
    </div>
  );
}
