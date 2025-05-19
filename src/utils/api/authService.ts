import { apiService } from './apiService';

// Auth response interface
export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    role: number;
  };
  token: string;
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Change password interface
export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

// Register credentials interface
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Auth service class
class AuthService {
  private readonly baseUrl = '/auth';

  // Login with email and password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
    // The response is already the data object from the API response
    return response;
  }

  // Logout user
  async logout(): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/logout`);
  }

  // Get current authenticated user
  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiService.get<{ user: AuthResponse['user'] }>(`${this.baseUrl}/user`);
    return response.user;
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/change-password`, data);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Set auth token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Remove auth token
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Register new user
  async register(credentials: RegisterCredentials): Promise<void> {
    await apiService.post<void>(`${this.baseUrl}/register`, credentials);
  }
}

// Export a singleton instance
export const authService = new AuthService(); 