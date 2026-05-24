import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const buf = await readFile(join(process.cwd(), "public/brand/favicon-icon.png"));
  const src = `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={src}
          style={{
            width: "170%",
            height: "170%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
