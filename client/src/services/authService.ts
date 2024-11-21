import { getToken, isTokenExpired, removeToken, setToken } from '../utils/manageToken';

const JAVA_API = process.env.REACT_APP_JAVA_API;
// const NODE_API = process.env.REACT_APP_NODE_API;


export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${JAVA_API}/auth/login`, { 
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
    setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },

  register: async (email: string, password: string) => {
    const response = await fetch(`${JAVA_API}/auth/register`, {
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
    setToken(data.token);
    return data;
  },

  getToken: () => {
    return getToken();
  },

  isAuthenticated: () => {
    const token = getToken();
    if (!token) return false;
    return !isTokenExpired(token);
  },
};
