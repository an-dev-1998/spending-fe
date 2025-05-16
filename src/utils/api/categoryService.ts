import { apiService, PaginatedResponse } from './apiService';

// Category interface
export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Category service class
class CategoryService {
  private readonly baseUrl = '/categories';

  // Get all categories with pagination
  async getCategories(page = 1, pageSize = 10): Promise<Category[] | PaginatedResponse<Category>> {
    const response = await apiService.get<Category[] | PaginatedResponse<Category>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
    return response;
  }

  // Get category by ID
  async getCategoryById(id: number): Promise<Category> {
    return await apiService.get<Category>(`${this.baseUrl}/${id}`);
  }

  // Create a new category
  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    return await apiService.post<Category>(this.baseUrl, categoryData);
  }

  // Update an existing category
  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    return await apiService.put<Category>(`${this.baseUrl}/${id}`, categoryData);
  }

  // Delete a category
  async deleteCategory(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Export a singleton instance
export const categoryService = new CategoryService(); 