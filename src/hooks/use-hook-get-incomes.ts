import { useState, useEffect } from 'react';
import { TablePaginationConfig } from 'antd';
import { Income, incomeService } from '../utils/api';
import dayjs from 'dayjs';

interface UseGetIncomesReturn {
  loading: boolean;
  incomes: Income[];
  pagination: TablePaginationConfig;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  handleDateRangeChange: (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => void;
}

export const useGetIncomes = (): UseGetIncomesReturn => {
  const [loading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchIncomes = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const params = {
        page,
        pageSize,
        startDate: dateRange?.[0]?.format('YYYY-MM-DD'),
        endDate: dateRange?.[1]?.format('YYYY-MM-DD'),
      };
      const response = await incomeService.getIncomes(params);
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
  }, [dateRange]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchIncomes(newPagination.current, newPagination.pageSize);
    setPagination(newPagination);
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    setDateRange(dates);
  };

  return {
    loading,
    incomes,
    pagination,
    handleTableChange,
    handleDateRangeChange,
  };
}; 