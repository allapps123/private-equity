import { create } from 'zustand';
import { UserRole } from '../kinds';

const getRole = (): UserRole => {
  const jwt = localStorage.getItem('jwt');
  if (jwt === 'partner') return 'partner';
  if (jwt === 'lp') return 'lp';
  return 'analyst';
};

interface UserState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>(set => ({
  role: getRole(),
  setRole: (role) => {
    localStorage.setItem('jwt', role);
    set({ role });
  },
})); 