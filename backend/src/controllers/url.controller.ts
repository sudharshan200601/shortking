import type { FastifyRequest, FastifyReply } from "fastify";
import { urlService } from "../services/url.service.js";
import {
  createUrlSchema,
  updateUrlSchema,
  listUrlsQuerySchema,
} from "../validators/url.validator.js";
import type { ApiResponse, CreateUrlResponse, ShortUrl, PaginatedResult } from "@shortking/shared";

export class UrlController {
  async createUrl(req: FastifyRequest, reply: FastifyReply) {
    const validatedBody = createUrlSchema.parse(req.body);
    const result = await urlService.createUrl(validatedBody, req.user?.id);

    const response: ApiResponse<CreateUrlResponse> = {
      success: true,
      data: result,
    };

    return reply.status(201).send(response);
  }

  async listUrls(req: FastifyRequest, reply: FastifyReply) {
    const query = listUrlsQuerySchema.parse(req.query);
    const userId = req.user!.id;

    const result = await urlService.listUserUrls(userId, query);
    const response: ApiResponse<PaginatedResult<ShortUrl>> = {
      success: true,
      data: result,
    };

    return reply.status(200).send(response);
  }

  async getUrl(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    const result = await urlService.getUrlById(id, userId);
    const response: ApiResponse<ShortUrl> = {
      success: true,
      data: result,
    };

    return reply.status(200).send(response);
  }

  async updateUrl(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;
    const validatedBody = updateUrlSchema.parse(req.body);

    const result = await urlService.updateUrl(id, userId, validatedBody);
    const response: ApiResponse<ShortUrl> = {
      success: true,
      data: result,
    };

    return reply.status(200).send(response);
  }

  async deleteUrl(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    await urlService.deleteUrl(id, userId);
    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: { message: "Link successfully deactivated" },
    };

    return reply.status(200).send(response);
  }
}

export const urlController = new UrlController();
