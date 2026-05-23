import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scriptfast.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ScriptFast — AI video scripts for freelancers",
    template: "%s | ScriptFast",
  },
  description:
    "ScriptFast generates YouTube, TikTok, and Reels scripts in your client's exact voice in under 60 seconds. Save each client's brand voice once, generate unlimited scripts forever.",
  keywords: [
    "AI script writer",
    "YouTube script generator",
    "TikTok script writer",
    "video script freelancer",
    "content creator tools",
    "AI content writing",
    "script generator for freelancers",
  ],
  authors: [{ name: "ScriptFast" }],
  creator: "ScriptFast",
  publisher: "ScriptFast",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: APP_URL,
    siteName: "ScriptFast",
    title: "ScriptFast — AI video scripts for freelancers",
    description:
      "ScriptFast generates YouTube, TikTok, and Reels scripts in your client's exact voice in under 60 seconds. Save each client's brand voice once, generate unlimited scripts forever.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ScriptFast — AI video script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptFast — AI video scripts for freelancers",
    description:
      "Generate YouTube, TikTok, and Reels scripts in your client's exact voice in under 60 seconds.",
    images: ["/og-image.png"],
    creator: "@scriptfast",
  },
  alternates: {
    canonical: APP_URL,
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${serif.variable}`}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
