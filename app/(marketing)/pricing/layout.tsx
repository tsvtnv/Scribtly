import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, predictable pricing for freelancers and agencies. Start free with 5 scripts, then scale up. No surprise per-seat fees.",
  keywords: ["Scribtly pricing", "AI script generator pricing", "video script writer cost"],
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
    siteName: "Scribtly",
    title: "Pricing · Scribtly",
    description:
      "Simple, predictable pricing for freelancers and agencies. Start free with 5 scripts.",
    images: [{ url: "/brand/og-hero.png", width: 1536, height: 1024, alt: "Scribtly pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing · Scribtly",
    description:
      "Simple, predictable pricing for freelancers and agencies. Start free with 5 scripts.",
    images: ["/brand/social-banner.png"],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
