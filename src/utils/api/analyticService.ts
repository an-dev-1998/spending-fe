import { apiService } from './apiService';
import dayjs from 'dayjs';

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsData {
  category_id: number;
  total_amount: string;
  category: Category;
}

export interface SpendingAnalyticsParams {
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  userId?: number;
}

export interface IncomeAnalyticsParams {
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  userId?: number;
}

export interface SpendingByDateParams {
  date: string;
}

export interface SpendingByDateResponse {
  today: {
    date: string;
    amount: number;
  };
  yesterday: {
    date: string;
    amount: number;
  };
  difference: {
    amount: number;
    percentage: number;
  };
}

export const analyticService = {
  getSpendingAnalytics: async (params?: SpendingAnalyticsParams): Promise<AnalyticsData[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.startDate) {
      queryParams.append('start_date', params.startDate.format('YYYY-MM-DD'));
    }
    if (params?.endDate) {
      queryParams.append('end_date', params.endDate.format('YYYY-MM-DD'));
    }
    if (params?.userId) {
      queryParams.append('user_id', params.userId.toString());
    }

    const queryString = queryParams.toString();
    const url = `/analytics/spending${queryString ? `?${queryString}` : ''}`;
    
    return apiService.get<AnalyticsData[]>(url);
  },
  getIncomeAnalytics: async (params?: IncomeAnalyticsParams): Promise<AnalyticsData[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.startDate) {
      queryParams.append('start_date', params.startDate.format('YYYY-MM-DD'));
    }
    if (params?.endDate) {
      queryParams.append('end_date', params.endDate.format('YYYY-MM-DD'));
    }
    if (params?.userId) {
      queryParams.append('user_id', params.userId.toString());
    }

    const queryString = queryParams.toString();
    const url = `/analytics/income${queryString ? `?${queryString}` : ''}`;

    return apiService.get<AnalyticsData[]>(url);
  },
  getSpendingByDate: async (params?: SpendingByDateParams): Promise<SpendingByDateResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.date) {
      queryParams.append('date', params.date);
    }

    const queryString = queryParams.toString();
    const url = `/analytics/spending-by-date${queryString ? `?${queryString}` : ''}`;

    return apiService.get<SpendingByDateResponse>(url);
  }
}; 