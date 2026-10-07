import { urlRepository } from "../repositories/url.repository.js";
import { analyticsRepository } from "../repositories/analytics.repository.js";
import { getCachedUrl, setCachedUrl } from "../cache/redis.js";
import { isReservedAlias } from "../utils/reservedAliases.js";
import { NotFoundError, GoneError } from "../utils/errors.js";
import { hashIp } from "../utils/hashIp.js";
import { UAParser } from "ua-parser-js";
import type { FastifyRequest } from "fastify";
import type { ShortUrl } from "@shortking/shared";

export class RedirectService {
  async resolveRedirect(shortCode: string, req: FastifyRequest): Promise<string> {
    const trimmed = shortCode.trim();

    if (!trimmed || trimmed.length > 64 || isReservedAlias(trimmed)) {
      throw new NotFoundError("Short URL not found");
    }

    // 1. Check Redis cache first
    let urlRecord: ShortUrl | null = await getCachedUrl(trimmed);

    // 2. Cache miss: Query database
    if (!urlRecord) {
      urlRecord = await urlRepository.findByCodeOrAlias(trimmed);
      if (urlRecord) {
        setCachedUrl(trimmed, urlRecord);
      }
    }

    // 3. Not found check
    if (!urlRecord) {
      throw new NotFoundError("Short URL not found");
    }

    // 4. Active state check
    if (!urlRecord.isActive) {
      throw new GoneError("This link has been deactivated by the owner");
    }

    // 5. Expiration check
    if (urlRecord.expiresAt) {
      const expirationDate = new Date(urlRecord.expiresAt);
      if (expirationDate < new Date()) {
        throw new GoneError("This link has expired");
      }
    }

    // 6. Record analytics & increment click count asynchronously
    this.recordClickAnalytics(urlRecord.id, req).catch((err) => {
      req.log.warn({ err }, "Failed to record click analytics asynchronously");
    });

    return urlRecord.originalUrl;
  }

  private async recordClickAnalytics(urlId: string, req: FastifyRequest): Promise<void> {
    const userAgent = req.headers["user-agent"] || "";
    const parser = new UAParser(userAgent);
    const parsedUa = parser.getResult();

    const device = parsedUa.device.type || (parsedUa.device.model ? "Mobile" : "Desktop");
    const browser = parsedUa.browser.name || "Unknown";
    const os = parsedUa.os.name || "Unknown";

    const rawIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "";
    const ipHash = rawIp ? hashIp(rawIp) : undefined;

    const country =
      (req.headers["cf-ipcountry"] as string) ||
      (req.headers["x-vercel-ip-country"] as string) ||
      null;

    const city = (req.headers["x-vercel-ip-city"] as string) || null;

    const referrer =
      (req.headers["referer"] as string) || (req.headers["referrer"] as string) || null;

    await Promise.all([
      analyticsRepository.recordClick({
        urlId,
        ipHash,
        country,
        city,
        device,
        browser,
        operatingSystem: os,
        referrer,
      }),
      urlRepository.incrementClickCount(urlId),
    ]);
  }
}

export const redirectService = new RedirectService();
