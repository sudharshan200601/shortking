import type { FastifyPluginAsync } from "fastify";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/auth/me",
    { preHandler: [requireAuth] },
    authController.getProfile.bind(authController),
  );

  fastify.patch(
    "/auth/me",
    { preHandler: [requireAuth] },
    authController.updateProfile.bind(authController),
  );
};
