import { useState, useEffect } from 'react';
import { message } from 'antd';
import { analyticService, AnalyticsData, IncomeAnalyticsParams } from '../utils/api/analyticService';

export const useGetIncomeAnalytics = (params?: IncomeAnalyticsParams) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await analyticService.getIncomeAnalytics(params);
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