import type { FastifyRequest } from "fastify";
import type { UserProfile } from "@shortking/shared";

export interface AuthenticatedRequest extends FastifyRequest {
  user?: UserProfile;
}
