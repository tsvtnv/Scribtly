"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SmartProspectingModal } from "@/components/leads/smart-prospecting-modal";
import { Sparkles, Trash2, ExternalLink, ChevronLeft } from "lucide-react";

interface Lead {
  id: string; name: string; headline: string | null; company: string | null;
  location: string | null; avatarUrl: string | null; profileUrl: string;
  icpScore: number | null; status: string;
}

const SCORE_COLOR = (s: number | null) => {
  if (s === null) return "var(--text-muted)";
  if (s >= 70) return "#22c55e";
  if (s >= 40) return "#f59e0b";
  return "#ef4444";
};

export default function LeadsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(0);

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/leads`);
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
    }
  }

  useEffect(() => { load(); }, [id]);

  async function deleteSelected() {
    if (!confirm(`Delete ${selected.size} lead(s)?`)) return;
    await Promise.all([...selected].map(lid => fetch(`/api/leads/${lid}`, { method: "DELETE" })));
    setSelected(new Set());
    load();
  }

  function toggleSelect(lid: string) {
    setSelected(s => { const n = new Set(s); n.has(lid) ? n.delete(lid) : n.add(lid); return n; });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/campaigns/${id}/overview`}
          className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} />Back
        </Link>
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Leads <span className="font-normal text-sm" style={{ color: "var(--text-muted)" }}>{total}</span>
        </h2>
        <div className="ml-auto flex gap-2">
          {selected.size > 0 && (
            <Button variant="outline" size="sm" onClick={deleteSelected}
              style={{ borderColor: "var(--border)", color: "#ef4444" }}>
              <Trash2 size={14} className="mr-1" />Delete {selected.size}
            </Button>
          )}
          <Button size="sm" onClick={() => setModalOpen(true)}
            style={{ background: "var(--accent)", color: "#fff" }}>
            <Sparkles size={14} className="mr-2" />Smart Prospecting
          </Button>
        </div>
      </div>
      {leads.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>No leads yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>Use Smart Prospecting to find your ideal customers.</p>
          <Button onClick={() => setModalOpen(true)} style={{ background: "var(--accent)", color: "#fff" }}>
            <Sparkles size={14} className="mr-2" />Smart Prospecting
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "var(--bg-subtle)" }}>
              <tr>
                <th className="p-3 text-left w-8">
                  <input type="checkbox"
                    checked={selected.size === leads.length && leads.length > 0}
                    onChange={e => setSelected(e.target.checked ? new Set(leads.map(l => l.id)) : new Set())} />
                </th>
                <th className="p-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                <th className="p-3 text-left font-medium hidden md:table-cell" style={{ color: "var(--text-muted)" }}>Location</th>
                <th className="p-3 text-left font-medium hidden lg:table-cell" style={{ color: "var(--text-muted)" }}>Headline</th>
                <th className="p-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>ICP</th>
                <th className="p-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }} className="hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" checked={selected.has(lead.id)} onChange={() => toggleSelect(lead.id)} /></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7 shrink-0">
                        <AvatarImage src={lead.avatarUrl ?? undefined} />
                        <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 11 }}>{lead.name?.charAt(0) ?? "?"}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium truncate max-w-[140px]" style={{ color: "var(--text-primary)" }}>{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell" style={{ color: "var(--text-muted)" }}>{lead.location ?? "—"}</td>
                  <td className="p-3 hidden lg:table-cell" style={{ color: "var(--text-muted)" }}>
                    <span className="truncate block max-w-[200px]">{lead.headline ?? "—"}</span>
                  </td>
                  <td className="p-3">
                    {lead.icpScore !== null ? (
                      <Badge style={{ background: "transparent", border: `1px solid ${SCORE_COLOR(lead.icpScore)}`, color: SCORE_COLOR(lead.icpScore), fontSize: 11 }}>
                        {lead.icpScore}
                      </Badge>
                    ) : <span className="text-xs" style={{ color: "var(--text-muted)" }}>—</span>}
                  </td>
                  <td className="p-3">
                    <a href={lead.profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                      <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <SmartProspectingModal open={modalOpen} onClose={() => setModalOpen(false)} campaignId={id} onImported={load} />
    </div>
  );
}
