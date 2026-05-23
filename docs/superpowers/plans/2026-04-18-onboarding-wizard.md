# Onboarding Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-step onboarding wizard at `/onboarding` that walks new signups through naming their workspace, adding their first client, and generating their first script before landing on `/dashboard`.

**Architecture:** A dedicated `(onboarding)` Next.js route group with its own sidebar-free layout wraps a single server page that auth-guards and redirects already-onboarded users. All wizard state lives in a single `OnboardingWizard` client component that calls the three existing API routes. The `(app)` layout gets a one-line redirect guard so existing-user flows never reach `/onboarding` by accident.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Clerk (auth), Prisma (read workspace), canvas-confetti (success step), Vitest (unit tests)

---

## File Map

**Create:**
- `app/(onboarding)/layout.tsx`
- `app/(onboarding)/onboarding/page.tsx`
- `components/onboarding/OnboardingWizard.tsx`
- `components/onboarding/ProgressIndicator.tsx`
- `components/onboarding/StepWorkspace.tsx`
- `components/onboarding/StepClient.tsx`
- `components/onboarding/StepGenerate.tsx`
- `components/onboarding/StepSuccess.tsx`
- `lib/onboarding/topicSuggestion.ts`
- `lib/onboarding/shouldRedirectToOnboarding.ts`

**Modify:**
- `middleware.ts` — add `/onboarding` to public routes
- `app/(app)/layout.tsx` — add redirect guard
- `.env.local` — change `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` to `/onboarding`

**Install:**
- `canvas-confetti` + `@types/canvas-confetti`

---

### Task 1: Install canvas-confetti

- [ ] **Step 1: Install**
```bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no canvas-confetti errors

- [ ] **Step 3: Commit**
```bash
git add package.json package-lock.json
git commit -m "chore: install canvas-confetti"
```

---

### Task 2: niche→topic suggestion helper (TDD)

**Files:** `lib/onboarding/topicSuggestion.ts`

- [ ] **Step 1: Create the helper**

Create `lib/onboarding/topicSuggestion.ts`:
```typescript
const NICHE_SUGGESTIONS: Record<string, string> = {
  fitness: "5 reasons most people quit the gym after 2 weeks",
  travel: "How I planned a 2-week Europe trip for under £1000",
  saas: "The feature we almost didn't build that 3x our retention",
  tech: "The feature we almost didn't build that 3x our retention",
  food: "3 mistakes beginners make when cooking pasta",
};

