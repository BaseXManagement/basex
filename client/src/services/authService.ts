import { v4 as uuidv4 } from 'uuid';

const mockUser = {
    id: '1',
    email: 'admin@eu.com',
    password: 'admin',
  };
  
  let currentUser = null;
  
  export const authService = {
    login: async (email: string, password: string) => {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email === mockUser.email && password === mockUser.password) {
        currentUser = { id: mockUser.id, email: mockUser.email };
        localStorage.setItem('user', JSON.stringify(currentUser));
        return currentUser;
      } else {
        throw new Error('Invalid email or password');
      }
    },
    logout: () => {
      currentUser = null;
      localStorage.removeItem('user');
    },
    register: async (email: string, password: string) => {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      currentUser = { id: uuidv4(), email, password };
      localStorage.setItem('user', JSON.stringify(currentUser));
      return currentUser;
    },
  };
  