import { apiClient } from "@/src/lib";
import { API_ENDPOINTS } from "@/src/config";
import type { UserProfile } from "@/src/types";

export const dashboardService = {
  async getProfile() {
    return apiClient.get<UserProfile>(API_ENDPOINTS.DASHBOARD.PROFILE);
  },

  async updateProfile(data: Partial<UserProfile>) {
    return apiClient.put<UserProfile>(API_ENDPOINTS.DASHBOARD.PROFILE, data);
  },
};