export function getTopicSuggestion(niche: string): string {
  const key = niche.trim().toLowerCase();
  return NICHE_SUGGESTIONS[key] ?? `3 common mistakes beginners make in ${key}`;
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add lib/onboarding/topicSuggestion.ts
git commit -m "feat: add niche-to-topic suggestion helper"
```

---

### Task 3: Redirect guard helper

**Files:** `lib/onboarding/shouldRedirectToOnboarding.ts`

- [ ] **Step 1: Create**

```typescript
export function shouldRedirectToOnboarding(onboardingCompleted: boolean): boolean {
  return !onboardingCompleted;
}
```

- [ ] **Step 2: Commit**
```bash
git add lib/onboarding/shouldRedirectToOnboarding.ts
git commit -m "feat: add onboarding redirect guard helper"
```

---

### Task 4: Update middleware

**Files:** `middleware.ts`

- [ ] **Step 1: Add `/onboarding` to public routes**

In `middleware.ts`, add `"/onboarding"` to the `createRouteMatcher` array (after the existing entries).

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add middleware.ts
git commit -m "feat: add /onboarding to public middleware routes"
```

---

### Task 5: App layout redirect guard

**Files:** `app/(app)/layout.tsx`

- [ ] **Step 1: Add redirect guard**

Add to `app/(app)/layout.tsx`:
```tsx
import { redirect } from "next/navigation";
import { shouldRedirectToOnboarding } from "@/lib/onboarding/shouldRedirectToOnboarding";
// ... existing imports

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, workspace, role } = await ensureUser();

  if (shouldRedirectToOnboarding(workspace.onboardingCompleted)) {
    redirect("/onboarding");
  }

  // ... rest unchanged
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add "app/(app)/layout.tsx"
git commit -m "feat: redirect new users to /onboarding from app layout"
```

---

### Task 6: Update .env.local

- [ ] **Step 1: Change sign-up redirect**

In `.env.local` change:
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```
Leave `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard` unchanged.

- [ ] **Step 2: Commit**
```bash
git add .env.local
git commit -m "config: redirect new signups to /onboarding"
```

---

### Task 7: Onboarding layout

**Files:** `app/(onboarding)/layout.tsx`

- [ ] **Step 1: Create**

```tsx
import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="flex items-center justify-center py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-text-primary">
          Scribtly
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add "app/(onboarding)/layout.tsx"
git commit -m "feat: add sidebar-free onboarding layout"
```

---

### Task 8: ProgressIndicator component

**Files:** `components/onboarding/ProgressIndicator.tsx`

- [ ] **Step 1: Create**

```tsx
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

function StepDot({ index, currentStep }: { index: number; currentStep: number }) {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;
  return (
    <div
      className={cn(
        "w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300",
        isCompleted && "bg-[#1D9E75] border-[#1D9E75]",
        isActive && "bg-primary border-primary",
        !isCompleted && !isActive && "bg-transparent border-[#B4B2A9]"
      )}
      style={{ borderWidth: "1.5px" }}
    >
      {isCompleted && (
        <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
          <path d="M1 3l1.5 1.5L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function Connector({ fromStep, currentStep }: { fromStep: number; currentStep: number }) {
  return (
    <div className={cn("flex-1 h-px transition-colors duration-300", fromStep < currentStep ? "bg-primary" : "bg-[#B4B2A9]")} />
  );
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center w-full max-w-xs mx-auto mb-10">
      <StepDot index={1} currentStep={currentStep} />
      <Connector fromStep={1} currentStep={currentStep} />
      <StepDot index={2} currentStep={currentStep} />
      <Connector fromStep={2} currentStep={currentStep} />
      <StepDot index={3} currentStep={currentStep} />
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/onboarding/ProgressIndicator.tsx
git commit -m "feat: add ProgressIndicator component"
```

---

### Task 9: StepWorkspace

**Files:** `components/onboarding/StepWorkspace.tsx`

- [ ] **Step 1: Create**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface StepWorkspaceProps {
  initialName: string;
  onNext: (workspaceName: string) => void;
}

export function StepWorkspace({ initialName, onNext }: StepWorkspaceProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setError("Workspace name is required."); return; }
    setError(null);
    setLoading(true);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 1 }),
      });
      onNext(trimmed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Welcome to Scribtly</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">Let's get you set up in 3 steps.</p>
      </div>
      <div className="space-y-1">
        <label htmlFor="workspace-name" className="text-sm font-medium text-text-primary">Workspace name</label>
        <input
          id="workspace-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. My Agency"
          autoFocus
          maxLength={80}
          className="w-full h-10 px-3 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <p className="text-xs text-text-secondary dark:text-dark-muted">You can change this later in settings.</p>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
      <Button type="submit" size="lg" fullWidth loading={loading}>Continue</Button>
    </form>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/StepWorkspace.tsx
git commit -m "feat: add StepWorkspace component"
```

---

### Task 10: StepClient

**Files:** `components/onboarding/StepClient.tsx`

- [ ] **Step 1: Create**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PLATFORMS = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"] as const;
type Platform = typeof PLATFORMS[number];
const PLATFORM_LABELS: Record<Platform, string> = { YOUTUBE: "YouTube", TIKTOK: "TikTok", REELS: "Reels", LINKEDIN: "LinkedIn", PODCAST: "Podcast" };
const TONES = ["Conversational", "Educational", "Motivational", "Authoritative", "Entertaining"] as const;

interface StepClientProps {
  onNext: (clientId: string, niche: string, platform: string) => void;
  onSkip: () => void;
}

export function StepClient({ onNext, onSkip }: StepClientProps) {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<string>("Conversational");
  const [platform, setPlatform] = useState<Platform>("YOUTUBE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedNiche = niche.trim();
    if (!trimmedName) { setError("Client name is required."); return; }
    if (!trimmedNiche) { setError("Niche is required."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          niche: trimmedNiche,
          targetAudience: targetAudience.trim() || trimmedNiche,
          toneOfVoice: tone,
          primaryPlatform: platform,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as Record<string,string>)?.error ?? "Failed to create client.");
        return;
      }
      const data = await res.json();
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 2, firstClientAddedAt: new Date().toISOString() }),
      });
      onNext(data.client.id as string, trimmedNiche, platform);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSkip() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingStep: 2 }),
    });
    onSkip();
  }

  const inputCls = "w-full h-10 px-3 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Add your first client</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">Scribtly writes every script in your client's exact voice.</p>
      </div>
      <div className="space-y-1">
        <label htmlFor="client-name" className="text-sm font-medium text-text-primary">Client name</label>
        <input id="client-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah's Fitness" autoFocus maxLength={120} className={inputCls} />
      </div>
      <div className="space-y-1">
        <label htmlFor="niche" className="text-sm font-medium text-text-primary">Niche</label>
        <input id="niche" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. Fitness, Travel, SaaS" maxLength={200} className={inputCls} />
      </div>
      <div className="space-y-1">
        <label htmlFor="target-audience" className="text-sm font-medium text-text-primary">
          Target audience <span className="text-text-secondary dark:text-dark-muted font-normal">(optional)</span>
        </label>
        <input id="target-audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g. Busy professionals aged 25-40" maxLength={600} className={inputCls} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Tone of voice</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button key={t} type="button" onClick={() => setTone(t)}
              className={cn("px-3 py-1.5 rounded-full text-sm border transition-colors",
                tone === t ? "bg-primary text-white border-primary" : "border-[var(--color-border)] text-text-primary hover:border-primary hover:text-primary"
              )}>{t}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Primary platform</p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button key={p} type="button" onClick={() => setPlatform(p)}
              className={cn("px-3 py-1.5 rounded-full text-sm border transition-colors",
                platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)] text-text-primary hover:border-primary hover:text-primary"
              )}>{PLATFORM_LABELS[p]}</button>
          ))}
        </div>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button type="submit" size="lg" fullWidth loading={loading}>Add client</Button>
      <button type="button" onClick={handleSkip} className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors">
        Skip for now
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/StepClient.tsx
git commit -m "feat: add StepClient component"
```

---

### Task 11: StepGenerate

**Files:** `components/onboarding/StepGenerate.tsx`

- [ ] **Step 1: Create**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getTopicSuggestion } from "@/lib/onboarding/topicSuggestion";

interface StepGenerateProps {
  clientId: string | null;
  clientNiche: string;
  clientPlatform: string;
  onSuccess: (scriptText: string) => void;
  onSkip: () => void;
}

export function StepGenerate({ clientId, clientNiche, clientPlatform, onSuccess, onSkip }: StepGenerateProps) {
  const [topic, setTopic] = useState(getTopicSuggestion(clientNiche));
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) { setError("Topic is required."); return; }
    if (!clientId) { onSkip(); return; }
    setError(null);
    setStreaming(true);
    setStreamedText("");
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, platform: clientPlatform, topic: trimmedTopic, duration: "3-5 minutes" }),
      });
      if (!res.ok || !res.body) {
        setError("Script generation failed. Please try again.");
        setStreaming(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamedText(full);
      }
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 3, firstScriptGeneratedAt: new Date().toISOString() }),
      });
      onSuccess(full);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Generate your first script</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">See exactly what Scribtly can do.</p>
      </div>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="topic" className="text-sm font-medium text-text-primary">What is the video about?</label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 3 mistakes beginners make at the gym"
            maxLength={300}
            rows={3}
            autoFocus
            className="w-full px-3 py-2 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          {error && <p className="text-xs text-danger">{error}</p>}
        </div>
        <Button type="submit" size="lg" fullWidth loading={streaming}>
          {streaming ? "Generating..." : "Generate my first script"}
        </Button>
      </form>
      {streamedText && (
        <Card className="text-sm whitespace-pre-wrap overflow-y-auto" style={{ maxHeight: "400px", lineHeight: "1.7" }}>
          {streamedText}
        </Card>
      )}
      {!streaming && (
        <button type="button" onClick={onSkip} className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors">
          Skip for now
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/StepGenerate.tsx
git commit -m "feat: add StepGenerate component with streaming"
```

