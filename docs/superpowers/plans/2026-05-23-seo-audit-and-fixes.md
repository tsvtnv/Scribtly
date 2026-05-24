# SEO Audit & Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all SEO issues blocking Google indexability and social sharing across every Scribtly page.

**Architecture:** Replace SVG OG image with a Next.js ImageResponse-generated PNG served at the app level; remove all explicit image overrides in page metadata so the root opengraph-image applies everywhere; fix structured data and sitemap issues inline.

**Tech Stack:** Next.js 14.2.5 App Router, `next/og` (built-in ImageResponse), TypeScript, Prisma (blog sitemap)

---

## Audit Summary — Issues Found

| # | Severity | Issue | Files Affected |
|---|----------|-------|----------------|
| 1 | CRITICAL | OG image is SVG — Facebook/Twitter/LinkedIn don't render it | All 10 pages + root layout |
| 2 | HIGH | Apple touch icon is SVG — Apple requires PNG | `app/layout.tsx` |
| 3 | HIGH | BreadcrumbList uses relative URLs — Schema.org needs absolute URLs | 5 pages |
| 4 | MEDIUM | `SoftwareApplication.priceCurrency` is "USD" but site uses GBP | 2 pages |
| 5 | MEDIUM | Blog sitemap `changeFrequency: "never"` — misleads crawlers | `app/sitemap.ts` |
| 6 | LOW | Missing `theme-color` meta — no brand color in mobile browser chrome | `app/layout.tsx` |

---

## File Map

| Action | File |
|--------|------|
| **Create** | `app/opengraph-image.tsx` — root PNG OG image via ImageResponse |
| **Create** | `app/apple-icon.tsx` — PNG Apple touch icon via ImageResponse |
| **Modify** | `app/layout.tsx` — remove explicit `images` + `icons`, add `theme-color` |
| **Modify** | `app/(marketing)/page.tsx` — remove explicit `images` |
| **Modify** | `app/(marketing)/youtube-scripts/page.tsx` — remove images + fix breadcrumb URLs |
| **Modify** | `app/(marketing)/tiktok-scripts/page.tsx` — remove images + fix breadcrumb URLs |
| **Modify** | `app/(marketing)/instagram-reels-scripts/page.tsx` — remove images + fix breadcrumb URLs |
| **Modify** | `app/(marketing)/ai-script-writer/page.tsx` — remove images + fix currency |
| **Modify** | `app/(marketing)/for-freelancers/page.tsx` — remove images + fix breadcrumb URLs |
| **Modify** | `app/(marketing)/for-agencies/page.tsx` — remove images + fix breadcrumb URLs |
| **Modify** | `app/(marketing)/blog/page.tsx` — remove explicit images |
| **Modify** | `app/(marketing)/blog/[slug]/page.tsx` — remove images from generateMetadata |
| **Modify** | `app/(marketing)/pricing/layout.tsx` — remove explicit images |
| **Modify** | `app/sitemap.ts` — fix blog changeFrequency |

---

