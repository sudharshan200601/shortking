import type { FastifyPluginAsync } from "fastify";
import { urlController } from "../controllers/url.controller.js";
import { optionalAuth, requireAuth } from "../middleware/auth.middleware.js";
import { createRateLimiter } from "../middleware/rateLimit.middleware.js";

export const urlRoutes: FastifyPluginAsync = async (fastify) => {
  const urlCreationRateLimiter = createRateLimiter({
    keyPrefix: "create_url",
  });

  // Create short URL (supports anonymous and authenticated users)
  fastify.post(
    "/urls",
    { preHandler: [urlCreationRateLimiter, optionalAuth] },
    urlController.createUrl.bind(urlController),
  );

  // List user's URLs
  fastify.get("/urls", { preHandler: [requireAuth] }, urlController.listUrls.bind(urlController));

  // Get specific URL
  fastify.get("/urls/:id", { preHandler: [requireAuth] }, urlController.getUrl.bind(urlController));

  // Update URL
  fastify.patch(
    "/urls/:id",
    { preHandler: [requireAuth] },
    urlController.updateUrl.bind(urlController),
  );

  // Delete / deactivate URL
  fastify.delete(
    "/urls/:id",
    { preHandler: [requireAuth] },
    urlController.deleteUrl.bind(urlController),
  );
};
