# Dashboard Audit & Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the scripts pagination bug, verify all dashboard pages render correctly, and write comprehensive unit tests for all dashboard business logic.

**Architecture:** The dashboard is a Next.js App Router app with server components fetching data via Prisma and passing it to client components. Business logic lives in `lib/` (planLimits, onboarding utilities). Tests run in Vitest with a node environment — server component rendering is not testable here, so we test all extractable logic directly plus use Playwright browser tools to visually verify the pages.

**Tech Stack:** Next.js 14 App Router, Prisma, Vitest (node env), TypeScript, Playwright (MCP browser tools for UI audit)

---

## Pages in scope

| Route | File |
|-------|------|
| `/dashboard` | `app/(app)/dashboard/page.tsx` |
| `/generate` | `app/(app)/generate/page.tsx` |
| `/scripts` | `app/(app)/scripts/page.tsx` |
| `/pipeline` | `app/(app)/pipeline/page.tsx` |
| `/clients` | `app/(app)/clients/page.tsx` |
| `/settings` | `app/(app)/settings/page.tsx` |
| `/settings/billing` | `app/(app)/settings/billing/page.tsx` |
| `/settings/cron` | `app/(app)/settings/cron/page.tsx` |
| `/settings/team` | `app/(app)/settings/team/page.tsx` |

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `app/(app)/scripts/page.tsx:52` | Fix pagination (take→skip+take) |
| Create | `lib/scriptsPageHelpers.ts` | Extract `makeHref` URL builder |
| Create | `tests/scriptsPageHelpers.test.ts` | Test makeHref logic |
| Create | `tests/onboarding.test.ts` | Test shouldRedirectToOnboarding + getTopicSuggestion |
| Modify | `tests/planLimits.test.ts` | Add tests for untested planLimits functions |

---

### Task 1: Fix scripts pagination bug

**Files:**
- Modify: `app/(app)/scripts/page.tsx:52`

The current code uses `take: limit * page` which loads ALL rows up to page N (exponential growth). It should use `skip + take` for proper offset pagination.

- [ ] **Step 1: Fix the query**

In `app/(app)/scripts/page.tsx`, change line 52 from:
```typescript
      take: limit * page,
```
To:
```typescript
      skip: (page - 1) * limit,
      take: limit,
```

The full updated query block (lines 45–54) should look like:
```typescript
    prisma.script.findMany({
      where,
      include: {
        client: true,
        contentItem: { select: { id: true, stage: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: no errors related to the changed lines

- [ ] **Step 3: Commit**

```bash
git add app/(app)/scripts/page.tsx
git commit -m "fix: use skip/take offset pagination on scripts page"
```

---

### Task 2: Extract makeHref into a testable utility

**Files:**
- Create: `lib/scriptsPageHelpers.ts`
- Modify: `app/(app)/scripts/page.tsx`

The `makeHref` function inside `ScriptsPage` builds filter URLs. It's pure logic and should be extracted to be testable.

- [ ] **Step 1: Create `lib/scriptsPageHelpers.ts`**

```typescript
interface ScriptsSearch {
  q?: string;
  clientId?: string;
  platform?: string;
  status?: string;
  page?: string;
}

export function makeHref(current: ScriptsSearch, patch: Partial<ScriptsSearch>): string {
  const params = new URLSearchParams();
  const merged = { ...current, ...patch } as Record<string, string | undefined>;
  Object.entries(merged).forEach(([k, v]) => {
    if (v && v !== "all") params.set(k, v);
  });
  const qs = params.toString();
  return qs ? `/scripts?${qs}` : "/scripts";
}
```

- [ ] **Step 2: Update `app/(app)/scripts/page.tsx` to use the extracted function**

Add the import at the top of the file (after existing imports):
```typescript
import { makeHref as buildHref } from "@/lib/scriptsPageHelpers";
```

Remove the inline `makeHref` function (lines ~57–66):
```typescript
  const makeHref = (patch: Partial<Search>) => {
    const params = new URLSearchParams();
    const merged = { ...searchParams, ...patch } as Record<string, string | undefined>;
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
    });
    const qs = params.toString();
    return qs ? `/scripts?${qs}` : "/scripts";
  };
