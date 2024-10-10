import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { token, logout } = useAuthStore((state) => ({
    token: state.token,
    logout: state.logout,
  }));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      useAuthStore.setState({ token: JSON.parse(storedToken) });
    }
  }, []);

  return { token, logout };
};
