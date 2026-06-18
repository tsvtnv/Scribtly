const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const WORKER_SECRET = process.env.WORKER_SECRET ?? "";

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
    process.exit(1);
  }
}

tick().then(() => process.exit(0));
