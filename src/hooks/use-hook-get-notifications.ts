import { useState, useEffect } from 'react';
import { message } from 'antd';
import { apiService } from '../utils/api/apiService';

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Helper function to get read status from localStorage
const getReadStatusFromStorage = (): Record<number, boolean> => {
  try {
    const stored = localStorage.getItem('notificationReadStatus');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Helper function to save read status to localStorage
const saveReadStatusToStorage = (readStatus: Record<number, boolean>) => {
  try {
    localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus));
  } catch (error) {
    console.error('Error saving notification read status:', error);
  }
};

export const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<Notification[]>('/notifications');
      const readStatus = getReadStatusFromStorage();
      
      // Merge API response with stored read status
      const notificationsWithReadStatus = response.map(notification => ({
        ...notification,
        read: readStatus[notification.id] || notification.read
      }));
      
      setNotifications(notificationsWithReadStatus);
      setError(null);
    } catch (error) {
      setError('Failed to fetch notifications');
      message.error('Failed to fetch notifications');
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      await apiService.post(`/notifications/${notificationId}/mark-as-read`);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );

      // Update localStorage
      const readStatus = getReadStatusFromStorage();
      readStatus[notificationId] = true;
      saveReadStatusToStorage(readStatus);
    } catch (error) {
      message.error('Failed to mark notification as read');
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    loading,
    notifications,
    error,
    refetch: fetchNotifications,
    markAsRead,
  };
}; 