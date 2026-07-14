import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/campaigns", "/inbox", "/accounts", "/automation", "/settings", "/connect", "/api/"],
    },
    sitemap: "https://scribtly.com/sitemap.xml",
  };
}
