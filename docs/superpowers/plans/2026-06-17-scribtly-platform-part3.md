# Scribtly LinkedIn Outreach Platform — Implementation Plan (Part 3 of 4)

> Continues from Part 2. Tasks 7–10: Smart Prospecting, Campaign Detail Pages, Inbox, Dashboard.

---

## Task 7: Smart Prospecting + Lead Import

**Files:**
- Create: `lib/templates.ts`
- Create: `app/api/prospecting/preview/route.ts`
- Create: `app/api/prospecting/import/route.ts`
- Create: `app/api/leads/[id]/route.ts`
- Create: `components/leads/smart-prospecting-modal.tsx`
- Create: `app/(app)/campaigns/[id]/leads/page.tsx`

**Interfaces:**
- Produces: `fillTemplate(template, lead)` from `lib/templates.ts`
- Produces: `POST /api/prospecting/preview` → profile preview array
- Produces: `POST /api/prospecting/import` → `{ imported: number }`

- [ ] **Step 1: Write `lib/templates.ts`**

```typescript
interface LeadVars {
  name?: string | null;
  company?: string | null;
  headline?: string | null;
  city?: string | null;
  country?: string | null;
  cta_link?: string | null;
}

export function fillTemplate(template: string, vars: LeadVars): string {
  return template
    .replace(/\{\{name\}\}/g, vars.name ?? "")
    .replace(/\{\{company\}\}/g, vars.company ?? "")
    .replace(/\{\{headline\}\}/g, vars.headline ?? "")
    .replace(/\{\{city\}\}/g, vars.city ?? "")
    .replace(/\{\{country\}\}/g, vars.country ?? "")
    .replace(/\{\{cta_link\}\}/g, vars.cta_link ?? "");
}

export function parseLocation(location: string | null | undefined): { city?: string; country?: string } {
  if (!location) return {};
  const parts = location.split(",").map(s => s.trim());
  return { city: parts[0], country: parts[parts.length - 1] };
}
```

- [ ] **Step 2: Write `app/api/prospecting/preview/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";
import { z } from "zod";

const schema = z.object({
  campaignId: z.string(),
  query: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const campaign = await prisma.campaign.findFirst({
    where: { id: parsed.data.campaignId, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

  const results = await unipile.searchPeople(
    campaign.linkedInAccount.unipileAccountId,
    parsed.data.query,
    15
  );

  return NextResponse.json(results.items);
}
```

- [ ] **Step 3: Write `app/api/prospecting/import/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  headline: z.string().optional(),
  location: z.string().optional(),
  profile_picture_url: z.string().optional(),
  company_name: z.string().optional(),
  profile_url: z.string(),
});

const schema = z.object({
  campaignId: z.string(),
  profiles: z.array(profileSchema).min(1).max(500),
});

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { campaignId, profiles } = parsed.data;

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, workspaceId: user.workspaceId },
  });
  if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

  const workspace = await prisma.workspace.findUnique({ where: { id: user.workspaceId } });

  let imported = 0;
  for (const p of profiles) {
    // Skip duplicates across campaigns if setting is off
    if (!workspace?.allowDuplicateLeads) {
      const exists = await prisma.lead.findFirst({
        where: { workspaceId: user.workspaceId, linkedInProfileId: p.id, campaign: { status: { not: "COMPLETED" } } },
      });
      if (exists) continue;
    }

    try {
      await prisma.lead.upsert({
        where: { campaignId_linkedInProfileId: { campaignId, linkedInProfileId: p.id } },
        create: {
          workspaceId: user.workspaceId,
          campaignId,
          linkedInProfileId: p.id,
          name: `${p.first_name} ${p.last_name}`.trim(),
          headline: p.headline,
          company: p.company_name,
          location: p.location,
          avatarUrl: p.profile_picture_url,
          profileUrl: p.profile_url,
        },
        update: {},
      });
      imported++;
    } catch {
      // skip duplicates
    }
  }

  return NextResponse.json({ imported });
}
```