## Task 1: Create root OG image (PNG via ImageResponse)

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create opengraph-image.tsx**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Scribtly — AI video scripts for freelancers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1830 50%, #0f0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* purple glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(127,119,221,0.25)",
            filter: "blur(80px)",
          }}
        />
        {/* green glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(56,193,114,0.15)",
            filter: "blur(70px)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7F77DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "white",
              fontWeight: 700,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Scribtly
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          AI video scripts for{" "}
          <span style={{ color: "#7F77DD" }}>freelancers</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          YouTube, TikTok &amp; Reels — in your client's voice, in 60 seconds
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(127,119,221,0.18)",
            border: "1px solid rgba(127,119,221,0.3)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 18,
          }}
        >
          scribtly.com
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:\Users\tsvet\Documents\Website Projects\Currently Workin On\scripter" && npx tsc --noEmit 2>&1 | head -20`

Expected: No errors related to opengraph-image.tsx

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: add ImageResponse PNG opengraph image (fixes SVG social preview)"
```

---

## Task 2: Create Apple touch icon (PNG)

**Files:**
- Create: `app/apple-icon.tsx`

- [ ] **Step 1: Create apple-icon.tsx**

```tsx
// app/apple-icon.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 40,
          background: "#7F77DD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 100,
          fontWeight: 700,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Update root layout icons to remove Apple SVG ref and let file-based icon apply**

In `app/layout.tsx`, change icons config from:
```ts
icons: {
  icon: "/icon.svg",
  shortcut: "/icon.svg",
  apple: "/icon.svg",
},
```
To:
```ts
icons: {
  icon: "/icon.svg",
  shortcut: "/icon.svg",
},
```
(Removing `apple` so Next.js auto-detects `app/apple-icon.tsx`)

- [ ] **Step 3: Commit**

```bash
git add app/apple-icon.tsx app/layout.tsx
git commit -m "fix: add PNG apple touch icon, remove SVG apple icon ref"
```

---

## Task 3: Remove explicit SVG OG images + add theme-color to root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update layout.tsx metadata**

Remove the `images` array from `openGraph` and `twitter` and add `themeColor`. Change:
```ts
openGraph: {
  type: "website",
  siteName: "Scribtly",
  url: SITE_URL,
  title: "Scribtly — AI video scripts for freelancers",
  description: "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  locale: "en_US",
  images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly — AI video scripts" }],
},
twitter: {
  card: "summary_large_image",
  title: "Scribtly — AI video scripts for freelancers",
  description: "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  images: ["/og-image.svg"],
},
```
To:
```ts
openGraph: {
  type: "website",
  siteName: "Scribtly",
  url: SITE_URL,
  title: "Scribtly — AI video scripts for freelancers",
  description: "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  locale: "en_US",
},
twitter: {
  card: "summary_large_image",
  title: "Scribtly — AI video scripts for freelancers",
  description: "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
},
```

Also add after `category: "technology"`:
```ts
other: {
  "theme-color": "#7F77DD",
},
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "fix: remove SVG OG image refs from root layout, add theme-color meta"
```

---

## Task 4: Remove SVG images from all marketing page metadata

Each page explicitly sets `images: [{ url: "/og-image.svg" }]` which overrides the root opengraph-image.tsx PNG. Remove from each.

**Files:**
- Modify: `app/(marketing)/page.tsx`
- Modify: `app/(marketing)/youtube-scripts/page.tsx`
- Modify: `app/(marketing)/tiktok-scripts/page.tsx`
- Modify: `app/(marketing)/instagram-reels-scripts/page.tsx`
- Modify: `app/(marketing)/ai-script-writer/page.tsx`
- Modify: `app/(marketing)/for-freelancers/page.tsx`
- Modify: `app/(marketing)/for-agencies/page.tsx`
- Modify: `app/(marketing)/blog/page.tsx`
- Modify: `app/(marketing)/pricing/layout.tsx`

For each file, remove the `images: [...]` line from both `openGraph` and `twitter` objects. Example: `app/(marketing)/page.tsx` changes from:
```ts
openGraph: {
  type: "website",
  url: "/",
  siteName: "Scribtly",
  title: "Scribtly: Write video scripts 10x faster",
  description: "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
  images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly — AI video scripts" }],
},
twitter: {
  card: "summary_large_image",
  title: "Scribtly: Write video scripts 10x faster",
  description: "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
  images: ["/og-image.svg"],
},
```
To:
```ts
openGraph: {
  type: "website",
  url: "/",
  siteName: "Scribtly",
  title: "Scribtly: Write video scripts 10x faster",
  description: "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
},
twitter: {
  card: "summary_large_image",
  title: "Scribtly: Write video scripts 10x faster",
  description: "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
},
```
Apply the same pattern to all 9 files.

- [ ] **Step 1: Update app/(marketing)/page.tsx** — remove images
- [ ] **Step 2: Update app/(marketing)/youtube-scripts/page.tsx** — remove images
- [ ] **Step 3: Update app/(marketing)/tiktok-scripts/page.tsx** — remove images
- [ ] **Step 4: Update app/(marketing)/instagram-reels-scripts/page.tsx** — remove images
- [ ] **Step 5: Update app/(marketing)/ai-script-writer/page.tsx** — remove images
- [ ] **Step 6: Update app/(marketing)/for-freelancers/page.tsx** — remove images
- [ ] **Step 7: Update app/(marketing)/for-agencies/page.tsx** — remove images
- [ ] **Step 8: Update app/(marketing)/blog/page.tsx** — remove images
- [ ] **Step 9: Update app/(marketing)/pricing/layout.tsx** — remove images
- [ ] **Step 10: Commit**

```bash
git add app/(marketing)/page.tsx \
  "app/(marketing)/youtube-scripts/page.tsx" \
  "app/(marketing)/tiktok-scripts/page.tsx" \
  "app/(marketing)/instagram-reels-scripts/page.tsx" \
  "app/(marketing)/ai-script-writer/page.tsx" \
  "app/(marketing)/for-freelancers/page.tsx" \
  "app/(marketing)/for-agencies/page.tsx" \
  "app/(marketing)/blog/page.tsx" \
  "app/(marketing)/pricing/layout.tsx"
git commit -m "fix: remove SVG OG image overrides from all page metadata"
```

---

## Task 5: Fix blog/[slug] generateMetadata — remove SVG image

**Files:**
- Modify: `app/(marketing)/blog/[slug]/page.tsx`

- [ ] **Step 1: Update generateMetadata to remove images**

Change:
```ts
openGraph: {
  type: "article",
  url: `/blog/${post.slug}`,
  siteName: "Scribtly",
  title: post.title,
  description: post.metaDescription,
  publishedTime: post.publishedAt.toISOString(),
  images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: post.title }],
},
twitter: {
  card: "summary_large_image",
  title: post.title,
  description: post.metaDescription,
  images: ["/og-image.svg"],
},
```
To:
```ts
openGraph: {
  type: "article",
  url: `/blog/${post.slug}`,
  siteName: "Scribtly",
  title: post.title,
  description: post.metaDescription,
  publishedTime: post.publishedAt.toISOString(),
},
twitter: {
  card: "summary_large_image",
  title: post.title,
  description: post.metaDescription,
},
```

- [ ] **Step 2: Commit**

```bash
git add "app/(marketing)/blog/[slug]/page.tsx"
git commit -m "fix: remove SVG OG image from blog post dynamic metadata"
```

---

## Task 6: Fix BreadcrumbList — use absolute URLs

Schema.org requires absolute URLs in the `item` field of BreadcrumbList. Fix in 5 pages.

**Files:**
- Modify: `app/(marketing)/youtube-scripts/page.tsx`
- Modify: `app/(marketing)/tiktok-scripts/page.tsx`
- Modify: `app/(marketing)/instagram-reels-scripts/page.tsx`
- Modify: `app/(marketing)/for-freelancers/page.tsx`
- Modify: `app/(marketing)/for-agencies/page.tsx`

In each file, add `const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";` at the top and update the breadcrumb:

`youtube-scripts/page.tsx` change:
```ts
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "YouTube Scripts", item: "/youtube-scripts" },
  ],
};
```
To:
```ts
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "YouTube Scripts", item: `${SITE_URL}/youtube-scripts` },
  ],
};
```

Apply the same pattern for the other 4 pages with their respective slugs:
- tiktok-scripts: item `${SITE_URL}/tiktok-scripts`, name "TikTok Scripts"
- instagram-reels-scripts: item `${SITE_URL}/instagram-reels-scripts`, name "Instagram Reels Scripts"
- for-freelancers: item `${SITE_URL}/for-freelancers`, name "For Freelancers"
- for-agencies: item `${SITE_URL}/for-agencies`, name "For Agencies"

- [ ] **Step 1: Fix youtube-scripts/page.tsx breadcrumb**
- [ ] **Step 2: Fix tiktok-scripts/page.tsx breadcrumb**
- [ ] **Step 3: Fix instagram-reels-scripts/page.tsx breadcrumb**
- [ ] **Step 4: Fix for-freelancers/page.tsx breadcrumb**
- [ ] **Step 5: Fix for-agencies/page.tsx breadcrumb**
- [ ] **Step 6: Commit**

```bash
git add "app/(marketing)/youtube-scripts/page.tsx" \
  "app/(marketing)/tiktok-scripts/page.tsx" \
  "app/(marketing)/instagram-reels-scripts/page.tsx" \
  "app/(marketing)/for-freelancers/page.tsx" \
  "app/(marketing)/for-agencies/page.tsx"
git commit -m "fix: use absolute URLs in BreadcrumbList structured data"
```

---

## Task 7: Fix SoftwareApplication currency (USD → GBP)

**Files:**
- Modify: `app/(marketing)/page.tsx`
- Modify: `app/(marketing)/ai-script-writer/page.tsx`

- [ ] **Step 1: Fix homepage SoftwareApplication**

In `app/(marketing)/page.tsx`, change:
```ts
offers: {
  "@type": "Offer",
  price: "0",
  priceCurrency: "USD",
  description: "Free plan with 5 scripts included",
},
```
To:
```ts
offers: {
  "@type": "Offer",
  price: "0",
  priceCurrency: "GBP",
  description: "Free plan with 5 scripts included",
},
```

- [ ] **Step 2: Fix ai-script-writer SoftwareApplication**

In `app/(marketing)/ai-script-writer/page.tsx`, change:
```ts
offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
```
To:
```ts
offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
```

- [ ] **Step 3: Commit**

```bash
git add "app/(marketing)/page.tsx" "app/(marketing)/ai-script-writer/page.tsx"
git commit -m "fix: correct SoftwareApplication priceCurrency from USD to GBP"
```

---

## Task 8: Fix sitemap blog changeFrequency

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Update blog post changeFrequency**

Change:
```ts
const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
  url: `${BASE_URL}/blog/${post.slug}`,
  lastModified: post.updatedAt,
  changeFrequency: "never",
  priority: 0.6,
}));
```
To:
```ts
const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
  url: `${BASE_URL}/blog/${post.slug}`,
  lastModified: post.updatedAt,
  changeFrequency: "weekly",
  priority: 0.6,
}));
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "fix: change blog sitemap changeFrequency from never to weekly"
```

---

## Self-Review

### Spec coverage
- ✅ SVG OG image → fixed via opengraph-image.tsx (Tasks 1, 3, 4, 5)
- ✅ Apple touch icon → fixed via apple-icon.tsx (Task 2)
- ✅ BreadcrumbList absolute URLs → fixed in 5 pages (Task 6)
- ✅ priceCurrency → fixed in 2 pages (Task 7)
- ✅ sitemap changeFrequency → fixed (Task 8)
- ✅ theme-color → added to root layout (Task 3)

### Key insight
When Next.js App Router sees `app/opengraph-image.tsx`, it serves a PNG at the route's OG image URL. Page-level metadata with explicit `images: [...]` OVERRIDES this file. Tasks 3, 4, and 5 remove those overrides so the root PNG applies to all pages.
