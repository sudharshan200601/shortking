import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { urlRepository } from "../src/repositories/url.repository.js";
import type { FastifyInstance } from "fastify";

describe("Authentication & Authorization Tests", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("blocks unauthenticated access to GET /api/v1/urls", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/urls",
    });

    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("blocks unauthenticated access to GET /api/v1/analytics/:id", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/analytics/any-id",
    });

    expect(res.statusCode).toBe(401);
  });

  it("allows authenticated user to create, list, and view their URLs", async () => {
    const userToken = "mock-user-alice";

    // 1. Create URL as Alice
    const createRes = await app.inject({
      method: "POST",
      url: "/api/v1/urls",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
      payload: {
        originalUrl: "https://alice.dev/blog",
      },
    });

    expect(createRes.statusCode).toBe(201);
    const created = JSON.parse(createRes.body).data;

    // 2. List URLs as Alice
    const listRes = await app.inject({
      method: "GET",
      url: "/api/v1/urls",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });

    expect(listRes.statusCode).toBe(200);
    const listData = JSON.parse(listRes.body).data;
    expect(listData.items.some((item: { id: string }) => item.id === created.id)).toBe(true);

    // 3. User Bob cannot view or modify Alice's URL
    const bobToken = "mock-user-bob";
    const bobGetRes = await app.inject({
      method: "GET",
      url: `/api/v1/urls/${created.id}`,
      headers: {
        authorization: `Bearer ${bobToken}`,
      },
    });
    expect(bobGetRes.statusCode).toBe(404);

    const bobDeleteRes = await app.inject({
      method: "DELETE",
      url: `/api/v1/urls/${created.id}`,
      headers: {
        authorization: `Bearer ${bobToken}`,
      },
    });
    expect(bobDeleteRes.statusCode).toBe(404);
  });
});
