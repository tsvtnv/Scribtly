"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ScriptTitleEditor({ scriptId, initial }: { scriptId: string; initial: string }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial);
  const [dirty, setDirty] = useState(false);

  async function save() {
    if (!dirty) return;
    setDirty(false);
    const res = await fetch(`/api/scripts/${scriptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim() || "Untitled" }),
    });
    if (res.ok) router.refresh();
  }

  return (
    <input
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
        setDirty(true);
      }}
      onBlur={save}
      className="w-full bg-transparent text-2xl font-semibold tracking-tight outline-none focus:ring-0 border-b-2 border-transparent focus:border-primary/40 pb-1"
      maxLength={200}
    />
  );
}
