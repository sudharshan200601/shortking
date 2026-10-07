import crypto from "crypto";
import { env } from "../config/env.js";

/**
 * Hashes an IP address using SHA-256 HMAC and the secret salt.
 * Ensures privacy compliance so raw IPs are never stored in the database.
 */
export function hashIp(ip: string): string {
  if (!ip) return "";
  return crypto.createHmac("sha256", env.IP_HASH_SALT).update(ip).digest("hex");
}
