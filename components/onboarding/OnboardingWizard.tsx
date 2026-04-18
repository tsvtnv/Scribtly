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
