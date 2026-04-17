import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { Card } from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";

export default async function AdminWorkspaceDetailPage({ params }: { params: { id: string } }) {
  await requireAdmin();

  const ws = await prisma.workspace.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { email: true, name: true, createdAt: true } },
      members: { include: { user: { select: { email: true, name: true } } } },
      clients: {
        select: {
          id: true,
          name: true,
          niche: true,
          primaryPlatform: true,
          createdAt: true,
        },
      },
      scripts: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          title: true,
          platform: true,
          status: true,
          wordCount: true,
          createdAt: true,
        },
      },
      _count: { select: { scripts: true, clients: true } },
    },
  });

  if (!ws) notFound();

  const fields: [string, string][] = [
    ["Plan", ws.plan],
    ["Owner email", ws.owner.email],
    ["Owner name", ws.owner.name ?? "—"],
    ["Script count (month)", ws.scriptCount.toString()],
    ["Total scripts", ws._count.scripts.toString()],
    ["Total clients", ws._count.clients.toString()],
    ["Stripe customer ID", ws.stripeCustomerId ?? "—"],
    ["Stripe subscription ID", ws.stripeSubscriptionId ?? "—"],
    ["Script reset date", ws.scriptCountResetAt.toLocaleDateString("en-GB")],
    ["Created", ws.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-4"
      >
        <ArrowLeft size={14} /> All workspaces
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-1">{ws.name}</h1>
      <p className="text-sm text-text-secondary mb-6 font-mono">{ws.id}</p>

      {/* Core details */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Details</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-text-secondary">{k}</dt>
              <dd className="text-sm font-medium break-all">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Members */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Team members ({ws.members.length})</h2>
        {ws.members.length === 0 ? (
          <p className="text-sm text-text-secondary">No members</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.members.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.user.email}</td>
                  <td className="py-2 text-text-secondary">{m.user.name ?? "—"}</td>
                  <td className="py-2">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Clients */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold mb-3">Clients ({ws.clients.length})</h2>
        {ws.clients.length === 0 ? (
          <p className="text-sm text-text-secondary">No clients yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Niche</th>
                <th className="pb-2 font-medium">Platform</th>
                <th className="pb-2 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.clients.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 font-medium">{c.name}</td>
                  <td className="py-2 text-text-secondary">{c.niche}</td>
                  <td className="py-2">{c.primaryPlatform}</td>
                  <td className="py-2 text-text-secondary">
                    {new Date(c.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Recent scripts */}
      <Card>
        <h2 className="text-sm font-semibold mb-3">
          Recent scripts (last 20 of {ws._count.scripts})
        </h2>
        {ws.scripts.length === 0 ? (
          <p className="text-sm text-text-secondary">No scripts yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Platform</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Words</th>
                <th className="pb-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ws.scripts.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 font-medium max-w-xs truncate">{s.title}</td>
                  <td className="py-2 text-text-secondary">{s.platform}</td>
                  <td className="py-2">{s.status}</td>
                  <td className="py-2 text-text-secondary">{s.wordCount ?? "—"}</td>
                  <td className="py-2 text-text-secondary whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
