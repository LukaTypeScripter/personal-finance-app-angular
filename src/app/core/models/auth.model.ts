export type Currency = 'USD' | 'GEO';

export interface User {
  id: string;
  email: string;
  name: string;
  currency: Currency;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  currency?: Currency;
}

export interface LoginInput {
  email: string;
  password: string;
}
