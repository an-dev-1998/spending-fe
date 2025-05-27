import { apiService, PaginatedResponse } from './apiService';

export interface Spending {
  id: string;
  date: string;
  category: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  category_id: number;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface SpendingData {
  date: string;
  amount: number;
  category: string;
}

class SpendingService {
  private readonly baseUrl = '/spendings';

  async getSpendings(page = 1, pageSize = 10, queryParams?: string): Promise<Spending[] | PaginatedResponse<Spending>> {
    const url = `${this.baseUrl}${queryParams ? `?${queryParams}` : `?page=${page}&pageSize=${pageSize}`}`;
    const response = await apiService.get<Spending[] | PaginatedResponse<Spending>>(url);
    return response;
  }

  async getSpendingById(id: number): Promise<Spending> {
    return await apiService.get<Spending>(`${this.baseUrl}/${id}`);
  }

  async createSpending(SpendingData: Partial<Spending>): Promise<Spending> {
    return await apiService.post<Spending>(this.baseUrl, SpendingData);
  }

  async updateSpending(id: number, SpendingData: Partial<Spending>): Promise<Spending> {
    return await apiService.put<Spending>(`${this.baseUrl}/${id}`, SpendingData);
  }

  async deleteSpending(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const spendingService = new SpendingService(); 