import { urlRepository } from "../repositories/url.repository.js";
import { generateBase62Code } from "../utils/generateCode.js";
import { isReservedAlias } from "../utils/reservedAliases.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";
import { env } from "../config/env.js";
import { setCachedUrl, invalidateCachedUrl } from "../cache/redis.js";
import type {
  CreateUrlInput,
  CreateUrlResponse,
  UpdateUrlInput,
  ShortUrl,
  UrlListQuery,
  PaginatedResult,
} from "@shortking/shared";

export class UrlService {
  async createUrl(input: CreateUrlInput, userId?: string | null): Promise<CreateUrlResponse> {
    const { originalUrl, customAlias, expiresAt } = input;

    // Check custom alias if supplied
    if (customAlias) {
      if (isReservedAlias(customAlias)) {
        throw new ConflictError(`The alias '${customAlias}' is reserved and cannot be used`);
      }

      const existing = await urlRepository.findByCodeOrAlias(customAlias);
      if (existing) {
        throw new ConflictError(`The custom alias '${customAlias}' is already taken`);
      }
    }

    // Generate unique short code with collision retry loop
    let shortCode = "";
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const candidate = generateBase62Code(env.SHORT_CODE_LENGTH);
      // Ensure candidate doesn't match a reserved alias or existing code/alias
      if (!isReservedAlias(candidate)) {
        const existing = await urlRepository.findByCodeOrAlias(candidate);
        if (!existing) {
          shortCode = candidate;
          break;
        }
      }
      attempts++;
    }

    if (!shortCode) {
      throw new Error("Failed to generate unique short code. Please try again.");
    }

    const saved = await urlRepository.create({
      userId: userId || null,
      shortCode,
      customAlias: customAlias || null,
      originalUrl,
      expiresAt: expiresAt || null,
    });

    // Populate Redis cache asynchronously
    setCachedUrl(saved.shortCode, saved);
    if (saved.customAlias) {
      setCachedUrl(saved.customAlias, saved);
    }

    const domain = env.SHORT_URL_DOMAIN.replace(/\/$/, "");
    const activeIdentifier = saved.customAlias || saved.shortCode;

    return {
      id: saved.id,
      shortCode: saved.shortCode,
      shortUrl: `${domain}/${activeIdentifier}`,
      originalUrl: saved.originalUrl,
      customAlias: saved.customAlias,
      expiresAt: saved.expiresAt,
      createdAt: saved.createdAt,
    };
  }

  async listUserUrls(userId: string, query: UrlListQuery): Promise<PaginatedResult<ShortUrl>> {
    return urlRepository.listByUserId(userId, query);
  }

  async getUrlById(id: string, userId: string): Promise<ShortUrl> {
    const url = await urlRepository.findById(id, userId);
    if (!url) {
      throw new NotFoundError("URL not found or you do not have permission to view it");
    }
    return url;
  }

  async updateUrl(id: string, userId: string, updates: UpdateUrlInput): Promise<ShortUrl> {
    const existing = await urlRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("URL not found or you do not have permission to modify it");
    }

    if (updates.customAlias && updates.customAlias !== existing.customAlias) {
      if (isReservedAlias(updates.customAlias)) {
        throw new ConflictError(`The alias '${updates.customAlias}' is reserved`);
      }

      const conflict = await urlRepository.findByCodeOrAlias(updates.customAlias);
      if (conflict && conflict.id !== id) {
        throw new ConflictError(`The custom alias '${updates.customAlias}' is already taken`);
      }
    }

    const updated = await urlRepository.update(id, userId, updates);
    if (!updated) {
      throw new NotFoundError("URL not found");
    }

    // Invalidate old cache and prime new cache
    await invalidateCachedUrl(existing.shortCode, existing.customAlias);
    setCachedUrl(updated.shortCode, updated);
    if (updated.customAlias) {
      setCachedUrl(updated.customAlias, updated);
    }

    return updated;
  }

  async deleteUrl(id: string, userId: string): Promise<boolean> {
    const existing = await urlRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("URL not found or you do not have permission to delete it");
    }

    const success = await urlRepository.delete(id, userId);
    if (success) {
      await invalidateCachedUrl(existing.shortCode, existing.customAlias);
    }
    return success;
  }
}

export const urlService = new UrlService();
