import { create } from 'zustand';

interface UserState {
  role: number | null;
  setRole: (role: number) => void;
  clearRole: () => void;
  name: string | null;
  setName: (name: string) => void;
  clearName: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: null,
  name: null,
  setRole: (role: number) => set({ role }),
  setName: (name: string) => set({ name }),
  clearRole: () => set({ role: null }),
  clearName: () => set({ name: null }),
})); 