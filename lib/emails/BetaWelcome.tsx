import {
  Html, Body, Container, Heading, Text, Link, Hr, Preview
} from "@react-email/components";

interface BetaWelcomeEmailProps {
  name?: string;
  betaExpiresAt: string; // formatted date string e.g. "18 Jul 2026"
  appUrl: string;
}

export function BetaWelcomeEmail({ name, betaExpiresAt, appUrl }: BetaWelcomeEmailProps) {
  return (
    <Html>
      <Preview>You're in — your beta access is live</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", padding: "40px 0" }}>
        <Container style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "40px", maxWidth: "520px", margin: "0 auto" }}>
          <Heading style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
            You're in, {name || "friend"} 🎉
          </Heading>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            Your free beta access to Scribtly is now active.
          </Text>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            <strong>What you get:</strong><br />
            • Full BASIC plan access (25 scripts/month, 3 clients, all AI models)<br />
            • Free until {betaExpiresAt}<br />
            • No credit card required
          </Text>
          <Text style={{ color: "#374151", lineHeight: "1.6" }}>
            In return, we'd love your honest feedback as you use the platform.
            You can reply to this email anytime.
          </Text>
          <Link
            href={`${appUrl}/dashboard`}
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
            Get started →
          </Link>
          <Hr style={{ margin: "32px 0", borderColor: "#e5e7eb" }} />
          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            Kristiyan · Scribtly
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default BetaWelcomeEmail;
