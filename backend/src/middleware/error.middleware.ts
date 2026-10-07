import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import type { ApiResponse } from "@shortking/shared";

/**
 * Centralized Error Formatter
 */
export function formatErrorResponse(
  error: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  const statusCode = error.statusCode || 500;
  const payload: ApiResponse<never> = {
    success: false,
    error: {
      code: error.code || "INTERNAL_ERROR",
      message:
        statusCode === 500 && process.env.NODE_ENV === "production"
          ? "An internal server error occurred"
          : error.message,
    },
  };

  return reply.status(statusCode).send(payload);
}
