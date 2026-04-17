import Link from "next/link";
import { notFound } from "next/navigation";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { ClientForm } from "@/components/client/ClientForm";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const { workspace } = await ensureUser();
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client || client.workspaceId !== workspace.id) notFound();

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <Link href="/clients" className="text-sm text-text-secondary hover:text-primary">
        ← Back to clients
      </Link>
      <h1 className="text-2xl font-semibold mt-4 mb-6">{client.name}</h1>
      <ClientForm mode="edit" initial={client} />
    </div>
  );
}
