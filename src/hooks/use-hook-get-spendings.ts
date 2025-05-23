import { useState, useEffect } from 'react';
import { message } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { Spending, spendingService } from '../utils/api';
import dayjs from 'dayjs';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

interface UseGetSpendingsReturn {
  loading: boolean;
  spendings: Spending[];
  pagination: TablePaginationConfig;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  handleDateRangeChange: (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => void;
}

export const useGetSpendings = (): UseGetSpendingsReturn => {
  const [loading, setLoading] = useState(false);
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchSpendings = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('pageSize', pageSize.toString());
      
      if (dateRange?.[0]) {
        queryParams.append('start_date', dateRange[0].format('YYYY-MM-DD'));
      }
      if (dateRange?.[1]) {
        queryParams.append('end_date', dateRange[1].format('YYYY-MM-DD'));
      }

      const response = await spendingService.getSpendings(page, pageSize, queryParams.toString());
      
      if (Array.isArray(response)) {
        setSpendings(response);
        setPagination({
          current: page,
          pageSize: pageSize,
          total: response.length,
        });
      } else if (response.data) {
        setSpendings(response.data);
        setPagination({
          current: response.page || page,
          pageSize: response.pageSize || pageSize,
          total: response.total || response.data.length,
        });
      } else {
        setSpendings([]);
        message.error('Invalid response format');
      }
    } catch (error) {
      message.error('Failed to fetch spendings');
      console.error('Error fetching spendings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchSpendings(newPagination.current || 1, newPagination.pageSize || 10);
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    setDateRange(dates);
  };

  useEffect(() => {
    fetchSpendings(pagination.current, pagination.pageSize);
  }, [dateRange]);

  return {
    loading,
    spendings,
    pagination,
    handleTableChange,
    handleDateRangeChange,
  };
}; 