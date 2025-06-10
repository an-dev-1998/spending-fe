import { apiService, PaginatedResponse } from './apiService';

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

class CategoryService {
  private readonly baseUrl = '/categories';

  async getCategories(page = 1, pageSize = 10): Promise<Category[] | PaginatedResponse<Category>> {
    const response = await apiService.get<Category[] | PaginatedResponse<Category>>(
      `${this.baseUrl}?page=${page}&pageSize=${pageSize}`
    );
    return response;
  }

  async getCategoryById(id: number): Promise<Category> {
    return await apiService.get<Category>(`${this.baseUrl}/${id}`);
  }

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    return await apiService.post<Category>(this.baseUrl, categoryData);
  }

  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    return await apiService.put<Category>(`${this.baseUrl}/${id}`, categoryData);
  }

  async deleteCategory(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const categoryService = new CategoryService();
