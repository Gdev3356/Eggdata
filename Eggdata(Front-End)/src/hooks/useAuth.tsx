import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';
import type { User, AuthContextType } from '../types/user';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eggData_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (userName: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/users/login', { userName, password });
      
      if (response.data) {
        setUser(response.data);
        localStorage.setItem('eggData_user', JSON.stringify(response.data));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Imperial Database Login Failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eggData_user');
  };

  const canRegister = user?.rank === 'EGG_MASTER' || user?.rank === 'GENERAL';

  return (
    <AuthContext.Provider value={{ user, login, logout, canRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};