'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AdminUser, loginAdmin, getAdminMe, logoutAdmin, ApiError, LoginCredentials } from '../lib/api';

interface AdminAuthContextValue {
  admin: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  refreshAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getAdminMe()
      .then((user) => {
        if (isMounted) {
          setAdmin(user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setAdmin(null);
          if (err instanceof ApiError) {
            setError(err.message);
          } else {
            setError('Unable to verify authentication state.');
          }
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      setError(null);
      const user = await getAdminMe();
      setAdmin(user);
    } catch (err) {
      setAdmin(null);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to verify authentication state.');
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const user = await loginAdmin(credentials);
      setAdmin(user);
      return { success: true };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Login failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
      setAdmin(null);
      return { success: true };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Logout failed. Please try again.';
      return { success: false, error: message };
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        error,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
