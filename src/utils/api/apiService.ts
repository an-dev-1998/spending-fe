import { apiClient } from './config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// Generic type for API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Generic type for paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Common API service class
class ApiService {
  // Generic GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, config);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic POST request
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic PUT request
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(url, data, config);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic PATCH request
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(url, data, config);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling
  private handleError(error: any): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService(); 