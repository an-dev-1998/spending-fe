import { apiService, PaginatedResponse } from './apiService';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// User service class
class UserService {

  // Get all users with pagination
  async getUsers(page = 1, pageSize = 10): Promise<PaginatedResponse<User>> {
    return await apiService.get<PaginatedResponse<User>>(`/users/?page=${page}&pageSize=${pageSize}`);
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    return await apiService.get<User>(`/user/${id}`);
  }

  // Create a new user
  async createUser(userData: Partial<User>): Promise<User> {
    return await apiService.post<User>('/create-user', userData);
  }

  // Update an existing user
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return await apiService.post<User>('/update-user', { ...userData, id });
  }

  // Delete a user
  async deleteUser(id: string): Promise<void> {
    await apiService.delete<void>('/delete-user', { data: { id } });
  }
}

// Export a singleton instance
export const userService = new UserService(); 