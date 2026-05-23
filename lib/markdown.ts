export function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let inList = false;

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { output.push("<ul>"); inList = true; }
      output.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line === "") {
      if (inList) { output.push("</ul>"); inList = false; }
    } else {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(`<p>${inline(line)}</p>`);
    }
  }

  if (inList) output.push("</ul>");
  return output.join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
