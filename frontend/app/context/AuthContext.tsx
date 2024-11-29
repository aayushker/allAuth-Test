'use client';
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login/', { email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('/api/auth/logout/');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
