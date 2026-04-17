"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Status = "idle" | "submitting" | "success" | "error" | "ratelimited";

export function EnterpriseContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    scripts_needed: 500,
    message: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 429) {
        setStatus("ratelimited");
        return;
      }
      let msg = "Something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (data?.error) msg = String(data.error);
      } catch {
        /* ignore */
      }
      setErrorMsg(msg);
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
        <p className="text-base font-medium text-text-primary dark:text-dark-text">
          Thanks — message received.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
          We&apos;ll be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1.5">
          Name <span className="text-danger">*</span>
        </label>
        <Input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Jane Doe"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1.5">
          Email <span className="text-danger">*</span>
        </label>
        <Input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1.5">
          Company
        </label>
        <Input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="Acme Media"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1.5">
          Scripts needed per month <span className="text-danger">*</span>
        </label>
        <Input
          required
          type="number"
          min={1}
          value={form.scripts_needed}
          onChange={(e) => update("scripts_needed", Number(e.target.value) || 0)}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1.5">
          Message
        </label>
        <Textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your team and what you need."
        />
      </div>

      {status === "error" && errorMsg ? (
        <div className="md:col-span-2 text-sm text-danger">{errorMsg}</div>
      ) : null}
      {status === "ratelimited" ? (
        <div className="md:col-span-2 text-sm text-danger">
          Too many submissions. Try again later.
        </div>
      ) : null}

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" loading={status === "submitting"} size="lg">
          Contact sales
        </Button>
      </div>
    </form>
  );
}
