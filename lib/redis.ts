import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

<<<<<<< claude/admiring-gauss-xzK3t
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
=======
function createRedisClient(): Redis {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL environment variable is not set");
  const client = new Redis(url, { maxRetriesPerRequest: 0 });
  client.on("error", (err) => console.error("[redis]", err));
  return client;
}

// Reuse connection across hot-reloads in dev; only connect when first used
function getInstance(): Redis {
  if (!globalThis._redis) {
    globalThis._redis = createRedisClient();
  }
  return globalThis._redis;
}

// Lazy proxy — importing this module does not open a Redis connection at build time
const redis = new Proxy({} as Redis, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getInstance(), prop);
  },
>>>>>>> main
});

export default redis;
