import { useUserStore } from '../store/user';
import { UserRole } from '../kinds';

export function useAuth() {
  const { role, setRole } = useUserStore();
  function canAccess(action: 'crud' | 'approve' | 'read') {
    if (role === 'analyst') return action === 'crud' || action === 'read';
    if (role === 'partner') return action === 'approve' || action === 'read';
    if (role === 'lp') return action === 'read';
    return false;
  }
  return { role, setRole, canAccess };
} 