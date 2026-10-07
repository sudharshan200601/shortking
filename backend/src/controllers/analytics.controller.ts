import type { FastifyRequest, FastifyReply } from "fastify";
import { analyticsService } from "../services/analytics.service.js";
import type { ApiResponse, UrlAnalytics } from "@shortking/shared";

export class AnalyticsController {
  async getAnalytics(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    const data = await analyticsService.getUrlAnalytics(id, userId);
    const response: ApiResponse<UrlAnalytics> = {
      success: true,
      data,
    };

    return reply.status(200).send(response);
  }
}

export const analyticsController = new AnalyticsController();
