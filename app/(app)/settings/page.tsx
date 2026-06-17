"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Settings {
  user: { id: string; name: string | null; email: string };
  workspace: { name: string; allowDuplicateLeads: boolean; skipLowIcpLeads: boolean };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setSettings);
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: settings.user.name,
        workspaceName: settings.workspace.name,
        allowDuplicateLeads: settings.workspace.allowDuplicateLeads,
        skipLowIcpLeads: settings.workspace.skipLowIcpLeads,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateUser(k: keyof Settings["user"], v: string) {
    setSettings(s => s ? { ...s, user: { ...s.user, [k]: v } } : s);
  }
  function updateWs(k: keyof Settings["workspace"], v: string | boolean) {
    setSettings(s => s ? { ...s, workspace: { ...s.workspace, [k]: v } } : s);
  }

  if (!settings) return <div style={{ color: "var(--text-muted)" }}>Loading…</div>;

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Changes save when you click Save.</p>
      </div>
      <section className="space-y-4">
        <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Profile</h2>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Name</Label>
          <Input value={settings.user.name ?? ""} onChange={e => updateUser("name", e.target.value)}
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        </div>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Email</Label>
          <Input value={settings.user.email} disabled
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", opacity: 0.6 }} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Organisation</h2>
        <div className="space-y-1">
          <Label style={{ color: "var(--text-muted)" }}>Workspace name</Label>
          <Input value={settings.workspace.name} onChange={e => updateWs("name", e.target.value)}
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Allow duplicate leads across campaigns</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              When off, a lead can only exist in one active campaign at a time.
            </p>
          </div>
          <Switch checked={settings.workspace.allowDuplicateLeads}
            onCheckedChange={v => updateWs("allowDuplicateLeads", v)} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Skip low ICP leads</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Leads scored below 40 are never contacted.
            </p>
          </div>
          <Switch checked={settings.workspace.skipLowIcpLeads}
            onCheckedChange={v => updateWs("skipLowIcpLeads", v)} />
        </div>
      </section>
      <Button onClick={save} disabled={saving} style={{ background: "var(--accent)", color: "#fff" }}>
        {saved ? "Saved!" : saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
