import { create } from 'zustand';

interface UserState {
  role: number | null;
  setRole: (role: number) => void;
  clearRole: () => void;
  name: string | null;
  setName: (name: string) => void;
  clearName: () => void;
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  clearUserId: () => void;
  image_url: string | null;
  setImageUrl: (image_url: string) => void;
  clearImageUrl: () => void;
}

const loadState = () => {
  try {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    const image_url = localStorage.getItem('image_url');
    return {
      role: role ? parseInt(role) : null,
      name: name || null,
      email: email || null,
      userId: userId || null,
      image_url: image_url || null,
    };
  } catch (error) {
    return { role: null, name: null, email: null, userId: null, image_url: null };
  }
};

export const useUserStore = create<UserState>((set) => ({
  ...loadState(),
  setRole: (role: number) => {
    localStorage.setItem('userRole', role.toString());
    set({ role });
  },
  setName: (name: string) => {
    localStorage.setItem('userName', name);
    set({ name });
  },
  clearRole: () => {
    localStorage.removeItem('userRole');
    set({ role: null });
  },
  clearName: () => {
    localStorage.removeItem('userName');
    set({ name: null });
  },
  setEmail: (email: string) => {
    localStorage.setItem('userEmail', email);
    set({ email });
  },
  clearEmail: () => {
    localStorage.removeItem('userEmail');
    set({ email: null });
  },
  setUserId: (userId: string) => {
    localStorage.setItem('userId', userId);
    set({ userId });
  },
  clearUserId: () => {
    localStorage.removeItem('userId');
    set({ userId: null });
  },
  setImageUrl: (image_url: string) => {
    localStorage.setItem('image_url', image_url);
    set({ image_url });
  },
  clearImageUrl: () => {
    localStorage.removeItem('image_url');
    set({ image_url: null });
  },
})); 