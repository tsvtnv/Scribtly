"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  trackPageView,
  trackScrollDepth,
  trackCtaClick,
  trackPageExit,
} from "@/lib/referral-tracker";

interface RefLandingClientProps {
  leadId: string;
  agencyName: string;
  tagline: string;
  painPoints: string[];
  solutions: string[];
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function RefLandingClient({
  leadId,
  agencyName,
  tagline,
  painPoints,
  solutions,
}: RefLandingClientProps) {
  const router = useRouter();
  const startTime = useRef(Date.now());
  const firedThresholds = useRef(new Set<number>());

  useEffect(() => {
    trackPageView(`/ref/${leadId}`);

    const handleScroll = () => {
      const el = document.documentElement;
      const depth = Math.round(
        ((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100
      );
      for (const threshold of SCROLL_THRESHOLDS) {
        if (depth >= threshold && !firedThresholds.current.has(threshold)) {
          firedThresholds.current.add(threshold);
          trackScrollDepth(`/ref/${leadId}`, threshold);
        }
      }
    };

    const handleExit = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      trackPageExit(`/ref/${leadId}`, seconds);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") handleExit();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleExit);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleExit);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [leadId]);

  function handleCta() {
    trackCtaClick(`/ref/${leadId}`);
    router.push(`/signup?ref=${leadId}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-widest">
            Made for {agencyName}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome, {agencyName}.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            {tagline}
          </p>
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            Get free access for {agencyName} →
          </button>
        </div>
        <div className="absolute bottom-8 animate-bounce text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Sound familiar?</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Every agency at your stage runs into these same walls.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <span className="text-red-500 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Here&apos;s how Scribtly fixes it
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Built specifically for agencies managing multiple clients.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-primary/20 bg-primary/5 dark:bg-primary/10"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-3xl font-bold mb-2">4 hrs</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            saved per client per week on average by agencies using Scribtly
          </p>
          <blockquote className="text-gray-600 dark:text-gray-300 italic text-sm max-w-lg mx-auto">
            &ldquo;We went from spending half a day on client scripts to generating them in minutes. The voice profiles are eerily accurate.&rdquo;
          </blockquote>
          <p className="text-xs text-gray-400 mt-3">— Social media agency, London</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to try it, {agencyName}?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Free access. No credit card. Set up your first client voice profile in 2 minutes.
          </p>
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            Get free access for {agencyName} →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800">
        By visiting this page you agree to our{" "}
        <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
        {" "}We use cookies to track referral activity.
      </footer>
    </div>
  );
}
