import { getSupabaseAdmin } from "../config/database.js";
import type {
  ClickEvent,
  UrlAnalytics,
  BreakdownItem,
  ClicksOverTimeItem,
} from "@shortking/shared";
import crypto from "crypto";

interface DbClickRow {
  id: string;
  url_id: string;
  ip_hash: string | null;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  operating_system: string | null;
  referrer: string | null;
  created_at: string;
}

function mapRow(row: DbClickRow): ClickEvent {
  return {
    id: row.id,
    urlId: row.url_id,
    ipHash: row.ip_hash || undefined,
    country: row.country,
    city: row.city,
    device: row.device,
    browser: row.browser,
    operatingSystem: row.operating_system,
    referrer: row.referrer,
    createdAt: row.created_at,
  };
}

// In-memory store for click events
const inMemoryClicks: ClickEvent[] = [];

export class AnalyticsRepository {
  async recordClick(data: {
    urlId: string;
    ipHash?: string;
    country?: string | null;
    city?: string | null;
    device?: string | null;
    browser?: string | null;
    operatingSystem?: string | null;
    referrer?: string | null;
  }): Promise<ClickEvent> {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("click_events")
        .insert({
          url_id: data.urlId,
          ip_hash: data.ipHash || null,
          country: data.country || null,
          city: data.city || null,
          device: data.device || null,
          browser: data.browser || null,
          operating_system: data.operatingSystem || null,
          referrer: data.referrer || null,
        })
        .select()
        .single();

      if (!error && inserted) {
        return mapRow(inserted as DbClickRow);
      }
    }

    const click: ClickEvent = {
      id: crypto.randomUUID(),
      urlId: data.urlId,
      ipHash: data.ipHash,
      country: data.country || null,
      city: data.city || null,
      device: data.device || null,
      browser: data.browser || null,
      operatingSystem: data.operatingSystem || null,
      referrer: data.referrer || null,
      createdAt: new Date().toISOString(),
    };
    inMemoryClicks.push(click);
    return click;
  }

  async getAnalytics(urlId: string): Promise<UrlAnalytics> {
    const supabase = getSupabaseAdmin();
    let events: ClickEvent[] = [];

    if (supabase) {
      const { data, error } = await supabase
        .from("click_events")
        .select("*")
        .eq("url_id", urlId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        events = (data as DbClickRow[]).map(mapRow);
      }
    } else {
      events = inMemoryClicks.filter((c) => c.urlId === urlId);
    }

    const totalClicks = events.length;

    // Helper to calculate breakdown distributions
    const getBreakdown = (extractor: (e: ClickEvent) => string | null): BreakdownItem[] => {
      if (totalClicks === 0) return [];
      const counts = new Map<string, number>();

      for (const e of events) {
        const val = extractor(e) || "Direct / Unknown";
        counts.set(val, (counts.get(val) || 0) + 1);
      }

      return Array.from(counts.entries())
        .map(([label, count]) => ({
          label,
          count,
          percentage: Math.round((count / totalClicks) * 100),
        }))
        .sort((a, b) => b.count - a.count);
    };

    // Group clicks over time (by date: YYYY-MM-DD)
    const dateCounts = new Map<string, number>();
    for (const e of events) {
      const date = e.createdAt.split("T")[0];
      dateCounts.set(date, (dateCounts.get(date) || 0) + 1);
    }

    const clicksOverTime: ClicksOverTimeItem[] = Array.from(dateCounts.entries())
      .map(([date, clicks]) => ({ date, clicks }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalClicks,
      clicksOverTime,
      countries: getBreakdown((e) => e.country),
      devices: getBreakdown((e) => e.device),
      browsers: getBreakdown((e) => e.browser),
      operatingSystems: getBreakdown((e) => e.operatingSystem),
      referrers: getBreakdown((e) => e.referrer),
    };
  }
}

export const analyticsRepository = new AnalyticsRepository();
