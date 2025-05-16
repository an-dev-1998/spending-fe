import { useState, useEffect } from 'react';
import { message } from 'antd';
import { spendingService, Spending } from '../utils/api';
import type { TablePaginationConfig } from 'antd/es/table';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

export const useGetSpendings = () => {
  const [loading, setLoading] = useState(false);
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchSpendings = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await spendingService.getSpendings(page, pageSize);
      
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

  useEffect(() => {
    fetchSpendings();
  }, []);

  return {
    loading,
    spendings,
    pagination,
    handleTableChange,
  };
}; 