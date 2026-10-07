import type { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../services/auth.service.js";
import { z } from "zod";
import type { ApiResponse, UserProfile } from "@shortking/shared";

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export class AuthController {
  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    const profile = await authService.getProfile(req.user!.id);
    const response: ApiResponse<UserProfile> = {
      success: true,
      data: profile,
    };
    return reply.status(200).send(response);
  }

  async updateProfile(req: FastifyRequest, reply: FastifyReply) {
    const validated = updateProfileSchema.parse(req.body);
    const profile = await authService.updateProfile(req.user!.id, validated);
    const response: ApiResponse<UserProfile> = {
      success: true,
      data: profile,
    };
    return reply.status(200).send(response);
  }
}

export const authController = new AuthController();
