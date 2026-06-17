"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConnectLinkedInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/accounts/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to connect account");
      setLoading(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      window.location.href = `${appUrl}/accounts`;
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--bg-subtle)" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Connect LinkedIn</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Your credentials are sent securely to Unipile
          </p>
        </div>
        {success ? (
          <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
            <CardContent className="pt-6 text-center">
              <p className="text-green-600 font-medium">LinkedIn account connected!</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Redirecting back to accounts…</p>
            </CardContent>
          </Card>
        ) : (
          <Card style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
            <CardHeader>
              <CardTitle style={{ color: "var(--text-primary)" }}>LinkedIn credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label style={{ color: "var(--text-muted)" }}>LinkedIn email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "var(--text-muted)" }}>LinkedIn password</Label>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }} />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full"
                  style={{ background: "var(--accent)", color: "#fff" }}>
                  {loading ? "Connecting…" : "Connect account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        <p className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
          Powered by <a href="https://octelis.com" className="underline">octelis.com</a>
        </p>
      </div>
    </div>
  );
}
