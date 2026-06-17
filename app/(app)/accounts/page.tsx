"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Plus, Wifi, WifiOff } from "lucide-react";

interface Account {
  id: string;
  name: string;
  avatarUrl: string | null;
  headline: string | null;
  status: string;
  connSentToday: number;
  dailyConnLimit: number;
  msgSentToday: number;
  dailyMsgLimit: number;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const connectUrl = process.env.NEXT_PUBLIC_CONNECT_URL ?? "http://localhost:3000";

  async function load() {
    const res = await fetch("/api/accounts");
    if (res.ok) setAccounts(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this LinkedIn account?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>LinkedIn Accounts</h1>
        <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
          <a href={`${connectUrl}/connect/linkedin`}>
            <Plus size={16} className="mr-2" />
            Connect account
          </a>
        </Button>
      </div>
      {accounts.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No LinkedIn accounts connected</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Connect your LinkedIn account to start sending outreach.
          </p>
          <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
            <a href={`${connectUrl}/connect/linkedin`}>Connect LinkedIn</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.id} className="rounded-xl border p-4 flex items-center gap-4"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
              <Avatar className="w-12 h-12">
                <AvatarImage src={acc.avatarUrl ?? undefined} />
                <AvatarFallback style={{ background: "var(--bg-subtle)" }}>
                  {acc.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {acc.name}
                  </span>
                  <Badge variant="outline" className="text-xs"
                    style={{
                      borderColor: acc.status === "ACTIVE" ? "#22c55e" : "var(--border)",
                      color: acc.status === "ACTIVE" ? "#22c55e" : "var(--text-muted)",
                    }}>
                    {acc.status === "ACTIVE" ? <Wifi size={10} className="mr-1 inline" /> : <WifiOff size={10} className="mr-1 inline" />}
                    {acc.status}
                  </Badge>
                </div>
                {acc.headline && (
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{acc.headline}</p>
                )}
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {acc.connSentToday}/{acc.dailyConnLimit} conn · {acc.msgSentToday}/{acc.dailyMsgLimit} msg today
                </p>
              </div>
              <button onClick={() => handleDelete(acc.id)}
                className="p-2 rounded-md hover:bg-red-50 transition-colors"
                style={{ color: "var(--text-muted)" }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
