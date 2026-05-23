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

interface ResetPasswordProps {
  resetUrl: string;
  name?: string;
}

export default function ResetPassword({ resetUrl, name }: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Scribtly password</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "40px auto", backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
          <Heading style={{ fontSize: 22, marginBottom: 8 }}>Reset your password</Heading>
          <Text>Hi {name || "there"},</Text>
          <Text>We received a request to reset your Scribtly password. Click the button below to choose a new one.</Text>
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Reset password
            </Button>
          </Section>
          <Text style={{ color: "#666", fontSize: 13 }}>
            This link expires in 1 hour. If you didn&apos;t request a password reset, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
