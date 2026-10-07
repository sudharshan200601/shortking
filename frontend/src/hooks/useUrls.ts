"use client";

import { useState, useCallback, useEffect } from "react";
import { api } from "../lib/api";
import { useAuth } from "./useAuth";
import type {
  ShortUrl,
  CreateUrlInput,
  UpdateUrlInput,
  UrlListQuery,
  PaginatedResult,
} from "@shortking/shared";

export function useUrls(initialQuery: UrlListQuery = { page: 1, limit: 10 }) {
  const { token, isAuthenticated } = useAuth();
  const [data, setData] = useState<PaginatedResult<ShortUrl>>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<UrlListQuery>(initialQuery);

  const fetchUrls = useCallback(
    async (customQuery?: UrlListQuery) => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const q = customQuery || query;
        const res = await api.listUrls(q, token);
        setData(res);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load URLs";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [token, query],
  );

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated && token) {
      api
        .listUrls(query, token)
        .then((res) => {
          if (isMounted) {
            setData(res);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            setError(err instanceof Error ? err.message : "Failed to load URLs");
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, query]);

  const createUrl = useCallback(
    async (input: CreateUrlInput) => {
      setLoading(true);
      setError(null);
      try {
        const created = await api.shortenUrl(input, token || undefined);
        if (token) {
          fetchUrls();
        }
        return created;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to shorten URL";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchUrls],
  );

  const updateUrl = useCallback(
    async (id: string, updates: UpdateUrlInput) => {
      if (!token) throw new Error("Authentication required");
      setLoading(true);
      try {
        const updated = await api.updateUrl(id, updates, token);
        setData((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === id ? updated : item)),
        }));
        return updated;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to update URL";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const deleteUrl = useCallback(
    async (id: string) => {
      if (!token) throw new Error("Authentication required");
      setLoading(true);
      try {
        await api.deleteUrl(id, token);
        setData((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === id ? { ...item, isActive: false } : item)),
        }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to delete URL";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return {
    urls: data.items,
    pagination: data,
    loading,
    error,
    query,
    setQuery,
    fetchUrls,
    createUrl,
    updateUrl,
    deleteUrl,
  };
}
