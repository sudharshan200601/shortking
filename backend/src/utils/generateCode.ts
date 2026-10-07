import crypto from "crypto";
import { env } from "../config/env.js";

export const BASE62_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generates an unpredictable, cryptographically random Base62 string.
 * Uses crypto.randomInt to eliminate modulo bias.
 */
export function generateBase62Code(length = env.SHORT_CODE_LENGTH): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, BASE62_CHARS.length);
    result += BASE62_CHARS[randomIndex];
  }
  return result;
}
