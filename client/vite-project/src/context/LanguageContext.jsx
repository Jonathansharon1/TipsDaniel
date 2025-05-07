import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    return value ?? key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { useLanguage }; 