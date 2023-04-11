import { useAuth } from '@/auth/useAuth';
import React from 'react';

export default function Home() {
  const { signOut } = useAuth();

  return (
    <div>
      <button onClick={signOut}>logout</button>
    </div>
  );
}
