import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "ScriptFast — AI video scripts for freelancers",
  description:
    "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://scriptfast.app"),
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
