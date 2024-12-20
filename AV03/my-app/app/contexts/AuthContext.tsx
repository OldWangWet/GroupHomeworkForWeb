'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { login as apiLogin, register as apiRegister } from '../api/mockApi';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (username: string, password: string) => Promise<User | null>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await apiLogin(username, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    }
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const register = async (username: string, password: string) => {
    const registeredUser = await apiRegister(username, password);
    if (registeredUser) {
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
    }
    return registeredUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

