# Autoblog System — Design Spec

**Date:** 2026-05-23  
**Project:** ScriptFast  
**Goal:** Daily auto-generated SEO blog posts via Claude, published publicly at `/blog`

---

## Overview

A fully automated blog pipeline: a Superpowers scheduled agent triggers a protected API endpoint daily, Claude picks a unique SEO topic and generates a full post in one call, the post is saved to PostgreSQL and immediately published. Two public Next.js pages serve the content with full SEO metadata.

---

## 1. Data Model

New `BlogPost` model added to `prisma/schema.prisma`:

```prisma
model BlogPost {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  metaDescription  String
  excerpt          String
  content          String   @db.Text
  tags             String[]
  readingMins      Int
  published        Boolean  @default(true)
  publishedAt      DateTime @default(now())
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([published, publishedAt])
  @@index([slug])
}
```

- `slug` — URL-safe, Claude-generated (e.g. `how-to-write-a-youtube-hook`), unique
- `excerpt` — 2–3 sentence summary used on listing cards and as OG description
- `content` — full markdown body stored as plain text, rendered on post page
- `tags` — keyword strings for on-page SEO
- `readingMins` — estimated by Claude at generation time
- `published` — defaults `true` (auto-publish); retained for manual unpublish

No relation to `Workspace` or `User` — blog posts are global.

---

## 2. API Endpoint

**Route:** `POST /api/blog/generate`  
**File:** `app/api/blog/generate/route.ts`

### Auth

Bearer token check: `Authorization: Bearer <BLOG_GENERATE_SECRET>`.  
Returns 401 if missing or incorrect. No Clerk auth — this is called by the scheduler, not a browser.

### Generation Flow

1. Query DB for last 20 `BlogPost` titles (to avoid topic duplication)
2. Send one Claude API call with:
   - **Model:** `claude-haiku-4-5-20251001` (fast, cheap for daily runs)
   - **max_tokens:** 2000
   - **System prompt:** ScriptFast context (AI script tool for freelancers/agencies), target audience, brand voice (direct, no fluff), SEO goal (rank for script writing + content creator keywords)
   - **User prompt:** Existing titles list + instruction to pick a unique long-tail keyword angle and return a JSON object with all fields
3. Parse JSON response:

```json
{
  "slug": "how-to-write-a-youtube-hook",
  "title": "How to Write a YouTube Hook That Stops the Scroll",
  "metaDescription": "150–160 char meta description...",
  "excerpt": "2–3 sentence summary for listing cards...",
  "tags": ["youtube hooks", "video script writing", "freelance content"],
  "readingMins": 5,
  "content": "## Introduction\n\n..."
}
```

4. Validate all required fields present
5. Check slug uniqueness — if collision, append `-2` (or `-3`, etc.)
6. `prisma.blogPost.create(...)` — published immediately

### Error Handling

| Scenario | Behaviour |
|---|---|
| Invalid auth | 401, no DB write |
| Claude JSON parse failure | 500, log error, no DB write |
| Slug collision | Auto-suffix, not an error |
| Prisma write failure | 500, log error |

### Response

```json
{ "success": true, "slug": "...", "title": "..." }
```

---

## 3. Public Pages

### `/blog` — Listing Page
**File:** `app/(marketing)/blog/page.tsx`

- Fetches all published posts ordered by `publishedAt DESC`
- Paginated: 12 per page via `?page=` query param
- Each card: title, excerpt, first 2 tags, reading time, formatted date
- Static metadata: `title: "Blog — ScriptFast"`, keyword-targeted description
- Added to `sitemap.ts` as a static entry (`priority: 0.7`)

### `/blog/[slug]` — Post Page
**File:** `app/(marketing)/blog/[slug]/page.tsx`

- `generateStaticParams()` pre-renders all published posts at build time
- `generateMetadata()` per post: title, metaDescription, canonical, OG tags
- Content rendered: markdown → HTML via inline regex replacer (no new deps)
- JSON-LD: `BlogPosting` schema — `headline`, `datePublished`, `author: "ScriptFast"`, `description`
- Bottom CTA: "Generate your own scripts →" linking to `/signup`

### Sitemap
`app/sitemap.ts` dynamically queries all published posts, appends `/blog/[slug]` entries:
- `lastModified: post.updatedAt`
- `changeFrequency: "never"` (posts don't change after publish)
- `priority: 0.6`

---

## 4. Superpowers Schedule

- **Frequency:** Daily at 06:00 UTC
- **Agent action:** `POST ${APP_URL}/api/blog/generate` with `Authorization: Bearer ${BLOG_GENERATE_SECRET}`
- **Reports:** title of generated post, or error message if failed

### Environment Variables

| Variable | Description |
|---|---|
| `BLOG_GENERATE_SECRET` | Random 32-char string, shared between Vercel env and schedule agent prompt |
| `NEXT_PUBLIC_APP_URL` | Already exists — used to construct the endpoint URL |

---

## 5. Files Changed / Created

| File | Action |
|---|---|
| `prisma/schema.prisma` | Add `BlogPost` model |
| `app/api/blog/generate/route.ts` | New — generation endpoint |
| `app/(marketing)/blog/page.tsx` | New — listing page |
| `app/(marketing)/blog/[slug]/page.tsx` | New — post page |
| `app/sitemap.ts` | Update — add dynamic blog entries |
| `components/layout/MarketingFooter.tsx` | Update — add Blog link |
| `components/layout/MarketingNav.tsx` | Update — add Blog link |

---

## 6. Out of Scope

- Admin UI for managing posts
- Draft/review workflow
- Comment system
- Post editing after publish
- Category/tag filter pages (future)
