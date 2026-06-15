"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/src/services";
import type { UserProfile } from "@/src/types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCachedUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("auth_user");
    return stored ? (JSON.parse(stored) as UserProfile) : null;
  } catch {
    return null;
  }
};

const cacheUser = (profile: UserProfile | null) => {
  if (typeof window === "undefined") return;
  if (profile) {
    localStorage.setItem("auth_user", JSON.stringify(profile));
  } else {
    localStorage.removeItem("auth_user");
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const refreshProfile = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setUser(null);
      cacheUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await dashboardService.getProfile();

      if (!response.error && response.data) {
        setUser(response.data);
        cacheUser(response.data);
      } else if (response.statusCode === 401) {
        setUser(null);
        cacheUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
        cacheUser(null);
      }
    } catch (error) {
      setUser(null);
      cacheUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only run on client-side after hydration
    setMounted(true);
    const cachedUser = getCachedUser();
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    } else {
      refreshProfile();
    }
  }, [refreshProfile]);

  const clearUser = () => {
    setUser(null);
    cacheUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshProfile, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus dibungkus di dalam AuthProvider!");
  }
  return context;
};
