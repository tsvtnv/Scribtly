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
