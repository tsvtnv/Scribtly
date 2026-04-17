"use client";
import { useEffect } from "react";

export function ScriptsPageTracker() {
  useEffect(() => {
    void fetch("/api/user/onboarding").catch(() => {});
  }, []);
  return null;
}
