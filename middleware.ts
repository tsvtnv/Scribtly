import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/pricing",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/login(.*)",
  "/signup(.*)",
  "/api/stripe/webhook",
  "/api/webhooks/clerk",
  "/invite/(.*)",
  "/review/(.*)",
  "/api/review/(.*)",
  "/unsubscribed",
  "/api/user/unsubscribe",
  "/admin(.*)",
  "/api/admin/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
