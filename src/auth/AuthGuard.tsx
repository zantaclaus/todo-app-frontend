import { PropsWithChildren } from 'react';
import { useAuth } from './useAuth';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '@/components/loading';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}
