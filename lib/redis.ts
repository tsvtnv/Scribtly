import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

function createRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL environment variable is not set");
  const client = new Redis(url, { maxRetriesPerRequest: 0 });
  client.on("error", (err) => console.error("[redis]", err));
  return client;
}

// Reuse connection across hot-reloads in dev
const redis: Redis = globalThis._redis ?? createRedisClient();
if (process.env.NODE_ENV !== "production") globalThis._redis = redis;

export default redis;
