import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  setUser: (user: User) => void;
}

const defaultUsers: Record<UserRole, User> = {
  inspector: {
    id: "usr_inspector_1",
    name: "Rajesh Kumar, LMO",
    email: "inspector@lm.gov.in",
    role: "inspector",
    designation: "Legal Metrology Officer, District Central Delhi",
    badgeNumber: "DL-LM-4402"
  },
  manufacturer: {
    id: "usr_mfg_1",
    name: "Vikram Singhania",
    email: "mfg@shantiagro.in",
    role: "manufacturer",
    company: "Shanti Agro Foods Pvt. Ltd.",
    designation: "Head of Packaging & Regulatory Affairs"
  },
  admin: {
    id: "usr_admin_1",
    name: "Dr. Ananya Sharma",
    email: "admin@lm.nic.in",
    role: "admin",
    designation: "Director General, Legal Metrology Division"
  },
  consumer: {
    id: "usr_consumer_1",
    name: "Pooja Verma",
    email: "consumer@example.com",
    role: "consumer",
    designation: "Verified Citizen Consumer"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUsers.inspector);

  const switchRole = (role: UserRole) => {
    setCurrentUser(defaultUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, setUser: setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
