interface ScriptsSearch {
  q?: string;
  clientId?: string;
  platform?: string;
  status?: string;
  page?: string;
}

export function makeHref(current: ScriptsSearch, patch: Partial<ScriptsSearch>): string {
  const params = new URLSearchParams();
  const merged = { ...current, ...patch } as Record<string, string | undefined>;
  Object.entries(merged).forEach(([k, v]) => {
    if (v && v !== "all") params.set(k, v);
  });
  const qs = params.toString();
  return qs ? `/scripts?${qs}` : "/scripts";
}
