import { Html, Head, Body, Container, Heading, Text, Button } from "@react-email/components";

export function FreeLimitReachedEmail({ appUrl }: { appUrl: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#F1EFE8", margin: 0, padding: "24px 0" }}>
        <Container style={{ background: "#FFFFFF", borderRadius: 12, padding: 32, maxWidth: 520, margin: "0 auto" }}>
          <Heading style={{ fontSize: 22, margin: "0 0 12px" }}>You've used all 3 free scripts</Heading>
          <Text style={{ color: "#5F5E5A", lineHeight: 1.6 }}>
            Upgrade to Pro for £29/month and get unlimited scripts for all your clients, every platform, and PDF export.
          </Text>
          <Button
            href={`${appUrl}/settings/billing`}
            style={{ background: "#7F77DD", color: "#FFFFFF", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 500, display: "inline-block", marginTop: 16 }}
          >
            Upgrade to Pro
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
