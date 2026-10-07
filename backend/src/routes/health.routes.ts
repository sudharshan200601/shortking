import type { FastifyPluginAsync } from "fastify";
import type { ApiResponse, HealthStatus } from "@shortking/shared";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async (_request, reply) => {
    const payload: ApiResponse<HealthStatus> = {
      success: true,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "shortking-api",
        version: "0.1.0",
      },
    };

    return reply.status(200).send(payload);
  });
};
