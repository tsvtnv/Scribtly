import Link from "next/link";
import { Plus } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { getScriptLimit } from "@/lib/planLimits";
import { GeneratePageClient } from "./GeneratePageClient";
import { Button } from "@/components/ui/Button";

export default async function GeneratePage() {
  const { workspace } = await ensureUser();
  const clientCount = await prisma.client.count({ where: { workspaceId: workspace.id } });

  if (clientCount === 0) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <div className="text-center py-16 space-y-3">
          <h2 className="text-lg font-semibold">Add a client first</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
            To generate a script in your client&apos;s voice, you need to set up their profile first.
          </p>
          <Link href="/clients/new">
            <Button size="sm"><Plus size={14} /> Add a client</Button>
          </Link>
        </div>
      </div>
    );
  }

  const clients = await prisma.client.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  const limit = getScriptLimit(workspace.plan);
  const usagePct = limit === Infinity ? 0 : workspace.scriptCount / limit;
  const resetDate = workspace.scriptCountResetAt.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

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
