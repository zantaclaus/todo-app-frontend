import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
