export const CONSENT_COOKIE_NAME = "scribtly_consent";
export const CONSENT_COOKIE_MAX_AGE_DAYS = 180;
export const CONSENT_VERSION = 1;

export type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
};

export function defaultConsent(): Consent {
  return {
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

export function acceptAllConsent(): Consent {
  return {
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

export function rejectAllConsent(): Consent {
  return defaultConsent();
}

export function parseConsent(raw: string | undefined | null): Consent | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const obj = JSON.parse(decoded);
    if (
      obj &&
      typeof obj === "object" &&
      obj.essential === true &&
      typeof obj.analytics === "boolean" &&
      typeof obj.marketing === "boolean" &&
      typeof obj.timestamp === "string" &&
      typeof obj.version === "number"
    ) {
      return obj as Consent;
    }
    return null;
  } catch {
    return null;
  }
}

export function serializeConsent(consent: Consent): string {
  return encodeURIComponent(JSON.stringify(consent));
}

export function needsReconsent(consent: Consent | null): boolean {
  if (!consent) return true;
  return consent.version < CONSENT_VERSION;
}

// Browser-only helpers
export function readConsentFromDocument(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.substring(CONSENT_COOKIE_NAME.length + 1);
  return parseConsent(value);
}

export function writeConsentToDocument(consent: Consent): void {
  if (typeof document === "undefined") return;
  const maxAge = CONSENT_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  const parts = [
    `${CONSENT_COOKIE_NAME}=${serializeConsent(consent)}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  document.cookie = parts.join("; ");
}
