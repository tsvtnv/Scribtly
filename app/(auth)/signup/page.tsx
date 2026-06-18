"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Create your account
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Get started with Scribtly
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Your name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Alex Smith"
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Minimum 8 characters"
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs px-3 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--accent)" }}
      >
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-medium underline" style={{ color: "var(--accent)" }}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