```

Replace all calls to `makeHref(...)` in the JSX with `buildHref(searchParams, ...)`:
- `makeHref({ platform: undefined })` → `buildHref(searchParams, { platform: undefined })`
- `makeHref({ platform: p })` → `buildHref(searchParams, { platform: p })`
- `makeHref({ status: undefined })` → `buildHref(searchParams, { status: undefined })`
- `makeHref({ status: s })` → `buildHref(searchParams, { status: s })`
- `makeHref({ clientId: undefined })` → `buildHref(searchParams, { clientId: undefined })`
- `makeHref({ clientId: c.id })` → `buildHref(searchParams, { clientId: c.id })`
- `makeHref({ page: String(page + 1) })` → `buildHref(searchParams, { page: String(page + 1) })`

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: no errors

- [ ] **Step 4: Write failing tests for makeHref**

Create `tests/scriptsPageHelpers.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { makeHref } from "@/lib/scriptsPageHelpers";

describe("makeHref", () => {
  it("returns /scripts when no params", () => {
    expect(makeHref({}, {})).toBe("/scripts");
  });

  it("preserves existing search params", () => {
    const href = makeHref({ q: "fitness" }, {});
    expect(href).toBe("/scripts?q=fitness");
  });

  it("adds a new filter param", () => {
    const href = makeHref({}, { platform: "YOUTUBE" });
    expect(href).toBe("/scripts?platform=YOUTUBE");
  });

  it("merges patch over current params", () => {
    const href = makeHref({ platform: "YOUTUBE", q: "health" }, { platform: "TIKTOK" });
    expect(href).toContain("platform=TIKTOK");
    expect(href).toContain("q=health");
    expect(href).not.toContain("YOUTUBE");
  });

  it("removes param when patch value is undefined", () => {
    const href = makeHref({ platform: "YOUTUBE", q: "health" }, { platform: undefined });
    expect(href).not.toContain("platform");
    expect(href).toContain("q=health");
  });

  it("removes param when patch value is 'all'", () => {
    const href = makeHref({ status: "DRAFT" }, { status: "all" });
    expect(href).not.toContain("status");
  });

  it("sets page param for pagination", () => {
    const href = makeHref({ q: "tips" }, { page: "2" });
    expect(href).toBe("/scripts?q=tips&page=2");
  });

  it("handles all filter params together", () => {
    const href = makeHref(
      { q: "fitness", clientId: "abc123", platform: "YOUTUBE", status: "DRAFT", page: "1" },
      { page: "2" }
    );
    expect(href).toContain("q=fitness");
    expect(href).toContain("clientId=abc123");
    expect(href).toContain("platform=YOUTUBE");
    expect(href).toContain("status=DRAFT");
    expect(href).toContain("page=2");
    expect(href).not.toContain("page=1");
  });

  it("returns /scripts when all params are undefined", () => {
    const href = makeHref(
      { platform: "YOUTUBE" },
      { platform: undefined }
    );
    expect(href).toBe("/scripts");
  });
});
```

- [ ] **Step 5: Run tests to confirm they fail**

Run: `npx vitest run tests/scriptsPageHelpers.test.ts`
Expected: FAIL — module not found or import errors (tests written before full extraction)

- [ ] **Step 6: Run tests to confirm they pass**

Run: `npx vitest run tests/scriptsPageHelpers.test.ts`
Expected: all 9 tests PASS

- [ ] **Step 7: Commit**

```bash
git add lib/scriptsPageHelpers.ts tests/scriptsPageHelpers.test.ts app/(app)/scripts/page.tsx
git commit -m "refactor: extract makeHref to lib and add tests"
```

---

### Task 3: Tests for onboarding utilities

**Files:**
- Create: `tests/onboarding.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/onboarding.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { shouldRedirectToOnboarding } from "@/lib/onboarding/shouldRedirectToOnboarding";
import { getTopicSuggestion } from "@/lib/onboarding/topicSuggestion";

describe("shouldRedirectToOnboarding", () => {
  it("returns true when onboarding is not completed", () => {
    expect(shouldRedirectToOnboarding(false)).toBe(true);
  });

  it("returns false when onboarding is completed", () => {
    expect(shouldRedirectToOnboarding(true)).toBe(false);
  });
});

