import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, LanguageOption } from './types';
import { tr } from './languages/tr';
import { en } from './languages/en';
import { de } from './languages/de';
import { fr } from './languages/fr';
import { es } from './languages/es';
import { it } from './languages/it';
import { ar } from './languages/ar';
import { ko } from './languages/ko';
import { ja } from './languages/ja';
import { ru } from './languages/ru';
import { pt } from './languages/pt';
import { nl } from './languages/nl';

export * from './types';

export const supportedLanguages: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'pt', name: 'Português', nativeName: 'Português (BR)', flag: '🇧🇷', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
];

export const translations: Record<Language, Translations> = {
  tr,
  en,
  de,
  fr,
  es,
  it,
  ar,
  ko,
  ja,
  ru,
  pt,
  nl,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: LanguageOption[];
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  languages: supportedLanguages,
  t: translations.tr,
});

const VALID_LANGS: Language[] = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ar', 'ko', 'ja', 'ru', 'pt', 'nl'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('synaps_lang') as Language;
      if (saved && VALID_LANGS.includes(saved)) {
        return saved;
      }
    }
    return 'tr'; // Default is Turkish
  });

  const setLanguage = (lang: Language) => {
    if (!VALID_LANGS.includes(lang)) return;
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('synaps_lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = translations[language] || translations.tr;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: supportedLanguages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
