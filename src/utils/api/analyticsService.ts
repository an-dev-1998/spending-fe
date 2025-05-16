import { apiService } from './apiService';

export interface SpendingData {
  date: string;
  amount: number;
  category: string;
}

export interface AnalyticsSummary {
  totalSpending: number;
  averageDaily: number;
  monthlyChange: number;
  yearOverYear: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

class AnalyticsService {
  // private readonly baseUrl = '/analytics';

  // // Get spending data for a date range
  // async getSpendingData(startDate: string, endDate: string): Promise<SpendingData[]> {
  //   const response = await apiService.get<SpendingData[]>(
  //     `${this.baseUrl}/spending?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response.data;
  // }

  // // Get analytics summary
  // async getAnalyticsSummary(startDate: string, endDate: string): Promise<AnalyticsSummary> {
  //   const response = await apiService.get<AnalyticsSummary>(
  //     `${this.baseUrl}/summary?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response.data;
  // }

  // // Get category breakdown
  // async getCategoryBreakdown(startDate: string, endDate: string): Promise<CategoryBreakdown[]> {
  //   const response = await apiService.get<CategoryBreakdown[]>(
  //     `${this.baseUrl}/categories?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response.data;
  // }

  // // Get spending trends
  // async getSpendingTrends(startDate: string, endDate: string): Promise<SpendingData[]> {
  //   const response = await apiService.get<SpendingData[]>(
  //     `${this.baseUrl}/trends?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response.data;
  // }
}

// Export a singleton instance
export const analyticsService = new AnalyticsService(); 