import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

interface LimiterConfig {
  keyPrefix: string;
  points: number;
  duration: number;
}

// Plain config objects — no Redis connection at import time
export const signinLimiter: LimiterConfig = { keyPrefix: "rl:signin", points: 10, duration: 60 * 15 };
export const signupLimiter: LimiterConfig = { keyPrefix: "rl:signup", points: 5, duration: 60 * 60 };
export const forgotPasswordLimiter: LimiterConfig = { keyPrefix: "rl:forgot", points: 5, duration: 60 * 15 };

// Lazily-created instances — only constructed on the first real request
const limiterCache = new Map<string, RateLimiterRedis>();

function getLimiter(config: LimiterConfig): RateLimiterRedis {
  if (!limiterCache.has(config.keyPrefix)) {
    limiterCache.set(config.keyPrefix, new RateLimiterRedis({
      storeClient: redis,
      keyPrefix: config.keyPrefix,
      points: config.points,
      duration: config.duration,
    }));
  }
  return limiterCache.get(config.keyPrefix)!;
// Limiters are created lazily so importing this module doesn't trigger a Redis
// connection at build time (REDIS_URL is only available at runtime).
let _signinLimiter: RateLimiterRedis | undefined;
let _signupLimiter: RateLimiterRedis | undefined;
let _forgotPasswordLimiter: RateLimiterRedis | undefined;

export function signinLimiter(): RateLimiterRedis {
  return (_signinLimiter ??= new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:signin",
    points: 10,
    duration: 60 * 15,
  }));
}

export function signupLimiter(): RateLimiterRedis {
  return (_signupLimiter ??= new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:signup",
    points: 5,
    duration: 60 * 60,
  }));
}

export function forgotPasswordLimiter(): RateLimiterRedis {
  return (_forgotPasswordLimiter ??= new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:forgot",
    points: 5,
    duration: 60 * 15,
  }));
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function checkRateLimit(
  config: LimiterConfig,
  req: NextRequest
): Promise<NextResponse | null> {
  const limiter = getLimiter(config);
  const ip = getIp(req);
  try {
    await limiter.consume(ip);
    return null;
  } catch (err) {
    if (err instanceof RateLimiterRes) {
      const retryAfter = Math.ceil(err.msBeforeNext / 1000);
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        }
      );
    }
    // Redis down — fail open rather than blocking all logins
    console.error("[rateLimit] Redis error, failing open:", err);
    return null;
  }
}
