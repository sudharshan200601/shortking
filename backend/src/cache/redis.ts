import { Redis } from "ioredis";
import { env } from "../config/env.js";
import type { ShortUrl } from "@shortking/shared";

let redis: Redis | null = null;
let isConnected = false;

export function getRedisClient(): Redis | null {
  if (!env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    try {
      redis = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        connectTimeout: 2000,
        lazyConnect: true,
      });

      redis.on("connect", () => {
        isConnected = true;
        console.log("Connected to Redis cache");
      });

      redis.on("error", (err) => {
        isConnected = false;
        console.warn("Redis connection warning (falling back to database):", err.message);
      });

      redis.connect().catch(() => {
        isConnected = false;
      });
    } catch {
      redis = null;
      isConnected = false;
    }
  }

  return isConnected ? redis : null;
}

const CACHE_PREFIX = "shortking:url:";
const DEFAULT_TTL_SECONDS = 3600; // 1 hour

/**
 * Retrieves a cached URL record by short code or alias
 */
export async function getCachedUrl(codeOrAlias: string): Promise<ShortUrl | null> {
  const client = getRedisClient();
  if (!client) return null;

  try {
    const raw = await client.get(`${CACHE_PREFIX}${codeOrAlias}`);
    if (!raw) return null;
    return JSON.parse(raw) as ShortUrl;
  } catch {
    return null;
  }
}

/**
 * Caches a URL record with TTL
 */
export async function setCachedUrl(
  codeOrAlias: string,
  url: ShortUrl,
  ttlSeconds = DEFAULT_TTL_SECONDS,
): Promise<void> {
  const client = getRedisClient();
  if (!client) return;

  try {
    const key = `${CACHE_PREFIX}${codeOrAlias}`;
    await client.set(key, JSON.stringify(url), "EX", ttlSeconds);
  } catch {
    // Gracefully ignore cache write failures
  }
}

/**
 * Invalidates cache for a given short code and optional custom alias
 */
export async function invalidateCachedUrl(
  shortCode: string,
  customAlias?: string | null,
): Promise<void> {
  const client = getRedisClient();
  if (!client) return;

  try {
    const keys = [`${CACHE_PREFIX}${shortCode}`];
    if (customAlias) {
      keys.push(`${CACHE_PREFIX}${customAlias}`);
    }
    await client.del(...keys);
  } catch {
    // Gracefully ignore cache invalidation failures
  }
}