- [ ] **Step 4: Write `app/api/leads/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const lead = await prisma.lead.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 5: Write `components/leads/smart-prospecting-modal.tsx`**

```typescript
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
    // Use the previewed profiles as seeds; for a real import we'd fetch more
    // but here we send the previewed ones and signal how many the user wants
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
            placeholder='e.g. "Directors at UK plumbing companies with 5–30 employees"'
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />

          <Button onClick={handlePreview} disabled={!query.trim() || previewing} className="w-full"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {previewing ? <><Loader2 size={14} className="mr-2 animate-spin" />Searching…</> : "Preview 15 profiles"}
          </Button>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {profiles.length > 0 && (
            <>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Here's a sample. Click any profile to open on LinkedIn.
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profiles.map(p => (
                  <a key={p.id} href={p.profile_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage src={p.profile_picture_url} />
                      <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                        {p.first_name.charAt(0)}
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
```

- [ ] **Step 6: Write `app/(app)/campaigns/[id]/leads/page.tsx`**

```typescript
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
  if (!s) return "var(--text-muted)";
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
    setSelected(s => {
      const n = new Set(s);
      n.has(lid) ? n.delete(lid) : n.add(lid);
      return n;
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/campaigns/${id}/overview`}
          className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} />Back
        </Link>
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Leads <span className="font-normal text-sm" style={{ color: "var(--text-muted)" }}>{total} / 1,000</span>
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
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
            Use Smart Prospecting to find your ideal customers.
          </p>
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
                <th className="p-3 text-left font-medium hidden lg:table-cell" style={{ color: "var(--text-muted)" }}>Title</th>
                <th className="p-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>ICP</th>
                <th className="p-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id}
                  style={{ borderTop: i > 0 ? `1px solid var(--border)` : undefined }}
                  className="hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" checked={selected.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7 shrink-0">
                        <AvatarImage src={lead.avatarUrl ?? undefined} />
                        <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 11 }}>
                          {lead.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium truncate max-w-[140px]" style={{ color: "var(--text-primary)" }}>
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell" style={{ color: "var(--text-muted)" }}>
                    {lead.location ?? "—"}
                  </td>
                  <td className="p-3 hidden lg:table-cell max-w-[200px]" style={{ color: "var(--text-muted)" }}>
                    <span className="truncate block">{lead.headline ?? "—"}</span>
                  </td>
                  <td className="p-3">
                    {lead.icpScore !== null ? (
                      <Badge style={{
                        background: "transparent",
                        border: `1px solid ${SCORE_COLOR(lead.icpScore)}`,
                        color: SCORE_COLOR(lead.icpScore),
                        fontSize: 11,
                      }}>
                        {lead.icpScore}
                      </Badge>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>
                  <td className="p-3">
                    <a href={lead.profileUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)" }}>
                      <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SmartProspectingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        campaignId={id}
        onImported={load}
      />
    </div>
  );
}
```

- [ ] **Step 7: Write `app/api/campaigns/[id]/leads/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: { campaignId: id },
      orderBy: [{ icpScore: "desc" }, { createdAt: "desc" }],
      take: 500,
    }),
    prisma.lead.count({ where: { campaignId: id } }),
  ]);

  return NextResponse.json({ leads, total });
}
```

- [ ] **Step 8: Commit**

```bash
git add lib/templates.ts app/api/prospecting/ app/api/leads/ app/api/campaigns/ components/leads/ app/\(app\)/campaigns/
git commit -m "feat: smart prospecting modal, lead import API, leads table"
```

---

## Task 8: Campaign Detail Pages (Overview + Approvals + Activity)

**Files:**
- Create: `app/(app)/campaigns/[id]/layout.tsx`
- Create: `app/(app)/campaigns/[id]/overview/page.tsx`
- Create: `app/(app)/campaigns/[id]/approvals/page.tsx`
- Create: `app/(app)/campaigns/[id]/activity/page.tsx`
- Create: `app/api/campaigns/[id]/approvals/route.ts`
- Create: `app/api/messages/[id]/approve/route.ts`
- Create: `app/api/messages/[id]/reject/route.ts`
- Create: `app/api/campaigns/[id]/events/route.ts`

**Interfaces:**
- Produces: campaign tab nav shared across all `[id]/*` sub-pages

- [ ] **Step 1: Write `app/(app)/campaigns/[id]/layout.tsx`**

```typescript
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CampaignTabs } from "@/components/campaigns/campaign-tabs";

export default async function CampaignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const { id } = await params;

  const campaign = await prisma.campaign.findFirst({
    where: { id, workspaceId: user.workspaceId },
    include: { linkedInAccount: { select: { name: true } } },
  });
  if (!campaign) redirect("/campaigns");

  return (
    <div>
      <CampaignTabs campaign={campaign} />
      <div className="mt-6">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/campaigns/campaign-tabs.tsx`**

```typescript
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  linkedInAccount: { name: string };
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e", DRAFT: "var(--text-muted)", PAUSED: "#f59e0b", COMPLETED: "var(--text-muted)",
};

const TABS = [
  { label: "Overview", path: "overview" },
  { label: "Leads", path: "leads" },
  { label: "Approvals", path: "approvals" },
  { label: "Activity", path: "activity" },
];

export function CampaignTabs({ campaign }: { campaign: Campaign }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Link href="/campaigns" className="flex items-center gap-1 text-sm"
          style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} />Back
        </Link>
        <h1 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{campaign.name}</h1>
        <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border"
          style={{ borderColor: STATUS_COLORS[campaign.status], color: STATUS_COLORS[campaign.status] }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: STATUS_COLORS[campaign.status] }} />
          {campaign.status.charAt(0) + campaign.status.slice(1).toLowerCase()}
        </span>
      </div>

      <div className="flex gap-0 border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map(tab => {
          const href = `/campaigns/${campaign.id}/${tab.path}`;
          const active = pathname.endsWith(tab.path);
          return (
            <Link key={tab.path} href={href}
              className="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
              style={{
                borderBottomColor: active ? "var(--accent)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-muted)",
              }}>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `app/(app)/campaigns/[id]/overview/page.tsx`**

```typescript
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CampaignOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const { id } = await params;

  const [campaign, leads, contacted, accepted, replied, recentEvents] = await Promise.all([
    prisma.campaign.findFirst({
      where: { id, workspaceId: user.workspaceId },
      include: { linkedInAccount: { select: { name: true, connSentToday: true, dailyConnLimit: true } } },
    }),
    prisma.lead.count({ where: { campaignId: id } }),
    prisma.lead.count({ where: { campaignId: id, status: { in: ["CONTACTED", "ACCEPTED", "REPLIED"] } } }),
    prisma.lead.count({ where: { campaignId: id, status: { in: ["ACCEPTED", "REPLIED"] } } }),
    prisma.lead.count({ where: { campaignId: id, status: "REPLIED" } }),
    prisma.event.findMany({
      where: { campaignId: id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  if (!campaign) redirect("/campaigns");

  const todaySent = campaign.linkedInAccount.connSentToday;
  const todayLimit = campaign.linkedInAccount.dailyConnLimit;

  async function toggleStatus() {
    "use server";
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/campaigns/${id}/activate`, { method: "POST" });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: stats */}
      <div className="rounded-xl border p-5 space-y-4"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "TYPE", value: campaign.type.replace("_", " ") },
            { label: "ACCOUNT", value: campaign.linkedInAccount.name },
            { label: "CREATED", value: new Date(campaign.createdAt).toLocaleDateString("en-GB") },
            { label: "STATUS", value: campaign.status },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Leads", value: leads },
              { label: "Contacted", value: contacted },
              { label: "Accepted", value: accepted },
              { label: "Replied", value: replied },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>TODAY</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              {todaySent} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {todayLimit}</span>
            </p>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
            <div className="h-1.5 rounded-full"
              style={{ width: `${Math.min((todaySent / todayLimit) * 100, 100)}%`, background: "var(--accent)" }} />
          </div>
        </div>

        <form action={toggleStatus}>
          <Button type="submit" className="w-full" variant="outline"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
            {campaign.status === "ACTIVE" ? "Pause campaign" : "Activate campaign"}
          </Button>
        </form>
      </div>

      {/* Centre: activity feed */}
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Activity</p>
        {recentEvents.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet. Import leads to get started.</p>
        ) : (
          <ul className="space-y-3">
            {recentEvents.map(ev => (
              <li key={ev.id} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "var(--accent)" }} />
                <div>
                  <p style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ").toLowerCase()}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(ev.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: quick settings */}
      <div className="rounded-xl border p-5 space-y-3"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Campaign Settings</p>
        {[
          { label: "Approval", value: campaign.requireApproval ? "Required" : "Auto-send" },
          { label: "Follow-ups", value: campaign.followUpsEnabled ? `${campaign.followUpCount}x after ${campaign.followUpDelayDays}d` : "Disabled" },
          { label: "Auto Book", value: campaign.autoBookEnabled ? "Enabled" : "Disabled" },
        ].map(s => (
          <div key={s.label} className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
            <span style={{ color: "var(--text-primary)" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write approvals API + page**

`app/api/campaigns/[id]/approvals/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const messages = await prisma.message.findMany({
    where: { campaignId: id, status: "PENDING_APPROVAL" },
    include: { lead: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}
```

`app/api/messages/[id]/approve/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const message = await prisma.message.findFirst({
    where: { id },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
  });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    if (message.type === "CONNECTION_NOTE") {
      await unipile.sendConnectionRequest(
        message.campaign.linkedInAccount.unipileAccountId,
        message.lead.linkedInProfileId,
        message.content
      );
    } else {
      const conv = await prisma.conversation.findUnique({ where: { leadId: message.leadId } });
      if (conv) {
        await unipile.sendMessage(
          message.campaign.linkedInAccount.unipileAccountId,
          conv.unipileThreadId,
          message.content
        );
      }
    }

    await prisma.message.update({ where: { id }, data: { status: "SENT", sentAt: new Date() } });
    await prisma.lead.update({ where: { id: message.leadId }, data: { status: "CONTACTED", contactedAt: new Date() } });
    await prisma.linkedInAccount.update({
      where: { id: message.campaign.linkedInAccountId },
      data: { connSentToday: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    await prisma.message.update({ where: { id }, data: { status: "FAILED" } });
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
```

`app/api/messages/[id]/reject/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const message = await prisma.message.findFirst({
    where: { id },
    include: { campaign: true },
  });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.message.update({ where: { id }, data: { status: "FAILED" } });
  await prisma.lead.update({ where: { id: message.leadId }, data: { status: "SKIPPED" } });
  return NextResponse.json({ success: true });
}
```

`app/(app)/campaigns/[id]/approvals/page.tsx`:

```typescript
"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface Approval {
  id: string; content: string; type: string;
  lead: { name: string; company: string | null; avatarUrl: string | null; icpScore: number | null };
}

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>([]);

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/approvals`);
    if (res.ok) setApprovals(await res.json());
  }

  useEffect(() => { load(); }, [id]);

  async function approve(msgId: string) {
    await fetch(`/api/messages/${msgId}/approve`, { method: "POST" });
    load();
  }

  async function reject(msgId: string) {
    await fetch(`/api/messages/${msgId}/reject`, { method: "POST" });
    load();
  }

  if (approvals.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
        <p className="font-medium" style={{ color: "var(--text-primary)" }}>All caught up</p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages pending approval.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {approvals.map(a => (
        <div key={a.id} className="rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={a.lead.avatarUrl ?? undefined} />
              <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                {a.lead.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.lead.name}</p>
              {a.lead.company && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.lead.company}</p>
              )}
            </div>
            {a.lead.icpScore !== null && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                ICP {a.lead.icpScore}
              </span>
            )}
          </div>
          <p className="text-sm p-3 rounded-lg mb-3"
            style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
            {a.content}
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => approve(a.id)}
              style={{ background: "var(--accent)", color: "#fff" }}>Approve & send</Button>
            <Button size="sm" variant="outline" onClick={() => reject(a.id)}
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>Skip</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Write activity page**

`app/api/campaigns/[id]/events/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const campaign = await prisma.campaign.findFirst({ where: { id, workspaceId: user.workspaceId } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dateParam = req.nextUrl.searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();
  const start = new Date(date); start.setHours(0, 0, 0, 0);
  const end = new Date(date); end.setHours(23, 59, 59, 999);

  const events = await prisma.event.findMany({
    where: { campaignId: id, createdAt: { gte: start, lte: end } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(events);
}
```

`app/(app)/campaigns/[id]/activity/page.tsx`:

```typescript
"use client";
import { useEffect, useState, use } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event { id: string; type: string; createdAt: string }

export default function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selected, setSelected] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`/api/campaigns/${id}/events?date=${selected.toISOString()}`)
      .then(r => r.json()).then(setEvents);
  }, [id, selected]);

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const firstDay = (startOfMonth(month).getDay() + 6) % 7; // Mon=0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>
            <ChevronLeft size={16} style={{ color: "var(--text-muted)" }} />
          </button>
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            {format(month, "MMMM yyyy")}
          </p>
          <button onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>
            <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
          {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
            <span key={d} style={{ color: "var(--text-muted)" }}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {days.map(day => {
            const isSelected = isSameDay(day, selected);
            const isToday = isSameDay(day, new Date());
            return (
              <button key={day.toISOString()}
                onClick={() => setSelected(day)}
                className="h-8 w-full rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isSelected ? "var(--accent)" : isToday ? "rgba(224,120,48,0.1)" : "transparent",
                  color: isSelected ? "#fff" : isToday ? "var(--accent)" : "var(--text-primary)",
                }}>
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events */}
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          {format(selected, "EEE, MMM d")}
        </p>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          {events.length} events
        </p>
        {events.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No events on this day.</p>
        ) : (
          <ul className="space-y-2">
            {events.map(ev => (
              <li key={ev.id} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <span style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ").toLowerCase()}</span>
                <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>
                  {format(new Date(ev.createdAt), "HH:mm")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add app/\(app\)/campaigns/ app/api/campaigns/ app/api/messages/ components/campaigns/
git commit -m "feat: campaign detail pages — overview, approvals, activity"
```
