"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
      <CardHeader>
        <CardTitle style={{ color: "var(--text-primary)" }}>Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Your name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          <div className="space-y-1">
            <Label style={{ color: "var(--text-muted)" }}>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            Have an account? <Link href="/login" className="underline" style={{ color: "var(--accent)" }}>Sign in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
