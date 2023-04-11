import { lazy, Suspense } from 'react';
import { Route, Routes as RRDRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));

export default function Routes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RRDRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </RRDRoutes>
    </Suspense>
  );
}
