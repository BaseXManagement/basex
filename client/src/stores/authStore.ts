import { create } from 'zustand';
import { authService } from '../services/authService';

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'), // Initialize token from local storage 

  login: async (email: string, password: string) => {
    try {
      const { token } = await authService.login(email, password);
      set({ token });
      localStorage.setItem('token', token); // Store the token in local storage
    } catch (error) {
      console.error('Login failed:', error);
      set({ token: null });
      localStorage.removeItem('token');
      throw error;  // Ensure the error is re-thrown so it can be caught in the component
    }
  },

  logout: () => {
    authService.logout();
    set({ token: null });
    localStorage.removeItem('token');
  },

  register: async (email: string, password: string) => {
    try {
      const { token } = await authService.register(email, password);
      set({ token });
      localStorage.setItem('token', token); // Store the token in local storage
    } catch (error) {
      console.error('Registration failed:', error);
      set({ token: null });
      localStorage.removeItem('token');
      throw error;  // Ensure the error is re-thrown so it can be caught in the component
    }
  },
}));

