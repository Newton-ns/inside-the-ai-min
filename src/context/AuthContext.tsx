import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setUser: (user: User) => void;
}

const defaultUsers: Record<UserRole, User> = {
  inspector: { id: 'usr_inspector_1', name: 'Rajesh Kumar, LMO', email: 'inspector@lm.gov.in', role: 'inspector', designation: 'Legal Metrology Officer, District Central Delhi', badgeNumber: 'DL-LM-4402' },
  manufacturer: { id: 'usr_mfg_1', name: 'Vikram Singhania', email: 'mfg@shantiagro.in', role: 'manufacturer', company: 'Shanti Agro Foods Pvt. Ltd.', designation: 'Head of Packaging & Regulatory Affairs' },
  admin: { id: 'usr_admin_1', name: 'Dr. Ananya Sharma', email: 'admin@lm.nic.in', role: 'admin', designation: 'Director General, Legal Metrology Division' },
  consumer: { id: 'usr_consumer_1', name: 'Pooja Verma', email: 'consumer@example.com', role: 'consumer', designation: 'Verified Citizen Consumer' }
};

const DEMO_PASSWORD = 'demo123';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedRole = localStorage.getItem('legalmetrology-role') as UserRole | null;
      return savedRole && defaultUsers[savedRole] ? defaultUsers[savedRole] : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, password: string, role: UserRole) => {
    const user = defaultUsers[role];
    const success = !!user && user.email.toLowerCase() === email.toLowerCase() && password === DEMO_PASSWORD;
    if (success) {
      setCurrentUser(user);
      try { localStorage.setItem('legalmetrology-role', role); } catch {}
    }
    return success;
  };

  const logout = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('legalmetrology-role'); } catch {}
  };

  const switchRole = (role: UserRole) => {
    const user = defaultUsers[role];
    setCurrentUser(user);
    try { localStorage.setItem('legalmetrology-role', role); } catch {}
  };

  return <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, switchRole, setUser: setCurrentUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
