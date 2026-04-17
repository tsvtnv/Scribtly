import Link from "next/link";
import type { Client } from "@prisma/client";
import { ClientAvatar } from "./ClientAvatar";
import { PlatformBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function ClientCard({
  client,
  scriptCount,
}: {
  client: Client;
  scriptCount: number;
}) {
  return (
    <Link href={`/clients/${client.id}`} className="block group">
      <Card className="h-full hover:border-primary/40 transition-colors">
        <div className="flex items-start gap-3">
          <ClientAvatar name={client.name} color={client.avatarColor} size={44} />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{client.name}</div>
            <div className="text-xs text-text-secondary dark:text-dark-muted truncate mt-0.5">
              {client.niche}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <PlatformBadge platform={client.primaryPlatform} />
          <span className="text-xs text-text-secondary dark:text-dark-muted">
            {scriptCount} script{scriptCount === 1 ? "" : "s"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
