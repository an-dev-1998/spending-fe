import { api } from './api';
import { Spending, CreateSpendingDto, UpdateSpendingDto, SpendingFilters } from '../types/spending';

export const spendingService = {
  // Get all spendings with optional filters
  getAll: async (filters?: SpendingFilters) => {
    const { data } = await api.get<Spending[]>('/spendings', { params: filters });
    return data;
  },

  // Get a single spending by ID
  getById: async (id: string) => {
    const { data } = await api.get<Spending>(`/spendings/${id}`);
    return data;
  },

  // Create a new spending
  create: async (spending: CreateSpendingDto) => {
    const { data } = await api.post<Spending>('/spendings', spending);
    return data;
  },

  // Update an existing spending
  update: async (id: string, spending: UpdateSpendingDto) => {
    const { data } = await api.patch<Spending>(`/spendings/${id}`, spending);
    return data;
  },

  // Delete a spending
  delete: async (id: string) => {
    await api.delete(`/spendings/${id}`);
  },

  // Get spending statistics
  getStats: async (filters?: SpendingFilters) => {
    const { data } = await api.get('/spendings/stats', { params: filters });
    return data;
  },
}; 