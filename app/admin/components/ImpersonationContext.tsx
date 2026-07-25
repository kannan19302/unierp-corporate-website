'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ImpersonatedUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

interface ImpersonationContextType {
  impersonatedUser: ImpersonatedUser | null;
  startImpersonation: (user: ImpersonatedUser) => void;
  stopImpersonation: () => void;
}

const ImpersonationContext = createContext<ImpersonationContextType>({
  impersonatedUser: null,
  startImpersonation: () => {},
  stopImpersonation: () => {},
});

export function ImpersonationProvider({ children }: { children: React.ReactNode }) {
  const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('unierp_impersonated_user');
    if (saved) {
      try {
        setImpersonatedUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('unierp_impersonated_user');
      }
    }
  }, []);

  const startImpersonation = (user: ImpersonatedUser) => {
    setImpersonatedUser(user);
    localStorage.setItem('unierp_impersonated_user', JSON.stringify(user));
  };

  const stopImpersonation = () => {
    setImpersonatedUser(null);
    localStorage.removeItem('unierp_impersonated_user');
  };

  return (
    <ImpersonationContext.Provider value={{ impersonatedUser, startImpersonation, stopImpersonation }}>
      {children}
    </ImpersonationContext.Provider>
  );
}

export function useImpersonation() {
  return useContext(ImpersonationContext);
}
