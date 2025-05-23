import { apiService, PaginatedResponse } from './apiService';

// Income interface
export interface Income {
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

// Income service class
class IncomeService {
  private readonly baseUrl = '/incomes';

  // Get all incomes with pagination
  async getIncomes(page = 1, pageSize = 10): Promise<Income[] | PaginatedResponse<Income>> {
    const response = await apiService.get<Income[] | PaginatedResponse<Income>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
    return response;
  }

  // Get income by ID
  async getIncomeById(id: number): Promise<Income> {
    return await apiService.get<Income>(`${this.baseUrl}/${id}`);
  }

  // Create a new income
  async createIncome(incomeData: Partial<Income>): Promise<Income> {
    return await apiService.post<Income>(this.baseUrl, incomeData);
  }

  // Update an existing income
  async updateIncome(id: number, incomeData: Partial<Income>): Promise<Income> {
    return await apiService.put<Income>(`${this.baseUrl}/${id}`, incomeData);
  }

  // Delete an income
  async deleteIncome(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Export a singleton instance
export const incomeService = new IncomeService(); 