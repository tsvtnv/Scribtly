"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Something went wrong</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
          We hit an unexpected error. Try again, or head back to your dashboard.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
