"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Consent,
  acceptAllConsent,
  defaultConsent,
  needsReconsent,
  readConsentFromDocument,
  rejectAllConsent,
  writeConsentToDocument,
} from "@/lib/consent";

type ConsentCtx = {
  consent: Consent | null;
  hasChosen: boolean;
  bannerOpen: boolean;
  acceptAll(): void;
  rejectAll(): void;
  update(partial: Partial<Pick<Consent, "analytics" | "marketing">>): void;
  open(): void;
  close(): void;
};

const Ctx = createContext<ConsentCtx | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const existing = readConsentFromDocument();
    if (!existing || needsReconsent(existing)) {
      setConsent(null);
      setBannerOpen(true);
    } else {
      setConsent(existing);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Consent) => {
    writeConsentToDocument(next);
    setConsent(next);
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(acceptAllConsent()), [persist]);
  const rejectAll = useCallback(() => persist(rejectAllConsent()), [persist]);

  const update = useCallback(
    (partial: Partial<Pick<Consent, "analytics" | "marketing">>) => {
      const base = consent ?? defaultConsent();
      persist({
        ...base,
        ...partial,
        essential: true,
        timestamp: new Date().toISOString(),
      });
    },
    [consent, persist],
  );

  const open = useCallback(() => setBannerOpen(true), []);
  const close = useCallback(() => setBannerOpen(false), []);

  const value = useMemo<ConsentCtx>(
    () => ({
      consent,
      hasChosen: consent !== null,
      bannerOpen: hydrated && bannerOpen,
      acceptAll,
      rejectAll,
      update,
      open,
      close,
    }),
    [consent, hydrated, bannerOpen, acceptAll, rejectAll, update, open, close],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent(): ConsentCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
