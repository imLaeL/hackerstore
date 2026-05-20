export interface AuthenticationRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  login: string;
}
