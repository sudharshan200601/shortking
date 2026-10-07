# ShortKing Security Model

## Principles

1. **Least Privilege Row Level Security (RLS)**:
   - Users can only read, update, and delete their own links.
   - Public short-code lookup is scoped to active, non-expired records only.
   - Service-role key is isolated strictly to the backend environment and never exposed to the client.

2. **Input Sanitization & Safe Schemes**:
   - Only `http://` and `https://` URL protocols are accepted.
   - Dangerous schemes such as `javascript:`, `data:`, `vbscript:`, and `file:` are strictly blocked via Zod validation.

3. **Privacy First Analytics**:
   - Client IP addresses are never persisted in raw form; only one-way SHA-256 hashes are recorded to identify unique visits without personal identification.

4. **Rate Limiting & Abuse Prevention**:
   - Configurable per-IP rate limits to prevent brute-force generation and denial-of-service attempts.
   - Reserved keywords for aliases (e.g., `admin`, `api`, `login`, `dashboard`, `auth`) are guarded.
