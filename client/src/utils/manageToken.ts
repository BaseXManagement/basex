// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

// Check if the token is expired
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return true; // Token has expired
    }
    return false; // Token is still valid
  } catch (error) {
    return true; // Invalid token
  }
}

// Remove token from local storage
export function removeToken(): void {
  localStorage.removeItem('token');
}

// Get token from local storage
export function getToken(): string | null {
  return localStorage.getItem('token');
}

// Set token in local storage
export function setToken(token: string): void {
  localStorage.setItem('token', token);
}
