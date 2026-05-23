import Link from "next/link";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { PlanBadge } from "@/components/billing/PlanBadge";
import { DeleteAccountCard } from "./DeleteAccountCard";
import { WorkspaceNameForm } from "./WorkspaceNameForm";
import { ThemeSettingCard } from "./ThemeSettingCard";

export default async function SettingsPage() {
  const { user, workspace, role } = await ensureUser();
  const memberCount = await prisma.workspaceMember.count({ where: { workspaceId: workspace.id } });

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

      <Card>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-4">
          Profile
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
            <dt className="text-text-secondary">Name</dt>
            <dd>{user.name || "—"}</dd>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
            <dt className="text-text-secondary">Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-4">
          Workspace
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="grid grid-cols-[120px_1fr] gap-3 items-start">
            <dt className="text-text-secondary pt-2">Name</dt>
            <dd>
              {role === "OWNER" ? (
                <WorkspaceNameForm initial={workspace.name} />
              ) : (
                <span>{workspace.name}</span>
              )}
            </dd>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
            <dt className="text-text-secondary">Plan</dt>
            <dd><PlanBadge plan={workspace.plan} /></dd>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
            <dt className="text-text-secondary">Members</dt>
            <dd>{memberCount}</dd>
          </div>
        </dl>
      </Card>

      {role === "OWNER" ? (
        <Card>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Billing
          </h2>
          <Link href="/settings/billing" className="text-primary hover:underline text-sm">
            Manage plan and subscription →
          </Link>
        </Card>
      ) : null}

      {role === "OWNER" && workspace.plan === "AGENCY" ? (
        <Card>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Team
          </h2>
          <Link href="/settings/team" className="text-primary hover:underline text-sm">
            Manage team members →
          </Link>
        </Card>
      ) : null}

      <ThemeSettingCard />

      <Card>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-4">
          Developer
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
            <dt className="text-text-secondary">Workspace ID</dt>
            <dd className="font-mono text-xs bg-[var(--color-bg)] border border-[var(--color-border)] rounded px-2 py-1 select-all truncate">
              {workspace.id}
            </dd>
          </div>
        </dl>
        <p className="text-xs text-text-secondary dark:text-dark-muted mt-3">
          Use your Workspace ID to identify your account when contacting support.
        </p>
      </Card>

      <Card className="border-danger/30">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-danger mb-4">
          Danger zone
        </h2>
        <DeleteAccountCard />
      </Card>
    </div>
  );
}
