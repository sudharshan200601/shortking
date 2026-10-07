import { urlRepository } from "../repositories/url.repository.js";
import { analyticsRepository } from "../repositories/analytics.repository.js";
import { NotFoundError } from "../utils/errors.js";
import type { UrlAnalytics } from "@shortking/shared";

export class AnalyticsService {
  async getUrlAnalytics(urlId: string, userId: string): Promise<UrlAnalytics> {
    const url = await urlRepository.findById(urlId, userId);
    if (!url) {
      throw new NotFoundError("URL not found or you do not have permission to view its analytics");
    }

    return analyticsRepository.getAnalytics(urlId);
  }
}

export const analyticsService = new AnalyticsService();
