import { apiService, PaginatedResponse } from './apiService';

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

export interface IncomeFilters {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
}

class IncomeService {
  private readonly baseUrl = '/incomes';

  async getIncomes(filters?: IncomeFilters): Promise<Income[] | PaginatedResponse<Income>> {
    const queryParams = new URLSearchParams();

    if (filters?.page) {
      queryParams.append('page', filters.page.toString());
    }
    if (filters?.pageSize) {
      queryParams.append('pageSize', filters.pageSize.toString());
    }
    if (filters?.startDate) {
      queryParams.append('start_date', filters.startDate);
    }
    if (filters?.endDate) {
      queryParams.append('end_date', filters.endDate);
    }

    const queryString = queryParams.toString();
    const url = `${this.baseUrl}${queryString ? `?${queryString}` : ''}`;

    const response = await apiService.get<Income[] | PaginatedResponse<Income>>(url);
    return response;
  }

  async getIncomeById(id: number): Promise<Income> {
    return await apiService.get<Income>(`${this.baseUrl}/${id}`);
  }

  async createIncome(incomeData: Partial<Income>): Promise<Income> {
    return await apiService.post<Income>(this.baseUrl, incomeData);
  }

  async updateIncome(id: number, incomeData: Partial<Income>): Promise<Income> {
    return await apiService.put<Income>(`${this.baseUrl}/${id}`, incomeData);
  }

  async deleteIncome(id: number): Promise<void> {
    await apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const incomeService = new IncomeService();
