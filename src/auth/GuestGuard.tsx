import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { PropsWithChildren } from 'react';
import { LoadingScreen } from '@/components/loading';

export default function GuestGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
