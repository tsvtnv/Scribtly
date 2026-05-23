import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

const ACTION_LABEL: Record<string, string> = {
  impersonate_user: "Impersonated user",
  disable_user: "Disabled user",
  enable_user: "Enabled user",
  quota_reset: "Reset quota",
  suspend_workspace: "Suspended workspace",
  unsuspend_workspace: "Unsuspended workspace",
  delete_workspace: "Deleted workspace",
};

const ACTION_COLOR: Record<string, string> = {
  impersonate_user: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  disable_user: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  enable_user: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  quota_reset: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  suspend_workspace: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  unsuspend_workspace: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  delete_workspace: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default async function AdminAuditPage() {
  await requireAdmin();

  const logs = await prisma.adminAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Audit log</h1>
        <p className="text-sm text-text-secondary mt-0.5">Last 200 admin actions</p>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-text-secondary">No admin actions recorded yet.</p>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">When</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Target type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Target ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--color-primary-tint)] transition-colors">
                  <td className="px-4 py-3 text-xs text-text-secondary whitespace-nowrap">
                    {log.createdAt.toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        ACTION_COLOR[log.action] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {ACTION_LABEL[log.action] ?? log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{log.targetType ?? "—"}</td>
                  <td className="px-4 py-3 text-xs font-mono text-text-secondary truncate max-w-[160px]">
                    {log.targetId ? (
                      log.targetType === "Workspace" ? (
                        <a
                          href={`/admin/users/${log.targetId}`}
                          className="hover:text-[var(--color-primary)] transition-colors"
                        >
                          {log.targetId}
                        </a>
                      ) : (
                        log.targetId
                      )
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{log.details ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
