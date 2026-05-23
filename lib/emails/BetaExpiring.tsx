import {
  Html, Body, Container, Heading, Text, Link, Hr, Preview
} from "@react-email/components";

interface BetaExpiringEmailProps {
  name?: string;
  betaExpiresAt: string; // formatted date string e.g. "18 Jul 2026"
  appUrl: string;
}

export function BetaExpiringEmail({ name, betaExpiresAt, appUrl }: BetaExpiringEmailProps) {
  return (
    <Html>
      <Preview>Your Scribtly beta access expires in 7 days</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", padding: "40px 0" }}>
        <Container style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "40px", maxWidth: "520px", margin: "0 auto" }}>
          <Heading style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
            Your beta access expires soon
          </Heading>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            Hi {name || "there"},
          </Text>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            Just a heads up — your free beta access expires on <strong>{betaExpiresAt}</strong>.
          </Text>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            After that, your account will move to the Free plan (5 scripts/month).
            To keep full access, subscribe to the BASIC plan for £5/month.
          </Text>
          <Link
            href={`${appUrl}/settings/billing`}
            style={{
              display: "inline-block",
              backgroundColor: "#6d28d9",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              marginTop: "8px",
            }}
          >
            Keep my access →
          </Link>
          <Hr style={{ margin: "32px 0", borderColor: "#e5e7eb" }} />
          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            Thanks for being a beta tester — your feedback has been invaluable.
          </Text>
          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            Kristiyan · Scribtly
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default BetaExpiringEmail;
