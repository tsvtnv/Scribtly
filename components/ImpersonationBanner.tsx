import { cookies } from "next/headers";
import { ImpersonationBannerClient } from "./ImpersonationBannerClient";

export function ImpersonationBanner() {
  const isImpersonating = !!cookies().get("admin_impersonating")?.value;
  if (!isImpersonating) return null;
  return <ImpersonationBannerClient />;
}
