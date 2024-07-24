import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      useAuthStore.setState({ user: JSON.parse(storedUser) });
    }
  }, []);

  return { user, logout };
};
