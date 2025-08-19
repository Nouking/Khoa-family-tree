'use client';

import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
}

/**
 * useAuth - Client-side authentication hook
 * 
 * Provides authentication state and user information for permission-based features.
 * Checks for JWT token in cookies and validates authentication status.
 * 
 * Returns:
 * - isAuthenticated: boolean indicating if user is logged in
 * - user: user object with id, username, role (null if not authenticated)
 * - loading: boolean indicating if auth check is in progress
 */
export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for token in cookies (client-side)
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false
          });
          return;
        }

        // Validate token with API
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setAuthState({
            isAuthenticated: true,
            user: userData.user,
            loading: false
          });
        } else {
          // Token is invalid or expired
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkAuthStatus();
  }, []);

  return authState;
};

export default useAuth;