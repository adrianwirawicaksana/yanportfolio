// User Profile Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface UserProfile {
  id?: string;
  name?: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  coins: number;
  owned_cards: CartItem[];
  cards?: CartItem[];
  inventory?: CartItem[];
  inventories?: CartItem[];
  card?: CartItem[];
}

// Auth Types
export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface OTPVerifyRequest {
  email: string;
  otp: string;
}
