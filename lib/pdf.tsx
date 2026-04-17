import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Script, Client, Workspace } from "@prisma/client";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, color: "#2C2C2A" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: "#2C2C2A33" },
  wordmark: { fontSize: 14, fontWeight: 700, color: "#7F77DD" },
  wsName: { fontSize: 9, color: "#5F5E5A" },
  meta: { flexDirection: "row", gap: 10, marginBottom: 16, fontSize: 9, color: "#5F5E5A" },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  sectionHeader: { fontSize: 10, fontWeight: 700, backgroundColor: "#7F77DD", color: "#FFFFFF", paddingVertical: 3, paddingHorizontal: 6, marginTop: 14, marginBottom: 6, alignSelf: "flex-start", borderRadius: 3 },
  paragraph: { marginBottom: 6, lineHeight: 1.55 },
  tag: { fontSize: 9, fontStyle: "italic", color: "#7F77DD" },
  footer: { position: "absolute", bottom: 28, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#5F5E5A", paddingTop: 6, borderTopWidth: 0.5, borderTopColor: "#2C2C2A33" },
});

const SECTION_RE = /^\[([A-Z][A-Z0-9 :.\-]*)\]\s*$/;
const INLINE_TAG_RE = /(\[(?:B-ROLL|ACTION|TEXT|CUT|MUSIC|PAUSE)(?::[^\]]*)?\])/g;

function renderInline(line: string) {
  const parts = line.split(INLINE_TAG_RE);
  return parts.map((p, i) => {
    INLINE_TAG_RE.lastIndex = 0;
    if (INLINE_TAG_RE.test(p)) {
      INLINE_TAG_RE.lastIndex = 0;
      return (
        <Text key={i} style={styles.tag}>
          {p}
        </Text>
      );
    }
    return <Text key={i}>{p}</Text>;
  });
}

export function ScriptPdfDocument({
  script,
  client,
  workspace,
}: {
  script: Script;
  client: Client | null;
  workspace: Workspace;
}) {
  const lines = script.content.split("\n");
  const dateStr = new Date(script.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const platformLabel = script.platform[0] + script.platform.slice(1).toLowerCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow} fixed>
          <Text style={styles.wordmark}>ScriptFast</Text>
          <Text style={styles.wsName}>{workspace.name}</Text>
        </View>

        <Text style={styles.title}>{script.title}</Text>
        <View style={styles.meta}>
          <Text>{client?.name || "Unassigned"}</Text>
          <Text>·</Text>
          <Text>{platformLabel}</Text>
          <Text>·</Text>
          <Text>{script.duration}</Text>
          <Text>·</Text>
          <Text>{dateStr}</Text>
          <Text>·</Text>
          <Text>{script.wordCount ?? 0} words</Text>
        </View>

        <View>
          {lines.map((line, i) => {
            const m = line.match(SECTION_RE);
            if (m) {
              return (
                <Text key={i} style={styles.sectionHeader}>
                  {m[1]}
                </Text>
              );
            }
            if (line.trim() === "") return <View key={i} style={{ height: 6 }} />;
            return (
              <Text key={i} style={styles.paragraph}>
                {renderInline(line)}
              </Text>
            );
          })}
        </View>

        <View style={styles.footer} fixed>
          <Text>ScriptFast · {client?.name || "Unassigned"}</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
