"use client";

import { useRouter } from "next/navigation";

export function ImpersonationBannerClient() {
  const router = useRouter();

  async function exit() {
    await fetch("/api/admin/impersonate/exit", { method: "POST", credentials: "include" });
    router.push("/admin");
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[9999] bg-amber-500 text-black px-4 py-2 flex items-center justify-between text-sm font-medium shadow-md">
      <span>
        You are impersonating a user. Actions you take here affect their real account.
      </span>
      <button
        onClick={exit}
        className="ml-4 px-3 py-1 rounded-md bg-black/15 hover:bg-black/25 transition-colors text-xs font-semibold shrink-0"
      >
        Exit impersonation → /admin
      </button>
    </div>
  );
}
