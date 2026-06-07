import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

function getRedisClient(): Redis {
  if (!globalThis._redis) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL environment variable is not set");
    const client = new Redis(url, { maxRetriesPerRequest: 0 });
    client.on("error", (err) => console.error("[redis]", err));
    globalThis._redis = client;
  }
  return globalThis._redis;
}

// Lazy proxy — client is only created on first method call, not at import time
const redis = new Proxy({} as Redis, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_target, prop) { return (getRedisClient() as any)[prop]; },
});

export default redis;
