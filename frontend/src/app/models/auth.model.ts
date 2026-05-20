export interface AuthenticationRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    login: string;
    role?: string;
  };
}

export interface User {
  login: string;
  role?: string;
}
