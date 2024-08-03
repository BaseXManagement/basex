import { getToken, isTokenExpired, removeToken, setToken } from '../utils/manageToken';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await response.json();
    setToken(data.token); // Store the token using the utility function
    return data;
  },

  logout: () => {
    removeToken(); // Remove the token using the utility function
  },

  register: async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    setToken(data.token); // Store the token using the utility function
    return data;
  },

  getToken: () => {
    return getToken(); // Retrieve the token using the utility function
  },

  isAuthenticated: () => {
    const token = getToken();
    if (!token) return false;
    return !isTokenExpired(token); // Check token validity
  },
};
