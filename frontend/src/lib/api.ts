import type {
  CreateUrlInput,
  CreateUrlResponse,
  ShortUrl,
  UpdateUrlInput,
  UrlListQuery,
  PaginatedResult,
  UrlAnalytics,
  ApiResponse,
} from "@shortking/shared";

let activeApiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/$/, "");

async function request<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${activeApiBase}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: unknown) {
    // If request to port 5000 fails (common on macOS due to AirPlay Receiver on port 5000),
    // automatically try port 5001 where Fastify falls back.
    if (activeApiBase.includes(":5000")) {
      const fallbackBase = activeApiBase.replace(":5000", ":5001");
      const fallbackUrl = `${fallbackBase}${endpoint}`;
      try {
        res = await fetch(fallbackUrl, {
          ...options,
          headers,
        });
        // Succeeded on 5001! Permanently update activeApiBase for all future calls
        activeApiBase = fallbackBase;
      } catch (retryErr: unknown) {
        const message = retryErr instanceof Error ? retryErr.message : "Network error";
        throw new Error(
          `Unable to connect to ShortKing API at ${fallbackUrl} (or ${url}). Ensure backend is running. ${message}`,
        );
      }
    } else {
      const message = err instanceof Error ? err.message : "Network error";
      throw new Error(`Unable to connect to ShortKing API at ${url}. ${message}`);
    }
  }

  let data: ApiResponse<T>;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Invalid response received from server (${res.status})`);
  }

  if (!data.success) {
    throw new Error(data.error.message || "An error occurred with ShortKing API");
  }

  return data.data;
}

export const api = {
  async shortenUrl(input: CreateUrlInput, token?: string): Promise<CreateUrlResponse> {
    return request<CreateUrlResponse>(
      "/api/v1/urls",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
      token,
    );
  },

  async listUrls(query: UrlListQuery, token: string): Promise<PaginatedResult<ShortUrl>> {
    const params = new URLSearchParams();
    if (query.page) params.set("page", query.page.toString());
    if (query.limit) params.set("limit", query.limit.toString());
    if (query.search) params.set("search", query.search);
    if (query.filter) params.set("filter", query.filter);
    if (query.sortBy) params.set("sortBy", query.sortBy);

    const qs = params.toString() ? `?${params.toString()}` : "";
    return request<PaginatedResult<ShortUrl>>(
      `/api/v1/urls${qs}`,
      {
        method: "GET",
      },
      token,
    );
  },

  async getUrl(id: string, token: string): Promise<ShortUrl> {
    return request<ShortUrl>(
      `/api/v1/urls/${id}`,
      {
        method: "GET",
      },
      token,
    );
  },

  async updateUrl(id: string, updates: UpdateUrlInput, token: string): Promise<ShortUrl> {
    return request<ShortUrl>(
      `/api/v1/urls/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updates),
      },
      token,
    );
  },

  async deleteUrl(id: string, token: string): Promise<{ message: string }> {
    return request<{ message: string }>(
      `/api/v1/urls/${id}`,
      {
        method: "DELETE",
      },
      token,
    );
  },

  async getUrlAnalytics(id: string, token: string): Promise<UrlAnalytics> {
    return request<UrlAnalytics>(
      `/api/v1/analytics/${id}`,
      {
        method: "GET",
      },
      token,
    );
  },
};
