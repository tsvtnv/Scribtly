const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const WORKER_SECRET = process.env.WORKER_SECRET ?? "";
const INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

async function tick() {
  console.log(`[worker] tick at ${new Date().toISOString()}`);
  try {
    const res = await fetch(`${APP_URL}/api/worker/tick`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WORKER_SECRET}` },
    });
    const data = await res.json();
    console.log(`[worker] done:`, JSON.stringify(data));
  } catch (err) {
    console.error(`[worker] error:`, err);
  }
}

tick();
setInterval(tick, INTERVAL_MS);
