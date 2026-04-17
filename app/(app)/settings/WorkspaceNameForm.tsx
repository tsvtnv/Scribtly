"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function WorkspaceNameForm({ initial }: { initial: string }) {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState(initial);
  const [saving, setSaving] = useState(false);
  const dirty = name.trim() !== initial;

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/workspace", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (res.ok) {
        toast.push("Workspace renamed", "success");
        router.refresh();
      } else {
        toast.push("Save failed", "error");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
      {dirty ? (
        <Button size="sm" loading={saving} onClick={save}>
          Save
        </Button>
      ) : null}
    </div>
  );
}
