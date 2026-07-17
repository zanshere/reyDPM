"use client"

import React, { createContext, useState, useCallback, useEffect } from 'react';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';
const THEME_EVENT = 'vespa-theme-change';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mulai dengan 'light' agar server dan client sama saat hidrasi
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Setelah mounted, baca tema sebenarnya dari DOM
  useEffect(() => {
    setMounted(true);
    const currentTheme = readTheme();
    setTheme(currentTheme);
  }, []);

  // Terapkan tema ke DOM dan broadcast hanya setelah mounted
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
  }, [theme, mounted]);

  // Sinkronisasi antar island (tetap)
  useEffect(() => {
    const handleExternalChange = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      setTheme((prev) => (prev === next ? prev : next));
    };
    window.addEventListener(THEME_EVENT, handleExternalChange);
    return () => window.removeEventListener(THEME_EVENT, handleExternalChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};