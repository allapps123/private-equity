import { create } from 'zustand';
import { UserRole } from '../kinds';

const getRole = (): UserRole => {
  const jwt = localStorage.getItem('jwt');
  if (jwt === 'partner') return 'partner';
  if (jwt === 'lp') return 'lp';
  return 'analyst';
};

const getIsAuthenticated = (): boolean => {
  const jwt = localStorage.getItem('jwt');
  return jwt !== null && jwt !== '';
};

interface UserState {
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>(set => ({
  role: getRole(),
  isAuthenticated: getIsAuthenticated(),
  setRole: (role) => {
    localStorage.setItem('jwt', role);
    set({ role, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('jwt');
    set({ role: 'analyst', isAuthenticated: false });
  },
})); 