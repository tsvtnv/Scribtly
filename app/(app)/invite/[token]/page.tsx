import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { Button } from "@/components/ui/Button";

export default async function InviteLandingPage({ params }: { params: { token: string } }) {
  const { workspace } = await ensureUser();
  const invite = await prisma.invite.findUnique({
    where: { token: params.token },
    include: { workspace: true },
  });

  if (!invite || invite.expiresAt < new Date()) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-2">Invite not valid</h1>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            This invite has expired or been revoked. Ask the workspace owner for a new one.
          </p>
          <Link href="/dashboard"><Button>Go to dashboard</Button></Link>
        </div>
      </div>
    );
  }

  // If invite matched the current workspace, ensureUser already accepted it.
  const accepted = workspace.id === invite.workspaceId;

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold mb-2">
          {accepted ? `Welcome to ${invite.workspace.name}` : "Invite received"}
        </h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
          {accepted
            ? "You're now a member of this workspace. You can see all clients and scripts shared here."
            : "To accept this invite, sign in with the email it was sent to."}
        </p>
        <Link href="/dashboard"><Button>Go to dashboard</Button></Link>
      </div>
    </div>
  );
}
