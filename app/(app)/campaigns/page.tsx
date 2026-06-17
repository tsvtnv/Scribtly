"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pause, Play, Pencil, Trash2 } from "lucide-react";

interface Campaign {
  id: string; name: string; status: string; type: string; createdAt: string;
  linkedInAccount: { name: string };
  stats: { leads: number; contacted: number; accepted: number; replied: number };
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e", DRAFT: "var(--text-muted)", PAUSED: "#f59e0b", COMPLETED: "var(--text-muted)",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await fetch("/api/campaigns");
    if (res.ok) setCampaigns(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(id: string) {
    await fetch(`/api/campaigns/${id}/activate`, { method: "POST" });
    load();
  }

  async function deleteCampaign(id: string) {
    if (!confirm("Delete this campaign and all its leads?")) return;
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Campaigns</h1>
        <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
          <Link href="/campaigns/new"><Plus size={16} className="mr-2" />New campaign</Link>
        </Button>
      </div>
      <div className="flex gap-3 mb-6">
        <Input placeholder="Search campaigns…" value={search} onChange={e => setSearch(e.target.value)}
          className="max-w-xs" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No campaigns yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>Create your first campaign to start reaching out.</p>
          <Button asChild style={{ background: "var(--accent)", color: "#fff" }}>
            <Link href="/campaigns/new">New campaign</Link>
          </Button>
        </div>
      )}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="rounded-xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: STATUS_COLORS[c.status] ?? "var(--text-muted)" }} />
                  <Link href={`/campaigns/${c.id}/overview`}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--text-primary)" }}>{c.name}</Link>
                </div>
                <p className="text-xs mt-0.5 ml-4" style={{ color: "var(--text-muted)" }}>
                  {c.linkedInAccount.name} · {c.type.replace("_", " ")}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleStatus(c.id)}
                  className="p-1.5 rounded hover:bg-gray-50" style={{ color: "var(--text-muted)" }}>
                  {c.status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <Link href={`/campaigns/${c.id}/overview`}
                  className="p-1.5 rounded hover:bg-gray-50" style={{ color: "var(--text-muted)" }}>
                  <Pencil size={14} />
                </Link>
                <button onClick={() => deleteCampaign(c.id)}
                  className="p-1.5 rounded hover:bg-red-50" style={{ color: "var(--text-muted)" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t ml-4"
              style={{ borderColor: "var(--border)" }}>
              {[
                { label: "leads", value: c.stats.leads },
                { label: "contacted", value: c.stats.contacted },
                { label: "accepted", value: c.stats.accepted },
                { label: "replied", value: c.stats.replied },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
