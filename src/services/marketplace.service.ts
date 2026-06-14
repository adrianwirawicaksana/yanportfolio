import { apiClient } from "@/src/lib";
import { API_ENDPOINTS } from "@/src/config";
import type { CheckoutRequest } from "@/src/types";
// HAPUS import CartItem dari @/src/types bawaan jika itu merujuk ke tipe user yang salah

export const marketplaceService = {
  async getCards(params?: Record<string, string | number>) {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        query.append(key, String(value));
      });
    }
    const endpoint = `${API_ENDPOINTS.MARKETPLACE.CARDS}${query.toString() ? `?${query.toString()}` : ""}`;
    return apiClient.get(endpoint);
  },

  async getPlatforms() {
    return apiClient.get(API_ENDPOINTS.MARKETPLACE.PLATFORMS);
  },

  // PERUBAHAN DI SINI: Kita langsung tembak tipe CartItem dari struktur CheckoutRequest bawaan API
  async checkout(items: CheckoutRequest["items"], totalPrice: number) {
    const payload: CheckoutRequest = {
      items,
      totalPrice,
    };
    return apiClient.post(API_ENDPOINTS.MARKETPLACE.CHECKOUT, payload);
  },
};
