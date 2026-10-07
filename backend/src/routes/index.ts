import type { FastifyPluginAsync } from "fastify";
import { healthRoutes } from "./health.routes.js";
import { urlRoutes } from "./url.routes.js";
import { analyticsRoutes } from "./analytics.routes.js";
import { authRoutes } from "./auth.routes.js";

export const apiRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(healthRoutes);
  await fastify.register(urlRoutes);
  await fastify.register(analyticsRoutes);
  await fastify.register(authRoutes);
};
