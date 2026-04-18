export interface GeoData {
  country: string;
  city: string | null;
  region: string | null;
}

const LOCAL_IPS = new Set(["127.0.0.1", "::1", "localhost", "::ffff:127.0.0.1", "0.0.0.0"]);

export async function getGeoFromIp(ip: string): Promise<GeoData | null> {
  if (LOCAL_IPS.has(ip)) return null;
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,city,region`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return null;
    const data = await res.json() as { country?: string; city?: string; region?: string };
    if (!data.country) return null;
    return { country: data.country, city: data.city ?? null, region: data.region ?? null };
  } catch {
    return null;
  }
}
