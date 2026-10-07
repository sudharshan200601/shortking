import type { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../config/env.js";
import { getRedisClient } from "../cache/redis.js";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const inMemoryStore = new Map<string, RateLimitRecord>();

// Periodic cleanup of expired rate limit entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of inMemoryStore.entries()) {
    if (now > record.resetAt) {
      inMemoryStore.delete(key);
    }
  }
}, 30000).unref();

export function createRateLimiter(options?: {
  windowMs?: number;
  maxRequests?: number;
  keyPrefix?: string;
}) {
  const windowMs = options?.windowMs ?? env.RATE_LIMIT_WINDOW_MS;
  const maxRequests = options?.maxRequests ?? env.RATE_LIMIT_MAX_REQUESTS;
  const prefix = options?.keyPrefix ?? "rl";

  return async function rateLimit(req: FastifyRequest, reply: FastifyReply) {
    const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const identifier = req.user?.id ? `user:${req.user.id}` : `ip:${ip}`;
    const key = `${prefix}:${identifier}`;

    const redis = getRedisClient();

    if (redis && redis.status === "ready") {
      try {
        const current = await redis.incr(key);
        if (current === 1) {
          await redis.pexpire(key, windowMs);
        }

        const ttl = await redis.pttl(key);
        reply.header("X-RateLimit-Limit", maxRequests);
        reply.header("X-RateLimit-Remaining", Math.max(0, maxRequests - current));
        reply.header("X-RateLimit-Reset", Math.ceil((Date.now() + Math.max(0, ttl)) / 1000));

        if (current > maxRequests) {
          return reply.status(429).send({
            success: false,
            error: {
              code: "RATE_LIMIT_EXCEEDED",
              message: "Too many requests. Please try again later.",
            },
          });
        }
        return;
      } catch {
        // Fall back silently to in-memory store if Redis encounters an error
      }
    }

    // In-memory sliding window rate limiting
    const now = Date.now();
    let record = inMemoryStore.get(key);

    if (!record || now > record.resetAt) {
      record = {
        count: 1,
        resetAt: now + windowMs,
      };
      inMemoryStore.set(key, record);
    } else {
      record.count += 1;
    }

    const remaining = Math.max(0, maxRequests - record.count);
    reply.header("X-RateLimit-Limit", maxRequests);
    reply.header("X-RateLimit-Remaining", remaining);
    reply.header("X-RateLimit-Reset", Math.ceil(record.resetAt / 1000));

    if (record.count > maxRequests) {
      return reply.status(429).send({
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
        },
      });
    }
  };
}
