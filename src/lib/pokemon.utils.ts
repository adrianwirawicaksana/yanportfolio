import { env } from "@/src/config";
import type { ApiResponse } from "@/src/types";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = env.NEXT_PUBLIC_BACKEND_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // PERUBAHAN DI SINI: Menggunakan Record<string, string> agar aman ditambah properti dinamis
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options?.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers, // Sekarang di-passing ke fetch dengan aman tanpa error type
      });

      if (!response.ok) {
        // Handle 401 - Token expired
        if (response.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Optionally redirect to login
          window.location.href = "/auth/login";
        }

        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `HTTP ${response.status}`,
          statusCode: response.status,
        };
      }

      const data = await response.json();
      return {
        data: data.data || data,
        statusCode: response.status,
      };
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        statusCode: 500,
      };
    }
  }

  async get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
