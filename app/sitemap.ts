import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://scribtly.com";

  return [
    {
      url: base,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog/youtube-script-template`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
