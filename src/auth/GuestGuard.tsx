import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { PropsWithChildren } from 'react';

export default function GuestGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
