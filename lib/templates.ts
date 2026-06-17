interface LeadVars {
  name?: string | null;
  company?: string | null;
  headline?: string | null;
  city?: string | null;
  country?: string | null;
  cta_link?: string | null;
}

export function fillTemplate(template: string, vars: LeadVars): string {
  return template
    .replace(/\{\{name\}\}/g, vars.name ?? "")
    .replace(/\{\{company\}\}/g, vars.company ?? "")
    .replace(/\{\{headline\}\}/g, vars.headline ?? "")
    .replace(/\{\{city\}\}/g, vars.city ?? "")
    .replace(/\{\{country\}\}/g, vars.country ?? "")
    .replace(/\{\{cta_link\}\}/g, vars.cta_link ?? "");
}

export function parseLocation(location: string | null | undefined): { city?: string; country?: string } {
  if (!location) return {};
  const parts = location.split(",").map(s => s.trim());
  return { city: parts[0], country: parts[parts.length - 1] };
}
