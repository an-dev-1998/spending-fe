import { api } from './api';
import { Spending, CreateSpendingDto, UpdateSpendingDto, SpendingFilters } from '../types/spending';

export const spendingService = {
  getAll: async (filters?: SpendingFilters) => {
    const { data } = await api.get<Spending[]>('/spendings', { params: filters });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Spending>(`/spendings/${id}`);
    return data;
  },

  create: async (spending: CreateSpendingDto) => {
    const { data } = await api.post<Spending>('/spendings', spending);
    return data;
  },

  update: async (id: string, spending: UpdateSpendingDto) => {
    const { data } = await api.patch<Spending>(`/spendings/${id}`, spending);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/spendings/${id}`);
  },

  getStats: async (filters?: SpendingFilters) => {
    const { data } = await api.get('/spendings/stats', { params: filters });
    return data;
  },
}; 