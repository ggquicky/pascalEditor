import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ id: string, email: string, name: string } | null>({
    id: 'mock-user-id',
    email: 'mock@example.com',
    name: 'Mock User',
  });
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading: false,
    signOut: async () => setUser(null),
  };
}
