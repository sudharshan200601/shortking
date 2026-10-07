import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "./env.js";

let adminClient: SupabaseClient | null = null;

/**
 * Returns privileged Supabase admin client for backend operations
 * (Used for resolving public redirects, checking uniqueness, and recording click events)
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (process.env.NODE_ENV === "test" || !isSupabaseConfigured) {
    return null;
  }

  if (!adminClient && env.SUPABASE_URL) {
    const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || "";
    adminClient = createClient(env.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}

/**
 * Returns a Supabase client scoped to an authenticated user's JWT token
 * (Enforces Row Level Security policies directly in PostgreSQL)
 */
export function getSupabaseUserClient(accessToken: string): SupabaseClient | null {
  if (process.env.NODE_ENV === "test" || !isSupabaseConfigured || !env.SUPABASE_URL) {
    return null;
  }

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY || "", {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
