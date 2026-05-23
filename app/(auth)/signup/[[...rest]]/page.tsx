import { SignupForm } from "./SignupForm";
import { SignupTracking } from "./SignupTracking";

interface Props {
  searchParams: { ref?: string; beta?: string };
}

export default function SignupPage({ searchParams }: Props) {
  return (
    <>
      {searchParams.ref && (
        <SignupTracking refLeadId={searchParams.ref} isBeta={searchParams.beta === "true"} />
      )}
      <SignupForm />
    </>
  );
}
