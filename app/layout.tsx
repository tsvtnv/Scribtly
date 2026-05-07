import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieConsent } from "@/components/consent/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scribtly — AI video scripts for freelancers",
    template: "%s · Scribtly",
  },
  description:
    "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  applicationName: "Scribtly",
  keywords: [
    "AI video script generator",
    "YouTube script writer",
    "TikTok script generator",
    "Reels script writer",
    "AI script for freelancers",
    "social media agency tools",
    "short-form video scripts",
  ],
  authors: [{ name: "Scribtly" }],
  creator: "Scribtly",
  publisher: "Scribtly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Scribtly",
    url: SITE_URL,
    title: "Scribtly — AI video scripts for freelancers",
    description:
      "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
    locale: "en_US",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly — AI video scripts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly — AI video scripts for freelancers",
    description:
      "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  category: "technology",
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scribtly",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "AI video script generator for freelancers and social media agencies. YouTube, TikTok, and Reels scripts written in your client's voice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ConsentProvider>
          {children}
          <CookieConsent />
        </ConsentProvider>
      </body>
    </html>
  );
}
