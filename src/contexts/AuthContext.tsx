'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  subscription_plan: string;
  is_email_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    company_name?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Clear invalid tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔵 Attempting login with:', { email, backendUrl: 'http://127.0.0.1:8000/api' });
      const response = await authAPI.login(email, password);
      console.log('✅ Login successful:', response.data);
      
      const { access, refresh, user: userData } = response.data;

      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Set user data
      setUser(userData);
    } catch (error: any) {
      // Log the full error for debugging
      console.error('🔴 Login Error Details:', {
        hasError: !!error,
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message,
        code: error?.code,
        isAxiosError: error?.isAxiosError,
        config: {
          url: error?.config?.url,
          method: error?.config?.method,
          baseURL: error?.config?.baseURL
        },
        fullError: error,
        errorString: String(error),
        errorKeys: Object.keys(error || {})
      });
      
      // Check if backend is unreachable
      if (!error.response && (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error'))) {
        throw new Error('Backend server-ə qoşula bilmir. Zəhmət olmasa backend server-in işlədiyindən əmin olun (python manage.py runserver)');
      }
      
      // Check if CORS error
      if (error.message?.includes('CORS') || error.message?.includes('cross-origin')) {
        throw new Error('CORS xətası. Backend konfiqurasiyasını yoxlayın.');
      }
      
      // Pass through the full error response for better error handling
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          error.response?.data?.error ||
                          // Check if it's validation errors (DRF format)
                          (error.response?.data?.email?.[0]) ||
                          (error.response?.data?.password?.[0]) ||
                          (error.response?.data?.non_field_errors?.[0]) ||
                          error.message || 
                          'Login xətası baş verdi. Zəhmət olmasa yenidən cəhd edin.';
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    company_name?: string;
  }) => {
    try {
      const response = await authAPI.register(userData);
      const { access, refresh, user: newUser } = response.data;

      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Set user data
      setUser(newUser);
    } catch (error: any) {
      // Pass through detailed error messages
      const errorDetail = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         error.response?.data?.error ||
                         error.message || 
                         'Registration failed';
      throw new Error(errorDetail);
    }
  };

  const logout = () => {
    // Clear tokens and user data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);

    // Optional: Call logout endpoint to invalidate tokens on server
    authAPI.logout().catch(() => {
      // Ignore errors on logout
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};





