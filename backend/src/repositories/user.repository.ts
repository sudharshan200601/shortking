import { getSupabaseAdmin } from "../config/database.js";
import type { UserProfile } from "@shortking/shared";

interface DbProfileRow {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: DbProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const inMemoryProfiles = new Map<string, UserProfile>();

export class UserRepository {
  async getProfile(id: string): Promise<UserProfile | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbProfileRow);
    }

    return inMemoryProfiles.get(id) || null;
  }

  async updateProfile(
    id: string,
    updates: { name?: string | null; avatarUrl?: string | null },
  ): Promise<UserProfile | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const payload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;

      const { data, error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbProfileRow);
    }

    const existing = inMemoryProfiles.get(id);
    if (!existing) return null;
    const updated: UserProfile = {
      ...existing,
      name: updates.name !== undefined ? updates.name : existing.name,
      avatarUrl: updates.avatarUrl !== undefined ? updates.avatarUrl : existing.avatarUrl,
      updatedAt: new Date().toISOString(),
    };
    inMemoryProfiles.set(id, updated);
    return updated;
  }
}

export const userRepository = new UserRepository();
