"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {sent ? (
        <Alert>
          <AlertDescription>
            Check your inbox — we sent you a password reset link.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}

      <p className="text-center text-sm">
        <Link href="/login" className="underline hover:text-primary text-muted-foreground">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
