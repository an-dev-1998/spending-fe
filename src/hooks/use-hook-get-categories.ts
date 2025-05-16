import { useState, useEffect } from 'react';
import { message } from 'antd';
import { categoryService, Category } from '../utils/api';
import type { TablePaginationConfig } from 'antd/es/table';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

export const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await categoryService.getCategories(page, pageSize);
      
      if (Array.isArray(response)) {
        setCategories(response);
        setPagination({
          current: page,
          pageSize: pageSize,
          total: response.length,
        });
      } else if (response.data) {
        setCategories(response.data);
        setPagination({
          current: response.page || page,
          pageSize: response.pageSize || pageSize,
          total: response.total || response.data.length,
        });
      } else {
        setCategories([]);
        message.error('Invalid response format');
      }
    } catch (error) {
      message.error('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchCategories(newPagination.current || 1, newPagination.pageSize || 10);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    loading,
    categories,
    pagination,
    handleTableChange,
  };
}; 