describe("getTopicSuggestion", () => {
  it("returns known suggestion for fitness niche", () => {
    expect(getTopicSuggestion("fitness")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("returns known suggestion for travel niche", () => {
    expect(getTopicSuggestion("travel")).toBe(
      "How I planned a 2-week Europe trip for under £1000"
    );
  });

  it("returns known suggestion for food niche", () => {
    expect(getTopicSuggestion("food")).toBe(
      "3 mistakes beginners make when cooking pasta"
    );
  });

  it("returns known suggestion for saas niche", () => {
    expect(getTopicSuggestion("saas")).toBe(
      "The feature we almost didn't build that 3x our retention"
    );
  });

  it("returns known suggestion for tech niche", () => {
    expect(getTopicSuggestion("tech")).toBe(
      "The feature we almost didn't build that 3x our retention"
    );
  });

  it("returns fallback for unknown niche", () => {
    expect(getTopicSuggestion("pottery")).toBe(
      "3 common mistakes beginners make in pottery"
    );
  });

  it("trims whitespace from niche before lookup", () => {
    expect(getTopicSuggestion("  fitness  ")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("normalises niche to lowercase for lookup", () => {
    expect(getTopicSuggestion("FITNESS")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("uses lowercase niche in fallback message", () => {
    expect(getTopicSuggestion("Photography")).toBe(
      "3 common mistakes beginners make in photography"
    );
  });
});
```

- [ ] **Step 2: Run tests to confirm they pass**

Run: `npx vitest run tests/onboarding.test.ts`
Expected: 11 tests PASS

- [ ] **Step 3: Commit**

```bash
git add tests/onboarding.test.ts
git commit -m "test: add onboarding utility tests"
```

---

### Task 4: Extend planLimits tests to cover untested functions

**Files:**
- Modify: `tests/planLimits.test.ts`

The existing tests cover `canGenerateScript`, `canUsePlatform`, `canUseExtras`, `canExportPDF`, `canAddClient`, `canInviteMembers`, `canBulkGenerate`, `getMaxMembers`, and `getRemainingScripts`. The following functions are untested: `canAccessPipeline`, `canAccessCalendar`, `isNearScriptLimit`, `hasReachedScriptLimit`, `getScriptLimit`, `getClientLimit`, `canUseAllModels`, `getAvailableModels`, `allowedPlatforms`, `getPlanConfig`.

- [ ] **Step 1: Add import line to existing test file**

In `tests/planLimits.test.ts`, extend the import to include all missing functions:
```typescript
import {
  canGenerateScript,
  canUsePlatform,
  canUseExtras,
  canExportPDF,
  canAddClient,
  canInviteMembers,
  canBulkGenerate,
  getMaxMembers,
  getRemainingScripts,
  canAccessPipeline,
  canAccessCalendar,
  isNearScriptLimit,
  hasReachedScriptLimit,
  getScriptLimit,
  getClientLimit,
  canUseAllModels,
  getAvailableModels,
  allowedPlatforms,
  getPlanConfig,
} from "@/lib/planLimits";
```

- [ ] **Step 2: Append the new describe blocks to `tests/planLimits.test.ts`**

Append after the last `});` in the file:

```typescript
describe("canAccessPipeline", () => {
  it("FREE and BASIC cannot access pipeline", () => {
    expect(canAccessPipeline("FREE")).toBe(false);
    expect(canAccessPipeline("BASIC")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can access pipeline", () => {
    expect(canAccessPipeline("PRO")).toBe(true);
    expect(canAccessPipeline("AGENCY")).toBe(true);
    expect(canAccessPipeline("ENTERPRISE")).toBe(true);
  });
});

describe("canAccessCalendar", () => {
  it("FREE and BASIC cannot access calendar", () => {
    expect(canAccessCalendar("FREE")).toBe(false);
    expect(canAccessCalendar("BASIC")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can access calendar", () => {
    expect(canAccessCalendar("PRO")).toBe(true);
    expect(canAccessCalendar("AGENCY")).toBe(true);
    expect(canAccessCalendar("ENTERPRISE")).toBe(true);
  });
});

describe("isNearScriptLimit", () => {
  it("returns false when well below 80%", () => {
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 3 })).toBe(false);
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 50 })).toBe(false);
  });

  it("returns true at exactly 80% of limit", () => {
    // FREE limit is 5; 80% = 4
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 4 })).toBe(true);
    // PRO limit is 100; 80% = 80
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 80 })).toBe(true);
  });

  it("returns true when over 80%", () => {
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 5 })).toBe(true);
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 99 })).toBe(true);
  });
});

