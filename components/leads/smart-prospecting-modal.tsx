"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Loader2 } from "lucide-react";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  headline?: string;
  location?: string;
  profile_picture_url?: string;
  company_name?: string;
  profile_url: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  campaignId: string;
  onImported: () => void;
}

const IMPORT_COUNTS = [50, 100, 200, 500];

export function SmartProspectingModal({ open, onClose, campaignId, onImported }: Props) {
  const [query, setQuery] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [importCount, setImportCount] = useState(100);
  const [error, setError] = useState("");
  const [importedMsg, setImportedMsg] = useState("");

  async function handlePreview() {
    setPreviewing(true);
    setError("");
    setProfiles([]);
    setImportedMsg("");
    const res = await fetch("/api/prospecting/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, query }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Search failed"); setPreviewing(false); return; }
    setProfiles(data);
    setPreviewing(false);
  }

  async function handleImport() {
    setImporting(true);
    setError("");
    const toImport = profiles.slice(0, importCount);
    const res = await fetch("/api/prospecting/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, profiles: toImport }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Import failed"); setImporting(false); return; }
    setImportedMsg(`${data.imported} leads imported. Worker will enrich and score them shortly.`);
    setImporting(false);
    onImported();
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="max-w-lg" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-primary)" }}>Smart Prospecting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Describe who you want to reach. We'll search LinkedIn and show you a preview.
          </p>
          <Textarea value={query} onChange={e => setQuery(e.target.value)} rows={3}
            placeholder='e.g. "Directors at UK plumbing companies with 5-30 employees"'
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          <Button onClick={handlePreview} disabled={!query.trim() || previewing} className="w-full"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {previewing ? <><Loader2 size={14} className="mr-2 animate-spin" />Searching…</> : "Preview 15 profiles"}
          </Button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {profiles.length > 0 && (
            <>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Sample — click to open on LinkedIn.
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profiles.map(p => (
                  <a key={p.id} href={p.profile_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage src={p.profile_picture_url} />
                      <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                        {p.first_name?.charAt(0) ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {p.first_name} {p.last_name}
                      </p>
                      {p.headline && (
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{p.headline}</p>
                      )}
                    </div>
                    <ExternalLink size={12} style={{ color: "var(--text-muted)" }} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Import:</p>
                <div className="flex gap-1">
                  {IMPORT_COUNTS.map(n => (
                    <button key={n} onClick={() => setImportCount(n)}
                      className="px-3 py-1 rounded text-sm border transition-colors"
                      style={{
                        borderColor: importCount === n ? "var(--accent)" : "var(--border)",
                        background: importCount === n ? "rgba(224,120,48,0.08)" : "transparent",
                        color: importCount === n ? "var(--accent)" : "var(--text-muted)",
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
                <Button onClick={handleImport} disabled={importing} size="sm"
                  style={{ background: "var(--accent)", color: "#fff", marginLeft: "auto" }}>
                  {importing ? <Loader2 size={12} className="animate-spin" /> : "Import"}
                </Button>
              </div>
              {importedMsg && <p className="text-sm text-green-600">{importedMsg}</p>}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
