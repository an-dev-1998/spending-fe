import { useState, useEffect } from 'react';
import { message } from 'antd';
import { apiService } from '../utils/api/apiService';

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

interface PieData {
  type: string;
  value: number;
}

export const useGetAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<AnalyticsData[]>('/analytics/spending-by-category');
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
  }, []);

  return {
    loading,
    data,
    error,
    refetch: fetchAnalytics,
  };
}; 