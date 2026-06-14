import { apiClient } from "@/src/lib";
import { API_ENDPOINTS } from "@/src/config";

export type CreateSnapTokenRequest = {
  packageId: string;
  packageName: string;
  price: number;
  coinAmount: number;
};

export type CreateSnapTokenResponse = {
  token: string;
};

export const paymentService = {
  async createSnapToken(payload: CreateSnapTokenRequest) {
    return apiClient.post<CreateSnapTokenResponse>(
      API_ENDPOINTS.DASHBOARD.PAYMENT,
      payload,
    );
  },
};
