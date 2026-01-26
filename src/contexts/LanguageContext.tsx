'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'aze' | 'eng' | 'rus';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('eng'); // Default to English
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved language preference or default to English
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['aze', 'eng', 'rus'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      } else {
        // Set English as default
        setLanguageState('eng');
        localStorage.setItem('language', 'eng');
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Update HTML lang attribute
      document.documentElement.lang = language === 'aze' ? 'az' : language === 'rus' ? 'ru' : 'en';
      
      // Save to localStorage
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

