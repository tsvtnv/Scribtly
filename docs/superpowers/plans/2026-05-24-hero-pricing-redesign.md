# Hero & Pricing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage hero to a centered layout with a wide 3-step product preview panel, and fix pricing card colors to use the brand's primary purple throughout.

**Architecture:** Two files are touched — `app/(marketing)/page.tsx` for the hero and `app/(marketing)/pricing/page.tsx` for pricing. No new components are needed; all changes are inline JSX and Tailwind classes.

**Tech Stack:** Next.js 14, Tailwind CSS, Lucide React, CSS custom properties via `var(--color-*)`.

---

### Task 1: Center the hero copy layout

**Files:**
- Modify: `app/(marketing)/page.tsx:175-222`

- [ ] **Step 1: Replace the split-grid container with a centered single-column container**

In `app/(marketing)/page.tsx`, find this line (≈175):
```tsx
<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
```
Replace with:
```tsx
<div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:py-24">
```

- [ ] **Step 2: Remove the wrapping `<div>` that surrounded only the left column**

The opening `<div>` on line ≈176 (the one right after the container, with no className) was there to be the left grid cell. Remove it and its matching closing `</div>` at line ≈222. The badge, h1, p, CTAs, and trust badges should now sit directly inside the container div.

- [ ] **Step 3: Center the subtext paragraph**

Find (≈190):
```tsx
<p className="animate-fade-up-2 mt-6 max-w-xl text-base text-text-secondary md:text-lg dark:text-dark-muted">
```
Replace with:
```tsx
<p className="animate-fade-up-2 mt-6 max-w-lg mx-auto text-base text-text-secondary md:text-lg dark:text-dark-muted">
```

- [ ] **Step 4: Center the CTA button row**

Find (≈195):
```tsx
<div className="animate-fade-up-3 mt-8 flex flex-wrap items-center gap-3">
```
Replace with:
```tsx
<div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-3">
```

- [ ] **Step 5: Center the trust badges row**

Find (≈211):
```tsx
<div className="animate-fade-up-3 mt-7 grid max-w-sm grid-cols-3 gap-2 text-xs text-text-secondary dark:text-dark-muted">
```
Replace with:
```tsx
<div className="animate-fade-up-3 mt-7 grid max-w-sm mx-auto grid-cols-3 gap-2 text-xs text-text-secondary dark:text-dark-muted">
```

- [ ] **Step 6: Delete the old hero panel block**

Delete the entire `{/* hero panel */}` block (≈224–270):
```tsx
{/* hero panel */}
<div className="animate-float-panel relative hidden md:block">
  ...
</div>
```
Delete everything from that comment to and including its closing `</div>`.

- [ ] **Step 7: Increase headline size**

Find (≈182):
```tsx
<h1 className="animate-fade-up-1 text-4xl font-semibold leading-[1.05] tracking-tight md:text-[3.5rem]">
```
Replace with:
```tsx
<h1 className="animate-fade-up-1 text-5xl font-semibold leading-[1.0] tracking-tight md:text-6xl">
```

- [ ] **Step 8: Start the dev server and visually verify**

Run: `npm run dev`

Open `http://localhost:3000`. Verify:
- Hero copy is horizontally centered
- Headline is larger and tight
- Both CTAs are centered in one row
- Trust badges are centered
- No right panel visible

- [ ] **Step 9: Commit**

```bash
git add app/(marketing)/page.tsx
git commit -m "feat: center hero layout and enlarge headline"
```

---

### Task 2: Add the wide 3-step hero panel

**Files:**
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Add the 3-step panel below the centered copy block**

After the trust badges `</div>` and before the closing `</div>` of the main container (the `max-w-4xl` div), insert:

