import AuthGuard from '@/auth/AuthGuard';
import GuestGuard from '@/auth/GuestGuard';
import { LoadingScreen } from '@/components/loading';
import { lazy, Suspense } from 'react';
import { Route, Routes as RRDRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));

export default function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RRDRoutes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/signin"
          element={
            <GuestGuard>
              <Signin />
            </GuestGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestGuard>
              <Signup />
            </GuestGuard>
          }
        />
      </RRDRoutes>
    </Suspense>
  );
}
