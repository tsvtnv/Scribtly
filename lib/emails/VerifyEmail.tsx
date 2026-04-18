import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verificationUrl: string;
  name?: string;
}

export default function VerifyEmail({ verificationUrl, name }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Scribtly email address</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "40px auto", backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
          <Heading style={{ fontSize: 22, marginBottom: 8 }}>Verify your email</Heading>
          <Text>Hi {name || "there"},</Text>
          <Text>Click the button below to verify your email address and get started with Scribtly.</Text>
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Verify email
            </Button>
          </Section>
          <Text style={{ color: "#666", fontSize: 13 }}>
            This link expires in 24 hours. If you didn&apos;t create a Scribtly account, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
