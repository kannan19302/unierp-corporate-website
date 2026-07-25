'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = '#2563eb' | '#059669' | '#4f46e5' | '#d97706' | '#e11d48' | '#0891b2';
export type Density = 'ultra' | 'compact' | 'comfortable';

interface ConsolePreferences {
  accentColor: AccentColor;
  density: Density;
  toastDuration: number;
  toastPosition: 'top-right' | 'top-left' | 'bottom-right';
  toastSound: boolean;
  defaultLanding: string;
  tableRowsPerPage: number;
}

const DEFAULTS: ConsolePreferences = {
  accentColor: '#2563eb',
  density: 'compact',
  toastDuration: 4000,
  toastPosition: 'top-right',
  toastSound: true,
  defaultLanding: '/admin',
  tableRowsPerPage: 25,
};

interface ConsoleThemeContextType {
  prefs: ConsolePreferences;
  updatePrefs: (patch: Partial<ConsolePreferences>) => void;
  resetPrefs: () => void;
}

const ConsoleThemeContext = createContext<ConsoleThemeContextType>({
  prefs: DEFAULTS,
  updatePrefs: () => {},
  resetPrefs: () => {},
});

export function ConsoleThemeProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<ConsolePreferences>(DEFAULTS);

  useEffect(() => {
    const saved = localStorage.getItem('unierp_console_prefs');
    if (saved) {
      try {
        setPrefs({ ...DEFAULTS, ...JSON.parse(saved) });
      } catch (e) {
        // fallback
      }
    }
  }, []);

  useEffect(() => {
    // Apply primary accent color to CSS root variables
    document.documentElement.style.setProperty('--color-primary', prefs.accentColor);

    // Apply layout geometry density
    if (prefs.density === 'ultra') {
      document.documentElement.style.setProperty('--sidebar-width', '220px');
      document.documentElement.style.setProperty('--header-height', '44px');
    } else if (prefs.density === 'comfortable') {
      document.documentElement.style.setProperty('--sidebar-width', '260px');
      document.documentElement.style.setProperty('--header-height', '54px');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '240px');
      document.documentElement.style.setProperty('--header-height', '48px');
    }
  }, [prefs]);

  const updatePrefs = (patch: Partial<ConsolePreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem('unierp_console_prefs', JSON.stringify(next));
      return next;
    });
  };

  const resetPrefs = () => {
    setPrefs(DEFAULTS);
    localStorage.removeItem('unierp_console_prefs');
  };

  return (
    <ConsoleThemeContext.Provider value={{ prefs, updatePrefs, resetPrefs }}>
      {children}
    </ConsoleThemeContext.Provider>
  );
}

export function useConsoleTheme() {
  return useContext(ConsoleThemeContext);
}
