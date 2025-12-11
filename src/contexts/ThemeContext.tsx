'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to dark
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setThemeState(savedTheme);
      } else {
        // Set dark mode as default
        setThemeState('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      // Remove previous theme classes
      root.classList.remove('light', 'dark');
      
      // Add current theme class
      root.classList.add(theme);
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
  };

  // Always provide the context, even before mounted
  return (
    <ThemeContext.Provider value={value}>
      <div className={mounted ? '' : 'dark'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

