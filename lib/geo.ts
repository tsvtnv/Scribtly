export interface GeoData {
  country: string;
  city: string;
  region: string;
}

const LOCAL_IPS = new Set(["127.0.0.1", "::1", "localhost"]);

export async function getGeoFromIp(ip: string): Promise<GeoData | null> {
  if (LOCAL_IPS.has(ip)) return null;
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,city,region`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.country) return null;
    return { country: data.country, city: data.city, region: data.region };
  } catch {
    return null;
  }
}
