import type { FastifyRequest, FastifyReply } from "fastify";
import { getSupabaseAdmin } from "../config/database.js";
import { UnauthorizedError } from "../utils/errors.js";
import type { UserProfile } from "@shortking/shared";

declare module "fastify" {
  interface FastifyRequest {
    user?: UserProfile;
  }
}

/**
 * Extracts and verifies the bearer token from the authorization header
 */
async function authenticateRequest(req: FastifyRequest): Promise<UserProfile | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return null;
  }

  // Development/Test mock session support
  if (token.startsWith("mock-user-") || token === "dev-mock-token") {
    return {
      id: token.startsWith("mock-user-") ? token : "dev-mock-user-id",
      email: `${token}@shortking.local`,
      name: "Test User",
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new UnauthorizedError("Invalid or expired authentication token");
  }

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.name || data.user.user_metadata?.full_name || null,
    avatarUrl: data.user.user_metadata?.avatar_url || null,
    createdAt: data.user.created_at,
    updatedAt: data.user.updated_at || data.user.created_at,
  };
}

/**
 * Strict authentication middleware - halts request if not authenticated
 */
export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  const user = await authenticateRequest(req);
  if (!user) {
    throw new UnauthorizedError("Authentication required to access this resource");
  }
  req.user = user;
}

/**
 * Optional authentication middleware - attaches user if present, proceeds otherwise
 */
export async function optionalAuth(req: FastifyRequest, _reply: FastifyReply) {
  try {
    const user = await authenticateRequest(req);
    if (user) {
      req.user = user;
    }
  } catch {
    // If token was provided but invalid in optional mode, we do not attach user
    req.user = undefined;
  }
}
