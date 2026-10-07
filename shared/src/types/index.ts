/**
 * API Response standard wrappers
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * User Profile representation
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Shortened URL Model
 */
export interface ShortUrl {
  id: string;
  userId: string | null;
  shortCode: string;
  customAlias: string | null;
  originalUrl: string;
  clickCount: number;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTOs for URL operations
 */
export interface CreateUrlInput {
  originalUrl: string;
  customAlias?: string;
  expiresAt?: string;
}

export interface CreateUrlResponse {
  id: string;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  customAlias: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface UpdateUrlInput {
  customAlias?: string;
  expiresAt?: string | null;
  isActive?: boolean;
}

/**
 * Pagination & Filtering Query
 */
export type UrlStatusFilter = "all" | "active" | "inactive" | "expired";
export type UrlSortOption = "newest" | "oldest" | "most_clicks" | "least_clicks";

export interface UrlListQuery {
  page?: number;
  limit?: number;
  search?: string;
  filter?: UrlStatusFilter;
  sortBy?: UrlSortOption;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Click Event & Analytics Models
 */
export interface ClickEvent {
  id: string;
  urlId: string;
  ipHash?: string;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  operatingSystem: string | null;
  referrer: string | null;
  createdAt: string;
}

export interface BreakdownItem {
  label: string;
  count: number;
  percentage: number;
}

export interface ClicksOverTimeItem {
  date: string;
  clicks: number;
}

export interface UrlAnalytics {
  totalClicks: number;
  clicksOverTime: ClicksOverTimeItem[];
  countries: BreakdownItem[];
  devices: BreakdownItem[];
  browsers: BreakdownItem[];
  operatingSystems: BreakdownItem[];
  referrers: BreakdownItem[];
}

/**
 * System Health
 */
export interface HealthStatus {
  status: "ok";
  timestamp: string;
  service: string;
  version: string;
}
