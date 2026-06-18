"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Loader2, Sparkles, Users, CheckCircle2, MapPin, Building2, X } from "lucide-react";

interface Profile {
  id: string;
  name: string;
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
  const [location, setLocation] = useState("United Kingdom");
  const [previewing, setPreviewing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [importCount, setImportCount] = useState(100);
  const [error, setError] = useState("");
  const [importedMsg, setImportedMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handlePreview() {
    setPreviewing(true);
    setError("");
    setProfiles([]);
    setImportedMsg("");
    setSearchQuery("");
    const res = await fetch("/api/prospecting/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, query, location: location.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Search failed"); setPreviewing(false); return; }
    setProfiles(data.items ?? []);
    setSearchQuery(data.searchQuery ?? "");
    setPreviewing(false);
  }

  async function handleImport() {
    setImporting(true);
    setError("");
    const res = await fetch("/api/prospecting/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, query, count: importCount, location: location.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Import failed"); setImporting(false); return; }
    setImportedMsg(`${data.imported} leads imported successfully.`);
    setImporting(false);
    onImported();
  }

  function handleClose() {
    setQuery("");
    setProfiles([]);
    setError("");
    setImportedMsg("");
    setSearchQuery("");
    setLocation("United Kingdom");
    onClose();
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      {/* Backdrop */}
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 680,
        background: "var(--bg-base)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: "90vh",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(224,120,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Sparkles size={17} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Smart Prospecting</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>Describe who you want to reach — we'll find them on LinkedIn</p>
          </div>
          <button onClick={handleClose} style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "var(--bg-subtle)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Search row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && query.trim()) handlePreview(); }}
              rows={2}
              placeholder='e.g. "Founders of small UK agencies who want to scale without hiring"'
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 14, resize: "none", borderRadius: 10 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Location (e.g. United Kingdom)"
                style={{ flex: 1, padding: "8px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13 }}
              />
              <Button
                onClick={handlePreview}
                disabled={!query.trim() || previewing}
                style={{ background: previewing || !query.trim() ? "rgba(224,120,48,0.5)" : "var(--accent)", color: "#fff", minWidth: 110, borderRadius: 10 }}
              >
                {previewing
                  ? <><Loader2 size={14} style={{ marginRight: 6, animation: "spin 1s linear infinite" }} />Searching…</>
                  : <><Sparkles size={14} style={{ marginRight: 6 }} />Preview</>}
              </Button>
            </div>
          </div>

          {error && (
            <div style={{ borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca" }}>
              {error}
            </div>
          )}

          {/* Skeleton while loading */}
          {previewing && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "var(--bg-subtle)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--border)", animation: "pulse 1.5s ease-in-out infinite" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ height: 12, width: 140, borderRadius: 6, background: "var(--border)", animation: "pulse 1.5s ease-in-out infinite" }} />
                    <div style={{ height: 10, width: 220, borderRadius: 6, background: "var(--border)", animation: "pulse 1.5s ease-in-out infinite" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {profiles.length > 0 && !previewing && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                  <strong style={{ color: "var(--text-primary)" }}>{profiles.length} profiles</strong> found
                </p>
                {searchQuery && (
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(224,120,48,0.1)", color: "var(--accent)", fontFamily: "monospace" }}>
                    searched: {searchQuery}
                  </span>
                )}
              </div>

              <div style={{ borderRadius: 12, border: "1px solid var(--border)", overflowY: "auto", maxHeight: 320 }}>
                  {profiles.map((p, i) => (
                    <a
                      key={p.id ?? i}
                      href={p.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 16px",
                        borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                        background: "var(--bg-base)",
                        textDecoration: "none",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-base)")}
                    >
                      <Avatar style={{ width: 40, height: 40, flexShrink: 0 }}>
                        <AvatarImage src={p.profile_picture_url} />
                        <AvatarFallback style={{ background: "rgba(224,120,48,0.1)", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
                          {p.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.name || "Unknown"}
                        </p>
                        {p.headline && (
                          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {p.headline}
                          </p>
                        )}
                        {(p.company_name || p.location) && (
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 3 }}>
                            {p.company_name && (
                              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                                <Building2 size={10} />{p.company_name}
                              </span>
                            )}
                            {p.location && (
                              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                                <MapPin size={10} />{p.location}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <ExternalLink size={13} style={{ color: "var(--text-muted)", flexShrink: 0, opacity: 0.5 }} />
                    </a>
                  ))}
              </div>

              {/* Import section */}
              {!importedMsg && (
                <div style={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-subtle)", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                    How many leads to import?
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                    {IMPORT_COUNTS.map(n => (
                      <button
                        key={n}
                        onClick={() => setImportCount(n)}
                        style={{
                          padding: "10px 0",
                          borderRadius: 10,
                          border: `1.5px solid ${importCount === n ? "var(--accent)" : "var(--border)"}`,
                          background: importCount === n ? "rgba(224,120,48,0.1)" : "var(--bg-base)",
                          color: importCount === n ? "var(--accent)" : "var(--text-muted)",
                          fontSize: 15,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleImport}
                    disabled={importing}
                    style={{
                      width: "100%",
                      padding: "12px 0",
                      borderRadius: 10,
                      border: "none",
                      background: importing ? "rgba(224,120,48,0.6)" : "var(--accent)",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: importing ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "background 0.15s",
                    }}
                  >
                    {importing
                      ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />Fetching &amp; importing {importCount} leads…</>
                      : <><Users size={15} />Import {importCount} leads into campaign</>}
                  </button>
                </div>
              )}

              {importedMsg && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 12, padding: "14px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <CheckCircle2 size={20} style={{ color: "#16a34a", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#166534", margin: 0 }}>{importedMsg}</p>
                    <p style={{ fontSize: 12, color: "#15803d", margin: "2px 0 0" }}>Being enriched and scored in the background.</p>
                  </div>
                  <button onClick={handleClose} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #bbf7d0", background: "transparent", color: "#15803d", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Done
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
