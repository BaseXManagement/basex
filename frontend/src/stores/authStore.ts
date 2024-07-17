import create from 'zustand';
import { authService } from '../services/authService';

interface AuthState {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  login: async (email, password) => {
    const user = await authService.login(email, password);
    set({ user });
  },
  logout: () => {
    authService.logout();
    set({ user: null });
  },
  register: async (email, password) => {
    const user = await authService.register(email, password);
    set({ user });
  },
}));
