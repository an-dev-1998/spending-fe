import { apiService } from './apiService';

export interface ExpectationData {
  id?: number;
  category: number;
  description: string;
  amount: string;
  date?: string;
}

export interface MonthlyExpectations {
  month: string;
  expectations: ExpectationData[];
}

export interface ExpectationsApiResponse {
  result: MonthlyExpectations[];
}

class ExpectationService {
  private readonly baseUrl = '/expect';

  async getSpendingExpectations(): Promise<MonthlyExpectations[]> {
    const response = await apiService.get<ExpectationsApiResponse>(`${this.baseUrl}/spending`);
    return response.result;
  }

  async saveSpendingExpectations(data: MonthlyExpectations[]): Promise<any> {
    return await apiService.post<any>(`${this.baseUrl}/spending`, data);
  }
}

export const expectationService = new ExpectationService();
