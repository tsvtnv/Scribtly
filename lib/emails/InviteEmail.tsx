import { Html, Head, Body, Container, Heading, Text, Button } from "@react-email/components";

export function InviteEmailTemplate({
  inviterName,
  workspaceName,
  acceptUrl,
}: {
  inviterName: string;
  workspaceName: string;
  acceptUrl: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#F1EFE8", margin: 0, padding: "24px 0" }}>
        <Container style={{ background: "#FFFFFF", borderRadius: 12, padding: 32, maxWidth: 520, margin: "0 auto" }}>
          <Heading style={{ fontSize: 22, margin: "0 0 12px" }}>
            {inviterName} invited you to {workspaceName}
          </Heading>
          <Text style={{ color: "#5F5E5A", lineHeight: 1.6 }}>
            Join the workspace on ScriptFast to collaborate on client scripts.
          </Text>
          <Button
            href={acceptUrl}
            style={{ background: "#7F77DD", color: "#FFFFFF", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 500, display: "inline-block", marginTop: 16 }}
          >
            Accept invite
          </Button>
          <Text style={{ color: "#5F5E5A", fontSize: 12, marginTop: 24 }}>
            This invite expires in 7 days.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
