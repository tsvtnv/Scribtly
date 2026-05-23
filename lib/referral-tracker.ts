"use client";

function getLeadId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)ref_lead_id=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

type EventType =
  | "page_view"
  | "page_exit"
  | "cta_click"
  | "scroll_depth"
  | "form_start"
  | "form_field"
  | "form_abandon"
  | "signup_complete"
  | "onboarding_step";

function send(eventType: EventType, page: string, metadata: Record<string, unknown> = {}) {
  const leadId = getLeadId();
  if (!leadId) return;
  const payload = JSON.stringify({ leadId, eventType, page, metadata });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  } else {
    fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
  }
}

export function trackPageView(page: string) {
  send("page_view", page);
}

export function trackScrollDepth(page: string, depth: number) {
  send("scroll_depth", page, { scrollDepth: depth });
}

export function trackCtaClick(page: string) {
  send("cta_click", page);
}

export function trackPageExit(page: string, timeOnPageSeconds: number) {
  send("page_exit", page, { timeOnPageSeconds });
}

export function trackFormStart(page: string) {
  send("form_start", page);
}

export function trackFormField(page: string, field: string) {
  send("form_field", page, { field });
}

export function trackFormAbandon(page: string, lastField: string, timeOnPageSeconds: number) {
  send("form_abandon", page, { lastField, timeOnPageSeconds });
}

export function trackSignupComplete(clerkUserId: string) {
  send("signup_complete", "/sign-up", { clerkUserId });
}

export function trackOnboardingStep(action: "enter" | "exit", step: number, timeSeconds?: number) {
  send("onboarding_step", "/onboarding", { action, step, timeSeconds });
}

export function trackOnboardingComplete(steps: Array<{ step: number; timeSeconds: number }>) {
  send("onboarding_step", "/onboarding", { completed: true, steps });
}
