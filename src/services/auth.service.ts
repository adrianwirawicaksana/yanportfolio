import { apiClient } from "@/src/lib";
import { API_ENDPOINTS } from "@/src/config";
import type {
  UserProfile,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  OTPVerifyRequest,
} from "@/src/types";

export const authService = {
  async login(credentials: LoginRequest) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  async verifyOTP(data: OTPVerifyRequest) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
  },

  async googleAuth(token: string) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_AUTH, {
      token,
    });
  },

  async logout() {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
  },

  clearToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
  },

  isLoggedIn(): boolean {
    return !!this.getStoredToken();
  },
};
