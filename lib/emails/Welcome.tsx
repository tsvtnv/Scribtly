import { Html, Head, Body, Container, Heading, Text, Button, Link } from "@react-email/components";

export function WelcomeEmail({ name, appUrl }: { name?: string; appUrl: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#F1EFE8", margin: 0, padding: "24px 0" }}>
        <Container style={{ background: "#FFFFFF", borderRadius: 12, padding: 32, maxWidth: 520, margin: "0 auto" }}>
          <Heading style={{ fontSize: 22, margin: "0 0 12px" }}>Welcome to ScriptFast{name ? `, ${name}` : ""}.</Heading>
          <Text style={{ color: "#5F5E5A", lineHeight: 1.6 }}>
            You have 3 free scripts to try. Add your first client profile and you'll be generating scripts in their voice in under two minutes.
          </Text>
          <Button
            href={`${appUrl}/clients/new`}
            style={{ background: "#7F77DD", color: "#FFFFFF", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 500, display: "inline-block", marginTop: 16 }}
          >
            Add your first client
          </Button>
          <Text style={{ color: "#5F5E5A", fontSize: 12, marginTop: 32 }}>
            Questions? Just reply to this email. — <Link href={appUrl}>ScriptFast</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
