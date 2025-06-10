import { useState, useEffect } from 'react';
import { App } from 'antd';
import { expectationService, MonthlyExpectations } from '../utils/api/expectationService';

export const useGetExpectations = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MonthlyExpectations[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { message } = App.useApp();

  const fetchExpectations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await expectationService.getSpendingExpectations();
      setData(response);
      return response;
    } catch (error) {
      const errorMessage = 'Failed to fetch expectations data';
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Error fetching expectations data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpectations();
  }, []);

  return {
    loading,
    data,
    error,
    refetch: fetchExpectations,
  };
};
