import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { SignupTracking } from "./SignupTracking";

interface Props {
  searchParams: { ref?: string };
}

export default function SignupPage({ searchParams }: Props) {
  const ref = searchParams.ref;

  return (
    <div className="flex flex-col items-center">
      {ref && <SignupTracking refLeadId={ref} />}
      <SignUp routing="path" path="/signup" signInUrl="/login" />
      <p className="mt-4 text-center text-xs text-text-secondary dark:text-dark-muted max-w-sm">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}
