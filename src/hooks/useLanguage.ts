import { useState, useEffect } from 'react';

const supportedLanguages = ['en', 'fr', 'es', 'tr', 'it', 'de', 'ru', 'zh', 'ja'];

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && supportedLanguages.includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  return { language, changeLanguage };
};
