const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Validates whether a given URL string is a safe, valid web address
 */
export function isValidWebUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return ALLOWED_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}
