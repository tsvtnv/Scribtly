# Hero Section & Pricing Redesign

**Date:** 2026-05-24  
**Status:** Approved

---

## Problem

The hero section feels visually flat, the right-side panel (progress bars) is generic and unconvincing, and the layout doesn't give the headline enough breathing room. The pricing page uses green and gold accents on plan cards that clash with the brand's primary purple palette and create visual noise.

---

## Goals

1. Increase visual energy and depth in the hero section
2. Replace the generic panel with a compelling product preview flow
3. Rethink the layout to feel more premium
4. Make pricing cards cohesive with the brand color scheme (primary purple only)

---

## Hero Section Redesign

### Layout

Switch from a split (left copy / right panel) layout to a **centered headline + wide panel below** approach.

- Headline, subtext, and CTAs are center-aligned
- A wide frosted-glass panel sits below the CTAs, spanning `max-w-4xl`
- Orbs repositioned: one top-left, one bottom-right relative to the panel for framing

### Headline

- Keep copy: "Write video scripts 10x faster, in your client's exact voice"
- Increase size: `text-5xl md:text-6xl` (up from `text-4xl md:text-[3.5rem]`)
- Tighten `leading` slightly for more punch
- Animated underline on "in your client's exact voice" stays

### Subtext & CTAs

- Subtext centered, `max-w-lg` for tighter column feel
- CTAs centered in a `flex justify-center` row
- Primary button keeps shimmer + shadow
- Trust badges stay, also centered below CTAs

### Hero Panel — 3-Step Flow

A single wide card (`max-w-4xl mx-auto`) divided into 3 columns with subtle dividers:

**Step 1 — Brand Voice**
- Label: "1. Brand voice"
- Client name field: "Acme Studios"
- Three tone pills: "Professional", "Warm", "Direct" (one highlighted in primary)
- Short sample sentence in a muted text block: "We make premium product videos that convert."

**Step 2 — Platform**
- Label: "2. Platform"
- Row of platform icons: YouTube, TikTok, Reels, LinkedIn, Podcast
- One platform icon selected/highlighted with primary tint background + border
- Small label under each icon

**Step 3 — Script Output**
- Label: "3. Your script"
- Labelled sections: Hook, Story, CTA — each with 1–2 lines of realistic placeholder script text
- Small "On voice" badge in top-right corner (green tint, same as existing)
- Subtle animated underline or blinking cursor on the last line to suggest live generation

**Panel styling:**
- `bg-[var(--color-surface)]/90 backdrop-blur`
- `border-hair border-[var(--color-border)]`
- `shadow-[0_28px_90px_rgba(0,0,0,0.18)]`
- Step dividers: `border-r-hair border-[var(--color-border)]`
- Arrows or chevron icons (`→`) between steps in the divider

---

## Pricing Cards Redesign

### Approach: Monochrome + One Accent (Pro only)

Remove all green (`text-success`, `bg-[#d9f0df]`) and gold (`text-warning`, `bg-[#fff0cf]`) accents from plan cards. Use neutral surfaces for Free, Basic, and Agency. Reserve the primary purple for Pro only.

### Plan Card Styles

| Plan | Border | Background | Badge |
|------|--------|------------|-------|
| Free | `border-[var(--color-border)]` | `bg-[var(--color-surface)]` | None |
| Basic | `border-[var(--color-border)]` | `bg-[var(--color-surface)]` | None |
| Pro | `border-primary` (2px) | `bg-[var(--color-primary-tint)]` | "Most Popular" in primary purple |
| Agency | `border-[var(--color-border)]` | `bg-[var(--color-surface)]` | None |

### Feature Row Icons

- Replace any green checkmarks with `text-primary` checkmarks across all plans
- Remove gold/green icon colors from feature rows

### Billing Toggle

- Active state uses `bg-primary` / `text-white` instead of any green/gold accent

### "Most Popular" Badge

- Background: `bg-primary`, text: `text-white`
- Positioned at top of Pro card (absolute, centered)

---

## Color Constraints

Only these colors are used in the redesigned sections:

- `--color-primary` (`#7F77DD`) — primary accent, Pro card, badges, icons
- `--color-primary-tint` (`#EEEDFE`) — Pro card background, tinted highlights
- `--color-surface` — card backgrounds
- `--color-border` — borders, dividers
- `text-text-secondary` / `dark:text-dark-muted` — muted labels
- Green "On voice" badge in hero panel only (existing, kept for realism)

---

## Out of Scope

- Copy changes (headlines, feature descriptions)
- Pricing amounts or plan structure
- Sections below the hero (ticker, problem section, etc.)
- FAQ or enterprise section styling
