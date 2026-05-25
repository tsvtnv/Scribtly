import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error("ADMIN_SECRET environment variable is not set");
  return s;
}

async function hmac(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(sig).toString("hex");
}

export async function signAdminToken(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(ts);
  return `${ts}.${sig}`;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  if (Date.now() - parseInt(ts, 10) > COOKIE_MAX_AGE * 1000) return false;
  const expected = await hmac(ts);
  const expectedBuf = Buffer.from(expected, "hex");
  const sigBuf = Buffer.from(sig, "hex");
  if (expectedBuf.length !== sigBuf.length) return false;
  return timingSafeEqual(expectedBuf, sigBuf);
}

export async function requireAdmin() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) redirect("/admin/login");
  const valid = await verifyAdminToken(token);
  if (!valid) redirect("/admin/login");
}

export { COOKIE, COOKIE_MAX_AGE };
