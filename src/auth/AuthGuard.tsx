import { PropsWithChildren } from 'react';
import { useAuth } from './useAuth';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}