describe("hasReachedScriptLimit", () => {
  it("returns false when below limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 4 })).toBe(false);
    expect(hasReachedScriptLimit({ plan: "PRO", scriptCount: 99 })).toBe(false);
  });

  it("returns true at exact limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 5 })).toBe(true);
    expect(hasReachedScriptLimit({ plan: "PRO", scriptCount: 100 })).toBe(true);
    expect(hasReachedScriptLimit({ plan: "AGENCY", scriptCount: 350 })).toBe(true);
  });

  it("returns true when over limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 10 })).toBe(true);
  });
});

describe("getScriptLimit", () => {
  it("returns correct limits per plan", () => {
    expect(getScriptLimit("FREE")).toBe(5);
    expect(getScriptLimit("BASIC")).toBe(25);
    expect(getScriptLimit("PRO")).toBe(100);
    expect(getScriptLimit("AGENCY")).toBe(350);
    expect(getScriptLimit("ENTERPRISE")).toBe(999999);
  });
});

describe("getClientLimit", () => {
  it("returns correct client limits per plan", () => {
    expect(getClientLimit("FREE")).toBe(1);
    expect(getClientLimit("BASIC")).toBe(3);
    expect(getClientLimit("PRO")).toBe(10);
    expect(getClientLimit("AGENCY")).toBe(-1);
    expect(getClientLimit("ENTERPRISE")).toBe(-1);
  });
});

