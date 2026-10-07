"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { UserProfile } from "@shortking/shared";

function getInitialDevAuth(): { user: UserProfile | null; token: string | null } {
  if (typeof window === "undefined" || isSupabaseConfigured) {
    return { user: null, token: null };
  }
  try {
    const cached = localStorage.getItem("shortking_dev_user");
    if (cached) {
      const parsed = JSON.parse(cached);
      return { user: parsed.user || null, token: parsed.token || null };
    }
  } catch {
    // ignore
  }
  return { user: null, token: null };
}

export function useAuth() {
  const [initial] = useState(getInitialDevAuth);
  const [user, setUser] = useState<UserProfile | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setToken(session.access_token);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || null,
          avatarUrl: session.user.user_metadata?.avatar_url || null,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at || session.user.created_at,
        });
      }
      setLoading(false);
    });

    // 2. Listen to state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setToken(session.access_token);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || null,
          avatarUrl: session.user.user_metadata?.avatar_url || null,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at || session.user.created_at,
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      // Local dev simulation
      const mockUser: UserProfile = {
        id: "mock-user-alice",
        email,
        name: email.split("@")[0],
        avatarUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = "mock-user-alice";
      localStorage.setItem(
        "shortking_dev_user",
        JSON.stringify({ user: mockUser, token: mockToken }),
      );
      setUser(mockUser);
      setToken(mockToken);
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, error: null };
  }, []);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    if (!isSupabaseConfigured || !supabase) {
      const mockUser: UserProfile = {
        id: "mock-user-alice",
        email,
        name: name || email.split("@")[0],
        avatarUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = "mock-user-alice";
      localStorage.setItem(
        "shortking_dev_user",
        JSON.stringify({ user: mockUser, token: mockToken }),
      );
      setUser(mockUser);
      setToken(mockToken);
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || "",
          full_name: name || "",
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, error: null };
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      localStorage.removeItem("shortking_dev_user");
      setUser(null);
      setToken(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setToken(null);
  }, []);

  return {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    signIn,
    signUp,
    signOut,
  };
}
