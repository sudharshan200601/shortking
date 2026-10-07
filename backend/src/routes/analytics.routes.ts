import type { FastifyPluginAsync } from "fastify";
import { analyticsController } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const analyticsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/analytics/:id",
    { preHandler: [requireAuth] },
    analyticsController.getAnalytics.bind(analyticsController),
  );
};
