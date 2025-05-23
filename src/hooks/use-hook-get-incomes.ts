import { useState, useEffect } from 'react';
import { TablePaginationConfig } from 'antd';
import { Income, incomeService } from '../utils/api';

interface UseGetIncomesReturn {
  loading: boolean;
  incomes: Income[];
  pagination: TablePaginationConfig;
  handleTableChange: (pagination: TablePaginationConfig) => void;
}

export const useGetIncomes = (): UseGetIncomesReturn => {
  const [loading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchIncomes = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await incomeService.getIncomes(page, pageSize);
      if (Array.isArray(response)) {
        setIncomes(response);
        setPagination({
          ...pagination,
          total: response.length,
        });
      } else {
        setIncomes(response.data);
        setPagination({
          ...pagination,
          total: response.total,
        });
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchIncomes(newPagination.current, newPagination.pageSize);
    setPagination(newPagination);
  };

  return {
    loading,
    incomes,
    pagination,
    handleTableChange,
  };
}; 