```tsx
{/* 3-step product preview panel */}
<div className="animate-fade-up-3 relative mt-12 mx-auto">
  <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-xl pointer-events-none" />
  <div className="relative rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur shadow-[0_28px_90px_rgba(0,0,0,0.18)] overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-[var(--color-border)] md:divide-y-0 md:divide-x">

      {/* Step 1: Brand Voice */}
      <div className="p-6 text-left">
        <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-text-secondary dark:text-dark-muted">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">1</span>
          Brand voice
        </div>
        <div className="mb-3 text-sm font-semibold">Acme Studios</div>
        <div className="mb-4 flex flex-wrap gap-2">
          {(["Professional", "Warm", "Direct"] as const).map((tone, i) => (
            <span
              key={tone}
              className={`rounded-full border-hair px-2.5 py-1 text-xs ${
                i === 0
                  ? "border-primary/30 bg-[var(--color-primary-tint)] font-medium text-primary"
                  : "border-[var(--color-border)] text-text-secondary dark:text-dark-muted"
              }`}
            >
              {tone}
            </span>
          ))}
        </div>
        <p className="text-xs italic leading-relaxed text-text-secondary dark:text-dark-muted">
          "We make premium product videos that convert."
        </p>
      </div>

      {/* Step 2: Platform */}
      <div className="p-6 text-left">
        <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-text-secondary dark:text-dark-muted">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">2</span>
          Platform
        </div>
        <div className="grid grid-cols-3 gap-2">
          {([
            { label: "YouTube", selected: true },
            { label: "TikTok", selected: false },
            { label: "Reels", selected: false },
            { label: "LinkedIn", selected: false },
            { label: "Podcast", selected: false },
          ] as const).map(({ label, selected }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1 rounded-lg border-hair p-2 text-[10px] ${
                selected
                  ? "border-primary/30 bg-[var(--color-primary-tint)] font-medium text-primary"
                  : "border-[var(--color-border)] text-text-secondary dark:text-dark-muted"
              }`}
            >
              <span className="text-sm font-semibold leading-none">
                {label === "YouTube" ? "YT" : label === "TikTok" ? "TK" : label === "Reels" ? "IG" : label === "LinkedIn" ? "LI" : "🎙"}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Script output */}
      <div className="p-6 text-left">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-text-secondary dark:text-dark-muted">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">3</span>
            Your script
          </div>
          <span className="rounded-full bg-[#d9f0df] px-2 py-0.5 text-[10px] font-medium text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
            On voice
          </span>
        </div>
        <div className="space-y-3 text-xs">
          {([
            { label: "Hook", text: "Stop scrolling — this video could save your next project." },
            { label: "Story", text: "Last month, a client came to us with a brief and zero footage..." },
            { label: "CTA", text: "Check the link in bio to book a free discovery call." },
          ] as const).map(({ label, text }, i) => (
            <div key={label} className="animate-script-line" style={{ animationDelay: `${i * 200}ms` }}>
              <div className="mb-1 text-[10px] uppercase text-text-secondary dark:text-dark-muted">{label}</div>
              <p className="leading-relaxed text-text-primary dark:text-dark-text">
                {text}
                {i === 2 && (
                  <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-primary align-middle" />
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
```

- [ ] **Step 2: Reposition the floating orbs to frame the centered layout**

Find the two orb divs (≈172–173):
```tsx
<div className="absolute top-[-80px] left-[-60px] w-[420px] h-[420px] rounded-full bg-primary/10 blur-[90px] animate-orb-drift pointer-events-none" />
<div className="absolute bottom-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-[#38c172]/10 blur-[80px] animate-orb-drift-alt pointer-events-none" />
```
Replace with:
```tsx
<div className="absolute top-[-60px] left-[-80px] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] animate-orb-drift pointer-events-none" />
<div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px] animate-orb-drift-alt pointer-events-none" />
```

- [ ] **Step 3: Visually verify the panel**

Open `http://localhost:3000`. Verify:
- 3-column panel appears below the CTAs
- Step 1 shows brand voice with "Professional" pill highlighted in purple
- Step 2 shows platform grid with "YouTube" highlighted
- Step 3 shows 3 labelled script sections with a blinking cursor on CTA
- On mobile, steps stack vertically with dividers between them
- Panel has frosted glass look with shadow

- [ ] **Step 4: Commit**

```bash
git add app/(marketing)/page.tsx
git commit -m "feat: replace hero panel with 3-step product preview flow"
```

---

### Task 3: Fix pricing card accent colors

**Files:**
- Modify: `app/(marketing)/pricing/page.tsx:27-100`

- [ ] **Step 1: Fix BASIC plan accent and ring classes**

In the `PLANS` array, find the BASIC plan object (≈45–61):
```tsx
accentClass: "text-success",
ringClass: "ring-success/30",
```
Replace with:
```tsx
accentClass: "text-primary",
ringClass: "ring-primary/20",
```

- [ ] **Step 2: Fix AGENCY plan accent and ring classes**

Find the AGENCY plan object (≈83–99):
```tsx
accentClass: "text-warning",
ringClass: "ring-warning/30",
```
Replace with:
```tsx
accentClass: "text-primary",
ringClass: "ring-primary/20",
```

- [ ] **Step 3: Visually verify pricing cards**

Open `http://localhost:3000/pricing`. Verify:
- Basic price (£5) is shown in primary purple, not green
- Agency price (£49) is shown in primary purple, not gold/amber
- Pro price (£19) remains primary purple — no change

- [ ] **Step 4: Commit**

```bash
git add app/(marketing)/pricing/page.tsx
git commit -m "fix: use primary purple accent on Basic and Agency plan cards"
```

---

### Task 4: Fix pricing miscellaneous colors and Pro card always-tinted

**Files:**
- Modify: `app/(marketing)/pricing/page.tsx`

- [ ] **Step 1: Fix the "2 months free" badge color when billing is monthly**

Find (≈166–170):
```tsx
className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 transition-colors ${
  billing === "annual"
    ? "bg-white/20 text-white"
    : "bg-[#d9f0df] text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]"
}`}
```
Replace with:
```tsx
className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 transition-colors ${
  billing === "annual"
    ? "bg-white/20 text-white"
    : "bg-[var(--color-primary-tint)] text-primary dark:bg-primary/20 dark:text-primary"
}`}
```

- [ ] **Step 2: Fix trust chip icon colors**

Find (≈184):
```tsx
<RotateCcw size={11} className="text-success" /> 7-day money-back guarantee
```
Replace with:
```tsx
<RotateCcw size={11} className="text-primary" /> 7-day money-back guarantee
```

Find (≈188):
```tsx
<ShieldCheck size={11} className="text-warning" /> Cancel anytime
```
Replace with:
```tsx
<ShieldCheck size={11} className="text-primary" /> Cancel anytime
```

- [ ] **Step 3: Fix "Save £X vs monthly" text color**

Find (≈252–254):
```tsx
<p className="text-[11px] text-success mt-1">
  Save £{p.monthlyPrice * 2} vs monthly
</p>
```
Replace with:
```tsx
<p className="text-[11px] text-primary mt-1">
  Save £{p.monthlyPrice * 2} vs monthly
</p>
```

- [ ] **Step 4: Make the Pro card always have a primary tint background**

Find the card className logic (≈221–225):
```tsx
className={`flex-1 rounded-xl p-6 flex flex-col transition-all duration-200 border ${
  isActive
    ? `bg-[var(--color-surface)] border-primary ring-2 ${p.ringClass || "ring-primary/20"} scale-[1.02] shadow-[0_16px_50px_rgba(127,119,221,0.18)]`
    : "bg-[var(--color-surface)] border-[var(--color-border)] opacity-80 hover:opacity-100 hover:shadow-sm"
}`}
```
Replace with:
```tsx
className={`flex-1 rounded-xl p-6 flex flex-col transition-all duration-200 border ${
  p.popular ? "bg-[var(--color-primary-tint)]" : "bg-[var(--color-surface)]"
} ${
  isActive
    ? `border-primary ring-2 ${p.ringClass || "ring-primary/20"} scale-[1.02] shadow-[0_16px_50px_rgba(127,119,221,0.18)]`
    : p.popular
    ? "border-primary/40 hover:shadow-sm"
    : "border-[var(--color-border)] opacity-80 hover:opacity-100 hover:shadow-sm"
}`}
```

- [ ] **Step 5: Visually verify all pricing fixes**

Open `http://localhost:3000/pricing`. Verify:
- "2 months free" badge uses purple tint when on Monthly toggle
- "7-day money-back" and "Cancel anytime" icons are purple, not green/gold
- Annual billing shows "Save £X" in purple, not green
- Pro card always has a subtle purple-tinted background even when not the active/selected plan
- Pro card border is slightly purple even when inactive

- [ ] **Step 6: Commit**

```bash
git add app/(marketing)/pricing/page.tsx
git commit -m "fix: use primary purple for all pricing accents and tint Pro card"
```

---

## Verification

After all tasks complete, do a final pass:

1. Open `http://localhost:3000` — hero is centered, headline is large, 3-step panel shows below
2. Open `http://localhost:3000/pricing` — no green or gold anywhere except the "On voice" badge in the hero panel
3. Toggle billing monthly ↔ annual — "2 months free" badge stays purple in both states
4. Click each plan in the pricing slider — Pro card always has tinted background, other cards are white/surface
5. Check dark mode on both pages — all colors render correctly
