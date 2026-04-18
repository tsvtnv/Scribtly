"use client";

import { useEffect, useRef } from "react";
import {
  trackPageView,
  trackFormStart,
  trackFormField,
  trackFormAbandon,
  trackPageExit,
} from "@/lib/referral-tracker";

interface Props {
  refLeadId: string;
}

export function SignupTracking({ refLeadId }: Props) {
  const startTime = useRef(Date.now());
  const lastField = useRef("");
  const formStarted = useRef(false);

  useEffect(() => {
    // Ensure cookie is set from URL param (belt-and-suspenders alongside middleware)
    document.cookie = `ref_lead_id=${refLeadId}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;

    trackPageView("/sign-up");

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const field =
        target.getAttribute("name") ||
        target.getAttribute("id") ||
        target.getAttribute("autocomplete") ||
        "unknown";

      if (!formStarted.current) {
        formStarted.current = true;
        trackFormStart("/sign-up");
      }
      lastField.current = field;
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const field =
        target.getAttribute("name") ||
        target.getAttribute("id") ||
        target.getAttribute("autocomplete") ||
        "unknown";
      if (field !== "unknown") {
        trackFormField("/sign-up", field);
      }
    };

    const handleExit = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (formStarted.current) {
        trackFormAbandon("/sign-up", lastField.current, seconds);
      } else {
        trackPageExit("/sign-up", seconds);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") handleExit();
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    window.addEventListener("beforeunload", handleExit);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
      window.removeEventListener("beforeunload", handleExit);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [refLeadId]);

  return null;
}
