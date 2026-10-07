import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { urlRepository } from "../src/repositories/url.repository.js";
import type { FastifyInstance } from "fastify";

describe("Redirect API: GET /:shortCode", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("redirects an active short URL to the original destination", async () => {
    const created = await urlRepository.create({
      originalUrl: "https://example.com/target-page",
      shortCode: `red${Date.now()}`.substring(0, 7),
    });

    const res = await app.inject({
      method: "GET",
      url: `/${created.shortCode}`,
    });

    expect(res.statusCode).toBe(307);
    expect(res.headers.location).toBe("https://example.com/target-page");
  });

  it("redirects via custom alias", async () => {
    const alias = `vanity${Date.now()}`.substring(0, 15);
    const created = await urlRepository.create({
      originalUrl: "https://example.com/vanity-page",
      shortCode: `code${Date.now()}`.substring(0, 7),
      customAlias: alias,
    });

    const res = await app.inject({
      method: "GET",
      url: `/${alias}`,
    });

    expect(res.statusCode).toBe(307);
    expect(res.headers.location).toBe("https://example.com/vanity-page");
  });

  it("returns 404 for non-existent short code", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/nonExistentCode999",
    });

    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("NOT_FOUND");
  });

  it("returns 410 Gone for deactivated links", async () => {
    const created = await urlRepository.create({
      originalUrl: "https://example.com/disabled",
      shortCode: `dis${Date.now()}`.substring(0, 7),
    });

    // Deactivate
    await urlRepository.update(created.id, created.userId || "", { isActive: false });

    const res = await app.inject({
      method: "GET",
      url: `/${created.shortCode}`,
    });

    expect(res.statusCode).toBe(410);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });

  it("returns 410 Gone for expired links", async () => {
    const created = await urlRepository.create({
      originalUrl: "https://example.com/expired",
      shortCode: `exp${Date.now()}`.substring(0, 7),
      expiresAt: "2020-01-01T00:00:00Z", // In the past
    });

    const res = await app.inject({
      method: "GET",
      url: `/${created.shortCode}`,
    });

    expect(res.statusCode).toBe(410);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });
});
