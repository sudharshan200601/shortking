import Fastify, { FastifyError, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import type { ApiResponse } from "@shortking/shared";
import { apiRoutes } from "./routes/index.js";
import { redirectService } from "./services/redirect.service.js";
import { AppError } from "./utils/errors.js";
import { env } from "./config/env.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "test" ? "silent" : "info",
    },
  });

  // Centralized error handler - MUST be registered before routes/plugins
  app.setErrorHandler((error: FastifyError | AppError | ZodError, _request, reply) => {
    if (
      error instanceof ZodError ||
      error.name === "ZodError" ||
      ("issues" in error && Array.isArray((error as any).issues))
    ) {
      const issues = (error as any).issues || (error as ZodError).errors || [];
      const message = issues[0]?.message || "Input validation failed";
      const errorResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message,
          details: issues,
        },
      };
      return reply.status(400).send(errorResponse);
    }

    const err = error as any;
    if (
      error instanceof AppError ||
      error.name === "AppError" ||
      (typeof err.statusCode === "number" && err.statusCode >= 400 && err.statusCode < 500)
    ) {
      const statusCode = err.statusCode || 400;
      const errorResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: err.code || "CLIENT_ERROR",
          message: error.message,
        },
      };
      return reply.status(statusCode).send(errorResponse);
    }

    app.log.error(error);

    const statusCode = (error as FastifyError).statusCode || 500;
    const errorResponse: ApiResponse<never> = {
      success: false,
      error: {
        code: (error as FastifyError).code || "INTERNAL_SERVER_ERROR",
        message:
          statusCode === 500 && process.env.NODE_ENV === "production"
            ? "An unexpected internal server error occurred."
            : error.message,
      },
    };

    return reply.status(statusCode).send(errorResponse);
  });

  // 404 handler with consistent API format
  app.setNotFoundHandler((request, reply) => {
    const errorResponse: ApiResponse<never> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `Route ${request.method} ${request.url} not found`,
      },
    };
    reply.status(404).send(errorResponse);
  });

  // Enable CORS with dynamic environment and ngrok tunnel support
  await app.register(cors, {
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const allowedExplicit = [
        env.FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "http://localhost:5001",
        "http://127.0.0.1:5001",
      ];

      if (env.NGROK_PUBLIC_URL) {
        allowedExplicit.push(env.NGROK_PUBLIC_URL);
      }

      // Check explicit allowed origins or dynamic ngrok subdomains
      const isAllowed =
        allowedExplicit.includes(origin) ||
        origin.endsWith(".ngrok-free.app") ||
        origin.endsWith(".ngrok.io") ||
        origin.endsWith(".ngrok-free.dev") ||
        origin.endsWith(".ngrok.app");

      if (isAllowed) {
        return callback(null, true);
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
      "Accept",
      "X-Requested-With",
      "Origin",
    ],
  });

  // Root welcome / status route
  app.get("/", async (_req, reply) => {
    return reply.send({
      name: "ShortKing API",
      tagline: "Long URLs don't stand a chance.",
      version: "0.1.0",
      status: "running",
    });
  });

  // Register API v1 routes
  await app.register(apiRoutes, { prefix: "/api/v1" });

  // Direct short URL redirect handler: GET /:shortCode
  app.get("/:shortCode", async (req: FastifyRequest<{ Params: { shortCode: string } }>, reply) => {
    const { shortCode } = req.params;
    const targetUrl = await redirectService.resolveRedirect(shortCode, req);
    return reply.status(307).redirect(targetUrl);
  });

  return app;
}
