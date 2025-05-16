import { useState, useEffect } from 'react';
import { message } from 'antd';
import { userService, User } from '../utils/api';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await userService.getUsers(page, pageSize);
      
      if (Array.isArray(response)) {
        setUsers(response);
        setPagination({
          current: page,
          pageSize: pageSize,
          total: response.length,
        });
      } else if (response.data) {
        setUsers(response.data);
        setPagination({
          current: response.page || page,
          pageSize: response.pageSize || pageSize,
          total: response.total || response.data.length,
        });
      } else {
        setUsers([]);
        message.error('Invalid response format');
      }
    } catch (error) {
      message.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    fetchUsers(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    loading,
    users,
    pagination,
    handleTableChange,
  };
}; 