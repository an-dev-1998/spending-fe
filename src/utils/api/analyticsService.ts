// import { apiService } from './apiService';

import { apiService } from "./apiService";

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
  private readonly baseUrl = '/analytics';

  // async getSpendingAnalyticsData(startDate: string, endDate: string): Promise<SpendingData[]> {
  //   const response = await apiService.get<SpendingData[]>(
  //     `${this.baseUrl}/spending?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response;
  // }

  // async getIncomeAnalyticsData(startDate: string, endDate: string): Promise<AnalyticsSummary> {
  //   const response = await apiService.get<AnalyticsSummary>(
  //     `${this.baseUrl}/income?startDate=${startDate}&endDate=${endDate}`
  //   );
  //   return response;
  // }

}

// Export a singleton instance
export const analyticsService = new AnalyticsService(); 