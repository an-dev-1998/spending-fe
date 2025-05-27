import { useState, useEffect } from 'react';
import { message } from 'antd';
import { apiService } from '../utils/api/apiService';

interface DashboardData {
  totalSpending: number;
  totalIncome: number;
  totalBalance: number;
  totalPerDay: number;
}

export const useGetDashboards = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData>({
    totalSpending: 0,
    totalIncome: 0,
    totalBalance: 0,
    totalPerDay: 0
  });
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<DashboardData>('/analytics/total');
      setData(response);
      setError(null);
    } catch (error) {
      setError('Failed to fetch dashboard data');
      message.error('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    loading,
    data,
    error,
    refetch: fetchDashboardData,
  };
}; 