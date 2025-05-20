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
  avatar: string | null;
  setAvatar: (avatar: string) => void;
  clearAvatar: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  clearUserId: () => void;
}

// Load initial state from localStorage
const loadState = () => {
  try {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const avatar = localStorage.getItem('userAvatar');
    const userId = localStorage.getItem('userId');
    return {
      role: role ? parseInt(role) : null,
      name: name || null,
      email: email || null,
      avatar: avatar || null,
      userId: userId || null,
    };
  } catch (error) {
    return { role: null, name: null, email: null, avatar: null, userId: null };
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
  setAvatar: (avatar: string) => {
    localStorage.setItem('userAvatar', avatar);
    set({ avatar });
  },
  clearAvatar: () => {
    localStorage.removeItem('userAvatar');
    set({ avatar: null });
  },
  setUserId: (userId: string) => {
    localStorage.setItem('userId', userId);
    set({ userId });
  },
  clearUserId: () => {
    localStorage.removeItem('userId');
    set({ userId: null });
  },
})); 