describe("canUseAllModels", () => {
  it("FREE cannot use all models (only STANDARD)", () => {
    expect(canUseAllModels("FREE")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can use all models", () => {
    expect(canUseAllModels("PRO")).toBe(true);
    expect(canUseAllModels("AGENCY")).toBe(true);
    expect(canUseAllModels("ENTERPRISE")).toBe(true);
  });

  it("BASIC can use all models", () => {
    expect(canUseAllModels("BASIC")).toBe(true);
  });
});

describe("getAvailableModels", () => {
  it("FREE gets only STANDARD model", () => {
    expect(getAvailableModels("FREE")).toEqual(["STANDARD"]);
  });

  it("PRO gets all 3 models", () => {
    expect(getAvailableModels("PRO")).toEqual(["STANDARD", "QUALITY", "PREMIUM"]);
  });
});

describe("allowedPlatforms", () => {
  it("all plans allow all 5 platforms", () => {
    const expected = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"];
    expect(allowedPlatforms("FREE")).toEqual(expected);
    expect(allowedPlatforms("PRO")).toEqual(expected);
    expect(allowedPlatforms("AGENCY")).toEqual(expected);
  });
});

describe("getPlanConfig", () => {
  it("returns full config object for FREE plan", () => {
    const config = getPlanConfig("FREE");
    expect(config.label).toBe("Free");
    expect(config.price_gbp).toBe(0);
    expect(config.scripts_per_month).toBe(5);
    expect(config.pipeline).toBe(false);
  });

  it("returns full config object for AGENCY plan", () => {
    const config = getPlanConfig("AGENCY");
    expect(config.label).toBe("Agency");
    expect(config.bulk_generation).toBe(true);
    expect(config.priority_support).toBe(true);
    expect(config.client_limit).toBe(-1);
  });
});
```

- [ ] **Step 3: Run all tests to confirm they pass**

Run: `npx vitest run tests/planLimits.test.ts`
Expected: all tests PASS (both existing and new)

- [ ] **Step 4: Commit**

```bash
git add tests/planLimits.test.ts
git commit -m "test: extend planLimits coverage to all exported functions"
```

---

### Task 5: Run full test suite and verify no regressions

**Files:** none changed

- [ ] **Step 1: Run full test suite**

Run: `npx vitest run`
Expected: all tests PASS with 0 failures. Output should list:
- `tests/planLimits.test.ts` — all tests pass
- `tests/onboarding.test.ts` — all tests pass
- `tests/scriptsPageHelpers.test.ts` — all tests pass
- All previously passing tests still pass

- [ ] **Step 2: Commit if no prior commit covered this**

```bash
git status
```
Expected: nothing to commit (all already committed in prior tasks)

---

### Task 6: UI audit — start dev server and visit all dashboard pages

**Prerequisite:** The dev server must be running. Start it with:
```bash
npx next dev
```
Then use the Playwright MCP tools (`mcp__playwright__browser_navigate`, `mcp__playwright__browser_snapshot`, `mcp__playwright__browser_take_screenshot`) to visit each page and verify the UI.

- [ ] **Step 1: Navigate to `/dashboard` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/dashboard`.
Then `mcp__playwright__browser_snapshot` to inspect the accessibility tree.

Expected elements present:
- Greeting with user name
- 3 stat cards (Scripts this period, Clients, Scripts remaining)
- "Generate a new script" CTA card
- Recent scripts section (or empty state)
- Clients section (or empty state)

- [ ] **Step 2: Navigate to `/generate` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/generate`.

Expected elements present:
- Script generation form with topic input
- Client selector
- Generate button
- Usage counter/warning if applicable

- [ ] **Step 3: Navigate to `/scripts` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/scripts`.

Expected elements present:
- "Script library" heading
- Platform filter chips (All platforms, YouTube, TikTok, Reels, LinkedIn, Podcast)
- Status filter chips (Any status, DRAFT, FINAL, SENT)
- Client filter chips (if clients exist)
- Search input
- Script cards or empty state
- Verify filter chips are clickable (click one and confirm URL updates)

- [ ] **Step 4: Navigate to `/pipeline` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/pipeline`.

Expected: either Kanban board (PRO/AGENCY/ENTERPRISE plan) or upgrade prompt (FREE/BASIC plan). No blank page or error.

- [ ] **Step 5: Navigate to `/clients` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/clients`.

Expected: client grid or empty state with "Add your first client" CTA. "Add client" button enabled/disabled based on plan limits.

- [ ] **Step 6: Navigate to `/settings` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/settings`.

Expected:
- Profile section (name, email — read-only)
- Workspace section with plan badge
- Workspace name form (if owner)
- Links to billing (owner only) and team (AGENCY owner only)
- Delete account section

- [ ] **Step 7: Navigate to `/settings/billing` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/settings/billing`.

Expected: Billing page with current plan info, upgrade options, or Stripe portal link. Should redirect to `/settings` if not the workspace owner.

- [ ] **Step 8: Navigate to `/settings/cron` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/settings/cron`.

Expected: Cron schedule list (PRO+) or upgrade prompt (FREE/BASIC).

- [ ] **Step 9: Navigate to `/settings/team` and verify**

Use `mcp__playwright__browser_navigate` with URL `http://localhost:3000/settings/team`.

Expected: Team member list + invite form (AGENCY owner) or redirect to `/settings` for other roles/plans.

- [ ] **Step 10: Fix any issues found during audit**

For each visual/functional issue found during steps 1–9: create a targeted fix (edit the relevant component file), then re-navigate to verify the fix.

- [ ] **Step 11: Commit any fixes**

```bash
git add -p
git commit -m "fix: dashboard page audit fixes"
```

---

## Self-review

**Spec coverage check:**

| Requirement | Covered by |
|-------------|------------|
| All dashboard pages work | Task 6 (Playwright audit) |
| UI is correct for all pages | Task 6 (visual verification) |
| All functions must work | Task 6 + fixes in Task 6 Step 10 |
| Tests for the whole dashboard | Tasks 2, 3, 4 (unit tests for all business logic) |
| Fix scripts pagination bug | Task 1 |

**Placeholder scan:** No TBDs or TODOs — all test values are specific and derived from `config/plans.config.json` and `lib/onboarding/topicSuggestion.ts`.

**Type consistency:** `ScriptsSearch` in `lib/scriptsPageHelpers.ts` mirrors the `Search` interface in `app/(app)/scripts/page.tsx`. The `Plan` type comes from `@prisma/client` in both the lib file and tests.
