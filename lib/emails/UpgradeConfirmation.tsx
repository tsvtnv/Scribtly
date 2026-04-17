import { Html, Head, Body, Container, Heading, Text, Button } from "@react-email/components";
import type { Plan } from "@prisma/client";

export function UpgradeConfirmationEmail({ plan, appUrl }: { plan: Plan; appUrl: string }) {
  const label = plan === "AGENCY" ? "Agency" : "Pro";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#F1EFE8", margin: 0, padding: "24px 0" }}>
        <Container style={{ background: "#FFFFFF", borderRadius: 12, padding: 32, maxWidth: 520, margin: "0 auto" }}>
          <Heading style={{ fontSize: 22, margin: "0 0 12px" }}>You're now on ScriptFast {label}</Heading>
          <Text style={{ color: "#5F5E5A", lineHeight: 1.6 }}>
            Your {label} plan is active. Unlimited scripts, every platform, and PDF export are now yours.
          </Text>
          <Button
            href={`${appUrl}/generate`}
            style={{ background: "#7F77DD", color: "#FFFFFF", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 500, display: "inline-block", marginTop: 16 }}
          >
            Start generating
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