---

### Task 12: StepSuccess

**Files:** `components/onboarding/StepSuccess.tsx`

- [ ] **Step 1: Create**

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface StepSuccessProps {
  scriptText: string;
}

export function StepSuccess({ scriptText }: StepSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, []);

  async function markComplete() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingCompleted: true, onboardingStep: 3 }),
    });
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Your first script is ready</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          That took less than 60 seconds. Imagine doing that for every client, every week.
        </p>
      </div>
      <Card className="text-sm whitespace-pre-wrap overflow-y-auto" style={{ maxHeight: "400px", lineHeight: "1.7" }}>
        {scriptText}
      </Card>
      <div className="space-y-3">
        <Button size="lg" fullWidth onClick={async () => { await markComplete(); router.push("/dashboard"); }}>
          Go to my dashboard
        </Button>
        <Button size="lg" fullWidth variant="outline" onClick={async () => { await markComplete(); router.push("/scripts"); }}>
          View script library
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/StepSuccess.tsx
git commit -m "feat: add StepSuccess component with confetti"
```

---

### Task 13: OnboardingWizard orchestrator

**Files:** `components/onboarding/OnboardingWizard.tsx`

- [ ] **Step 1: Create**

```tsx
"use client";

import { useState } from "react";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { StepWorkspace } from "@/components/onboarding/StepWorkspace";
import { StepClient } from "@/components/onboarding/StepClient";
import { StepGenerate } from "@/components/onboarding/StepGenerate";
import { StepSuccess } from "@/components/onboarding/StepSuccess";

