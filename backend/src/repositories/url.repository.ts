import { getSupabaseAdmin } from "../config/database.js";
import type { ShortUrl, UrlListQuery, PaginatedResult, UpdateUrlInput } from "@shortking/shared";
import crypto from "crypto";

interface DbUrlRow {
  id: string;
  user_id: string | null;
  short_code: string;
  custom_alias: string | null;
  original_url: string;
  click_count: number | string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: DbUrlRow): ShortUrl {
  return {
    id: row.id,
    userId: row.user_id,
    shortCode: row.short_code,
    customAlias: row.custom_alias,
    originalUrl: row.original_url,
    clickCount: Number(row.click_count) || 0,
    isActive: row.is_active,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// In-memory fallback storage for offline development and local automated tests
const inMemoryUrls = new Map<string, ShortUrl>();

export class UrlRepository {
  async create(data: {
    userId?: string | null;
    shortCode: string;
    customAlias?: string | null;
    originalUrl: string;
    expiresAt?: string | null;
  }): Promise<ShortUrl> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("urls")
        .insert({
          user_id: data.userId || null,
          short_code: data.shortCode,
          custom_alias: data.customAlias || null,
          original_url: data.originalUrl,
          expires_at: data.expiresAt || null,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create URL: ${error.message}`);
      }

      return mapRow(inserted as DbUrlRow);
    }

    // Fallback store
    const now = new Date().toISOString();
    const newUrl: ShortUrl = {
      id: crypto.randomUUID(),
      userId: data.userId || null,
      shortCode: data.shortCode,
      customAlias: data.customAlias || null,
      originalUrl: data.originalUrl,
      clickCount: 0,
      isActive: true,
      expiresAt: data.expiresAt || null,
      createdAt: now,
      updatedAt: now,
    };
    inMemoryUrls.set(newUrl.id, newUrl);
    return newUrl;
  }

  async findByCodeOrAlias(codeOrAlias: string): Promise<ShortUrl | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .or(`short_code.eq.${codeOrAlias},custom_alias.eq.${codeOrAlias}`)
        .maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbUrlRow);
    }

    // Fallback
    for (const url of inMemoryUrls.values()) {
      if (url.shortCode === codeOrAlias || url.customAlias === codeOrAlias) {
        return url;
      }
    }
    return null;
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("short_code", shortCode)
        .maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbUrlRow);
    }

    for (const url of inMemoryUrls.values()) {
      if (url.shortCode === shortCode) return url;
    }
    return null;
  }

  async findByCustomAlias(alias: string): Promise<ShortUrl | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("custom_alias", alias)
        .maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbUrlRow);
    }

    for (const url of inMemoryUrls.values()) {
      if (url.customAlias === alias) return url;
    }
    return null;
  }

  async findById(id: string, userId?: string): Promise<ShortUrl | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      let query = supabase.from("urls").select("*").eq("id", id);
      if (userId) {
        query = query.eq("user_id", userId);
      }
      const { data, error } = await query.maybeSingle();
      if (error || !data) return null;
      return mapRow(data as DbUrlRow);
    }

    const found = inMemoryUrls.get(id);
    if (!found) return null;
    if (userId && found.userId !== userId) return null;
    return found;
  }

  async listByUserId(userId: string, query: UrlListQuery): Promise<PaginatedResult<ShortUrl>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const supabase = getSupabaseAdmin();

    if (supabase) {
      let dbQuery = supabase.from("urls").select("*", { count: "exact" }).eq("user_id", userId);

      if (query.search) {
        dbQuery = dbQuery.or(
          `original_url.ilike.%${query.search}%,short_code.ilike.%${query.search}%,custom_alias.ilike.%${query.search}%`,
        );
      }

      if (query.filter === "active") {
        dbQuery = dbQuery.eq("is_active", true);
      } else if (query.filter === "inactive") {
        dbQuery = dbQuery.eq("is_active", false);
      } else if (query.filter === "expired") {
        dbQuery = dbQuery.lt("expires_at", new Date().toISOString());
      }

      if (query.sortBy === "oldest") {
        dbQuery = dbQuery.order("created_at", { ascending: true });
      } else if (query.sortBy === "most_clicks") {
        dbQuery = dbQuery.order("click_count", { ascending: false });
      } else if (query.sortBy === "least_clicks") {
        dbQuery = dbQuery.order("click_count", { ascending: true });
      } else {
        dbQuery = dbQuery.order("created_at", { ascending: false });
      }

      const { data, error, count } = await dbQuery.range(offset, offset + limit - 1);
      if (error) {
        throw new Error(`Failed to list URLs: ${error.message}`);
      }

      const total = count || 0;
      return {
        items: (data as DbUrlRow[]).map(mapRow),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      };
    }

    // Fallback in-memory
    let list = Array.from(inMemoryUrls.values()).filter((u) => u.userId === userId);

    if (query.search) {
      const s = query.search.toLowerCase();
      list = list.filter(
        (u) =>
          u.originalUrl.toLowerCase().includes(s) ||
          u.shortCode.toLowerCase().includes(s) ||
          (u.customAlias && u.customAlias.toLowerCase().includes(s)),
      );
    }

    if (query.filter === "active") {
      list = list.filter((u) => u.isActive);
    } else if (query.filter === "inactive") {
      list = list.filter((u) => !u.isActive);
    } else if (query.filter === "expired") {
      const now = new Date().toISOString();
      list = list.filter((u) => u.expiresAt && u.expiresAt < now);
    }

    if (query.sortBy === "oldest") {
      list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (query.sortBy === "most_clicks") {
      list.sort((a, b) => b.clickCount - a.clickCount);
    } else if (query.sortBy === "least_clicks") {
      list.sort((a, b) => a.clickCount - b.clickCount);
    } else {
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    const total = list.length;
    const paginated = list.slice(offset, offset + limit);

    return {
      items: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async update(id: string, userId: string, updates: UpdateUrlInput): Promise<ShortUrl | null> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updates.customAlias !== undefined) payload.custom_alias = updates.customAlias;
      if (updates.expiresAt !== undefined) payload.expires_at = updates.expiresAt;
      if (updates.isActive !== undefined) payload.is_active = updates.isActive;
      payload.updated_at = new Date().toISOString();

      let query = supabase.from("urls").update(payload).eq("id", id);
      if (userId && userId.trim() !== "") {
        query = query.eq("user_id", userId);
      }
      const { data, error } = await query.select().maybeSingle();

      if (error || !data) return null;
      return mapRow(data as DbUrlRow);
    }

    const existing = inMemoryUrls.get(id);
    if (!existing) return null;
    if (userId && userId.trim() !== "" && existing.userId && existing.userId !== userId)
      return null;

    const updated: ShortUrl = {
      ...existing,
      customAlias: updates.customAlias !== undefined ? updates.customAlias : existing.customAlias,
      expiresAt: updates.expiresAt !== undefined ? updates.expiresAt : existing.expiresAt,
      isActive: updates.isActive !== undefined ? updates.isActive : existing.isActive,
      updatedAt: new Date().toISOString(),
    };
    inMemoryUrls.set(id, updated);
    return updated;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      // Soft-delete / deactivation as requested in Section 12
      let query = supabase
        .from("urls")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (userId && userId.trim() !== "") {
        query = query.eq("user_id", userId);
      }

      const { error } = await query;
      return !error;
    }

    const existing = inMemoryUrls.get(id);
    if (!existing) return false;
    if (userId && userId.trim() !== "" && existing.userId && existing.userId !== userId)
      return false;
    existing.isActive = false;
    existing.updatedAt = new Date().toISOString();
    return true;
  }

  async incrementClickCount(id: string): Promise<void> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      // Use SQL atomic increment or rpc
      const { data } = await supabase.from("urls").select("click_count").eq("id", id).single();
      if (data) {
        await supabase
          .from("urls")
          .update({ click_count: Number(data.click_count) + 1 })
          .eq("id", id);
      }
      return;
    }

    const existing = inMemoryUrls.get(id);
    if (existing) {
      existing.clickCount += 1;
    }
  }
}

export const urlRepository = new UrlRepository();
