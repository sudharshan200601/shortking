import { z } from "zod";
import { isValidWebUrl } from "../utils/validateUrl.js";
import { isReservedAlias } from "../utils/reservedAliases.js";
import { env } from "../config/env.js";

/**
 * URL Input Validation Schemas
 */
export const createUrlSchema = z.object({
  originalUrl: z
    .string({ required_error: "originalUrl is required" })
    .max(env.MAX_URL_LENGTH, `URL must not exceed ${env.MAX_URL_LENGTH} characters`)
    .refine((val) => isValidWebUrl(val), {
      message: "Only valid http:// and https:// URLs are allowed",
    }),
  customAlias: z
    .string()
    .min(3, "Custom alias must be at least 3 characters")
    .max(env.MAX_ALIAS_LENGTH, `Custom alias must not exceed ${env.MAX_ALIAS_LENGTH} characters`)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Custom alias can only contain alphanumeric characters, hyphens, and underscores",
    )
    .refine((val) => !isReservedAlias(val), {
      message: "This alias is reserved and cannot be used",
    })
    .optional(),
  expiresAt: z
    .string()
    .datetime({ message: "expiresAt must be a valid ISO 8601 date string" })
    .refine((val) => new Date(val) > new Date(), {
      message: "expiresAt must be in the future",
    })
    .optional(),
});

export const updateUrlSchema = z.object({
  customAlias: z
    .string()
    .min(3, "Custom alias must be at least 3 characters")
    .max(env.MAX_ALIAS_LENGTH, `Custom alias must not exceed ${env.MAX_ALIAS_LENGTH} characters`)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Custom alias can only contain alphanumeric characters, hyphens, and underscores",
    )
    .refine((val) => !isReservedAlias(val), {
      message: "This alias is reserved and cannot be used",
    })
    .optional(),
  expiresAt: z
    .string()
    .datetime({ message: "expiresAt must be a valid ISO 8601 date string" })
    .nullable()
    .optional(),
  isActive: z.boolean().optional(),
});

export const listUrlsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  filter: z.enum(["all", "active", "inactive", "expired"]).default("all"),
  sortBy: z.enum(["newest", "oldest", "most_clicks", "least_clicks"]).default("newest"),
});

export type CreateUrlDto = z.infer<typeof createUrlSchema>;
export type UpdateUrlDto = z.infer<typeof updateUrlSchema>;
export type ListUrlsQueryDto = z.infer<typeof listUrlsQuerySchema>;
