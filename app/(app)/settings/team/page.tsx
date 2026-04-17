import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { getMaxMembers } from "@/lib/planLimits";
import { Card } from "@/components/ui/Card";
import { MemberList } from "@/components/team/MemberList";
import { InviteForm } from "@/components/team/InviteForm";
import { PendingInvitesList } from "@/components/team/PendingInvitesList";

export default async function TeamPage() {
  const { user, workspace, role } = await ensureUser();
  if (role !== "OWNER" || workspace.plan !== "AGENCY") redirect("/settings");

  const [members, invites] = await Promise.all([
    prisma.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      include: { user: true },
      orderBy: { joinedAt: "asc" },
    }),
    prisma.invite.findMany({
      where: { workspaceId: workspace.id, acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const maxMembers = getMaxMembers(workspace.plan);
  const usedSeats = members.length + invites.length;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <Link href="/settings" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary">
        <ArrowLeft size={14} /> Back to settings
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {usedSeats} of {maxMembers} seats used
        </span>
      </div>
      <p className="text-sm text-text-secondary dark:text-dark-muted mt-1 mb-6">
        Invite up to {maxMembers - 1} team members to share your clients and script library.
      </p>

      <div className="space-y-5">
        <Card>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Members
          </h2>
          <MemberList members={members.map((m) => ({
            id: m.id,
            role: m.role,
            joinedAt: m.joinedAt.toISOString(),
            email: m.user.email,
            name: m.user.name,
            isCurrentUser: m.user.id === user.id,
          }))} />
        </Card>

        <Card>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Invite team members
          </h2>
          <InviteForm seatsRemaining={maxMembers - usedSeats} />
        </Card>

        {invites.length > 0 ? (
          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
              Pending invites
            </h2>
            <PendingInvitesList invites={invites.map((i) => ({
              id: i.id,
              email: i.email,
              expiresAt: i.expiresAt.toISOString(),
              createdAt: i.createdAt.toISOString(),
            }))} />
          </Card>
        ) : null}
      </div>
    </div>
  );
}
