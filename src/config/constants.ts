// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/login",
    REGISTER: "/api/register",
    LOGOUT: "/api/auth/logout",
    VERIFY_OTP: "/api/register/verify",
    GOOGLE_AUTH: "/api/auth/google",
  },
  DASHBOARD: {
    PROFILE: "/api/dashboard/profile",
    PAYMENT: "/api/dashboard/payment",
  },
  MARKETPLACE: {
    CARDS: "/api/marketplace/cards",
    CHECKOUT: "/api/marketplace/checkout",
    PLATFORMS: "/api/marketplace/platforms",
  },
  PAYMENT: {
    PROCESS: "/api/dashboard/payment",
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  APP_NAME: "YanPortfolio",
  APP_VERSION: "0.1.0",
  DESCRIPTION: "Pokemon Card Marketplace & Trading Platform",
};

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify-otp",
    SUCCESS: "/auth/success",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    PROFILE: "/dashboard/setting/profile",
  },
  MARKETPLACE: {
    HOME: "/marketplace",
  },
} as const;
