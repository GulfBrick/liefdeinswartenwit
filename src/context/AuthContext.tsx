'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Guest } from '@/lib/auth';

interface AuthContextType {
  guest: Guest | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      try {
        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!response.ok) {
          if (!cancelled) setGuest(null);
          return;
        }

        const data = (await response.json()) as { guest: Guest };
        if (!cancelled) {
          setGuest(data.guest);
        }
      } catch {
        if (!cancelled) setGuest(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = (await response.json().catch(() => null)) as {
        guest?: Guest;
        error?: string;
      } | null;

      if (!response.ok || !data?.guest) {
        return {
          success: false,
          error: data?.error || 'We could not verify that invitation code. Please try again.',
        };
      }

      setGuest(data.guest);
      setShowSplash(true);

      return { success: true };
    } catch {
      return {
        success: false,
        error: 'Something went wrong while verifying your invitation. Please try again.',
      };
    }
  };

  const logout = () => {
    void fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    setGuest(null);
    setShowSplash(false);
  };

  return (
    <AuthContext.Provider
      value={{
        guest,
        isAuthenticated: !!guest,
        isLoading,
        login,
        logout,
        showSplash,
        setShowSplash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
