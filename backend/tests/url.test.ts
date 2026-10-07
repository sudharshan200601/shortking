import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { generateBase62Code } from "../src/utils/generateCode.js";
import { isValidWebUrl } from "../src/utils/validateUrl.js";
import { isReservedAlias } from "../src/utils/reservedAliases.js";
import type { FastifyInstance } from "fastify";

describe("Base62 Code Generator & Utilities", () => {
  it("generates a random string of configured length", () => {
    const code = generateBase62Code(7);
    expect(code).toHaveLength(7);
    expect(/^[a-zA-Z0-9]+$/.test(code)).toBe(true);
  });

  it("generates distinct codes on successive calls", () => {
    const code1 = generateBase62Code(7);
    const code2 = generateBase62Code(7);
    expect(code1).not.toBe(code2);
  });

  it("validates web URLs correctly", () => {
    expect(isValidWebUrl("https://google.com")).toBe(true);
    expect(isValidWebUrl("http://localhost:3000/path?q=1")).toBe(true);
    expect(isValidWebUrl("javascript:alert(1)")).toBe(false);
    expect(isValidWebUrl("data:text/html;base64,123")).toBe(false);
    expect(isValidWebUrl("file:///etc/passwd")).toBe(false);
    expect(isValidWebUrl("not-a-url")).toBe(false);
  });

  it("identifies reserved aliases", () => {
    expect(isReservedAlias("admin")).toBe(true);
    expect(isReservedAlias("api")).toBe(true);
    expect(isReservedAlias("dashboard")).toBe(true);
    expect(isReservedAlias("login")).toBe(true);
    expect(isReservedAlias("LOGIN")).toBe(true);
    expect(isReservedAlias("my-custom-link")).toBe(false);
  });
});

describe("URL Creation API: POST /api/v1/urls", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("shortens a valid HTTPS URL successfully", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "https://github.com/Mithun-069/ShortKing",
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    expect(body.data.shortCode).toBeDefined();
    expect(body.data.shortUrl).toContain(body.data.shortCode);
    expect(body.data.originalUrl).toBe("https://github.com/Mithun-069/ShortKing");
  });

  it("supports creating URL with custom alias", async () => {
    const customAlias = `test-alias-${Date.now()}`;
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "https://example.com/unique-page",
        customAlias,
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    expect(body.data.customAlias).toBe(customAlias);
    expect(body.data.shortUrl).toContain(customAlias);
  });

  it("rejects invalid URL format", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "not-a-valid-url",
      },
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects dangerous URL schemes", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "javascript:alert(document.cookie)",
      },
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });

  it("rejects reserved aliases", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "https://example.com",
        customAlias: "dashboard",
      },
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });

  it("rejects past expiration dates", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      payload: {
        originalUrl: "https://example.com",
        expiresAt: "2020-01-01T00:00:00Z",
      },
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });
});
