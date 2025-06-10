import { apiService, PaginatedResponse } from './apiService';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  image_url?: string;
  role: number;
  avatar: string;
}

class UserService {
  async getUsers(page = 1, pageSize = 10): Promise<PaginatedResponse<User>> {
    return await apiService.get<PaginatedResponse<User>>(
      `/users/?page=${page}&pageSize=${pageSize}`
    );
  }

  async getUserById(id: string): Promise<User> {
    return await apiService.get<User>(`/user/${id}`);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return await apiService.post<User>('/create-user', userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return await apiService.post<User>('/update-user', { ...userData, id });
  }

  async deleteUser(id: string): Promise<void> {
    await apiService.delete<void>('/delete-user', { data: { id } });
  }

  async getCurrentUser(): Promise<User> {
    return await apiService.get<User>('/user');
  }
}

export const userService = new UserService();
