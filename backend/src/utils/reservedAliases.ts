/**
 * Default reserved aliases mirroring data/schema.sql
 */
export const DEFAULT_RESERVED_ALIASES = new Set([
  "admin",
  "api",
  "auth",
  "dashboard",
  "login",
  "logout",
  "register",
  "signup",
  "settings",
  "profile",
  "account",
  "help",
  "about",
  "contact",
  "pricing",
  "docs",
  "health",
  "status",
  "favicon.ico",
  "urls",
  "analytics",
  "404",
  "500",
]);

export function isReservedAlias(alias: string): boolean {
  const normalized = alias.trim().toLowerCase();
  return DEFAULT_RESERVED_ALIASES.has(normalized);
}
