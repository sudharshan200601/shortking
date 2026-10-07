# ShortKing API Documentation

All API endpoints are versioned under `/api/v1` with the exception of the direct redirect handler `/:shortCode`.

## Standard Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable explanation"
  }
}
```

## Endpoints Summary

### System Health

- **`GET /api/v1/health`**
  - Returns current health status, timestamp, and version.

### URL Operations (Phase 3 & 5)

- **`POST /api/v1/urls`**
  - Create a shortened URL. Supports optional `customAlias` and `expiresAt`.
- **`GET /api/v1/urls`**
  - List authenticated user's URLs with pagination and search.
- **`GET /api/v1/urls/:id`**
  - Retrieve details for a specific URL.
- **`PATCH /api/v1/urls/:id`**
  - Update custom alias, expiration, or active status.
- **`DELETE /api/v1/urls/:id`**
  - Soft-delete or deactivate a shortened URL.

### Redirection (Phase 3 & 5)

- **`GET /:shortCode`**
  - Resolves short code or custom alias, records click event, and redirects (HTTP 302/307).

### Analytics (Phase 8)

- **`GET /api/v1/analytics/:id`**
  - Aggregated metrics including clicks over time, devices, browsers, and countries.
