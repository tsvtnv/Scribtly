"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Plus, Pause, Play, Pencil, Trash2 } from "lucide-react";

interface Campaign {
  id: string; name: string; status: string; type: string; createdAt: string;
  linkedInAccount: { name: string };
  stats: { leads: number; contacted: number; accepted: number; replied: number };
}

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "#22c55e",
  DRAFT: "#9ca3af",
  PAUSED: "#f59e0b",
  COMPLETED: "#9ca3af",
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

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Search campaigns…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
          style={{ borderColor: "var(--border)", background: "#ffffff" }}
        />
        <Link
          href="/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-auto"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <Plus size={16} />New campaign
        </Link>
      </div>

      {filtered.length === 0 && (
        <div
          className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "#ffffff" }}
        >
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No campaigns yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Create your first campaign to start reaching out.
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            New campaign
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(c => (
          <div
            key={c.id}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)", background: "#ffffff" }}
          >
            {/* Top: name + account */}
            <div className="px-5 pt-4 pb-3">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: STATUS_DOT[c.status] ?? "#9ca3af" }}
                />
                <Link
                  href={`/campaigns/${c.id}/overview`}
                  className="font-semibold text-sm hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {c.name}
                </Link>
              </div>
              <p className="text-xs ml-4" style={{ color: "var(--text-muted)" }}>
                {c.linkedInAccount.name} · {c.type.replace("_", " ")}
              </p>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 border-t border-b px-5 py-4"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { label: "leads", value: c.stats.leads },
                { label: "contacted", value: c.stats.contacted },
                { label: "accepted", value: c.stats.accepted },
                { label: "replied", value: c.stats.replied },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Bottom: date + actions */}
            <div className="flex items-center justify-between px-5 py-2.5">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(c.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStatus(c.id)}
                  className="p-1.5 rounded hover:bg-gray-50"
                  style={{ color: "var(--text-muted)" }}
                  title={c.status === "ACTIVE" ? "Pause" : "Activate"}
                >
                  {c.status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <Link
                  href={`/campaigns/${c.id}/overview`}
                  className="p-1.5 rounded hover:bg-gray-50"
                  style={{ color: "var(--text-muted)" }}
                  title="Edit"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="p-1.5 rounded hover:bg-red-50"
                  style={{ color: "var(--text-muted)" }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