interface OnboardingWizardProps {
  initialStep: number;
  workspaceName: string;
  userName: string | null;
}

export function OnboardingWizard({ initialStep, workspaceName, userName }: OnboardingWizardProps) {
  const defaultName = userName ? `${userName.split(" ")[0]}'s Workspace` : workspaceName;
  const [step, setStep] = useState<number>(Math.min(Math.max(initialStep || 1, 1), 3));
  const [createdClientId, setCreatedClientId] = useState<string | null>(null);
  const [clientNiche, setClientNiche] = useState<string>("");
  const [clientPlatform, setClientPlatform] = useState<string>("YOUTUBE");
  const [scriptText, setScriptText] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSkipToEnd() {
    await fetch("/api/user/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboardingCompleted: true }),
    });
    window.location.href = "/dashboard";
  }

  if (showSuccess) {
    return (
      <div className="w-full max-w-lg">
        <StepSuccess scriptText={scriptText} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <ProgressIndicator currentStep={step} />
      <div key={step} style={{ animation: "onboardingFadeSlide 0.25s ease forwards" }}>
        {step === 1 && (
          <StepWorkspace initialName={defaultName} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <StepClient
            onNext={(clientId, niche, platform) => {
              setCreatedClientId(clientId);
              setClientNiche(niche);
              setClientPlatform(platform);
              setStep(3);
            }}
            onSkip={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepGenerate
            clientId={createdClientId}
            clientNiche={clientNiche}
            clientPlatform={clientPlatform}
            onSuccess={(text) => { setScriptText(text); setShowSuccess(true); }}
            onSkip={handleSkipToEnd}
          />
        )}
      </div>
      <style>{`
        @keyframes onboardingFadeSlide {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/OnboardingWizard.tsx
git commit -m "feat: add OnboardingWizard orchestrator"
```

---

### Task 14: Onboarding page (server)

**Files:** `app/(onboarding)/onboarding/page.tsx`

- [ ] **Step 1: Create**

```tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ensureUser } from "@/lib/ensureUser";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const { userId } = auth();
  if (!userId) redirect("/login");

  const { user, workspace } = await ensureUser();

  if (workspace.onboardingCompleted) redirect("/dashboard");

  return (
    <OnboardingWizard
      initialStep={workspace.onboardingStep}
      workspaceName={workspace.name}
      userName={user.name ?? null}
    />
  );
}
```

- [ ] **Step 2: Verify**
```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**
```bash
git add "app/(onboarding)/onboarding/page.tsx"
git commit -m "feat: add onboarding server page with auth guard"
```

---

### Task 15: Smoke test

- [ ] Start dev server: `npm run dev`
- [ ] Visit `/onboarding` while logged out → should redirect to `/login`
- [ ] Visit `/onboarding` while logged in (new user) → shows wizard step 1
- [ ] Complete step 1 → advances to step 2
- [ ] Complete step 2 → advances to step 3
- [ ] Complete step 3 → confetti fires, success screen shows, Go to dashboard works
- [ ] Visit `/dashboard` as user with `onboardingCompleted=false` → redirects to `/onboarding`
- [ ] Visit `/dashboard` as returning user (onboardingCompleted=true) → loads normally

- [ ] **Final commit**
```bash
git add .
git commit -m "feat: complete onboarding wizard"
```
