import { apiService } from './apiService';

export interface AuthResponse {
  data?: {
    user: {
      id: number;
      name: string;
      email: string;
      created_at: string;
      updated_at: string;
      role: number;
      image_url: string;
    };
    token: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    role: number;
    image_url: string;
  };
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AuthService {
  private readonly baseUrl = '/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
    return response;
  }

  async logout(): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/logout`);
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiService.get<{ user: AuthResponse['user'] }>(`${this.baseUrl}/user`);
    return response.user;
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/change-password`, data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/register`, credentials);
  }
}

export const authService = new AuthService(); 