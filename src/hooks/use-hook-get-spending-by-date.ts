import { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  analyticService,
  SpendingByDateParams,
  SpendingByDateResponse,
} from '../utils/api/analyticService';

export const useGetSpendingByDate = (params?: SpendingByDateParams) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SpendingByDateResponse | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await analyticService.getSpendingByDate(params);
      setData(response);
    } catch (error) {
      message.error('Failed to fetch analytics data');
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [params?.date]);

  return {
    loading,
    data,
    refetch: fetchAnalytics,
  };
};
