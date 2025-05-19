import { useState, useEffect } from 'react';
import { message } from 'antd';
import { apiService } from '../utils/api/apiService';
import dayjs from 'dayjs';

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface AnalyticsData {
  category_id: number;
  total_amount: string;
  category: Category;
}

interface AnalyticsParams {
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  userId?: number;
}

export const useGetAnalytics = (params?: AnalyticsParams) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
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
      const url = `/analytics/spending-by-category${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiService.get<AnalyticsData[]>(url);
      setData(response);
      setError(null);
    } catch (error) {
      setError('Failed to fetch analytics data');
      message.error('Failed to fetch analytics data');
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [params?.startDate, params?.endDate, params?.userId]);

  return {
    loading,
    data,
    error,
    refetch: fetchAnalytics,
  };
}; 