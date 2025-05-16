import { apiService, PaginatedResponse, ApiResponse } from './apiService';

// Spending interface
export interface Spending {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  amount: number;
}

// Spending service class
class SpendingService {
  private readonly baseUrl = '/spendings';

  // Get all spendings with pagination
  async getSpendings(page = 1, pageSize = 10): Promise<Spending[] | PaginatedResponse<Spending>> {
    const response = await apiService.get<Spending[] | PaginatedResponse<Spending>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
    return response;
  }

  // Get spending by ID
  async getSpendingById(id: number): Promise<Spending> {
    return await apiService.get<Spending>(`${this.baseUrl}/${id}`);
  }

  // Create a new spending
  async createSpending(SpendingData: Partial<Spending>): Promise<Spending> {
    return await apiService.post<Spending>(this.baseUrl, SpendingData);
  }

  // Update an existing spending
  async updateSpending(id: number, SpendingData: Partial<Spending>): Promise<Spending> {
    return await apiService.put<Spending>(`${this.baseUrl}/${id}`, SpendingData);
  }

  // Delete a spending
  async deleteSpending(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Export a singleton instance
export const spendingService = new SpendingService(); 