// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from '../config/blog';

// Import language resources
import translationEN from './locales/en.json';
import translationKO from './locales/ko.json';

/**
 * Initialize i18next
 */
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Configure i18n
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      ko: {
        translation: translationKO
      }
    },
    fallbackLng: config.languages.default,
    debug: import.meta.env.DEV, // Debug only in development
    
    // Detection options
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'language',
      caches: ['localStorage']
    },
    
    interpolation: {
      escapeValue: false // React handles escaping
    },
    
    react: {
      useSuspense: true
    }
  });

/**
 * Change application language
 */
export function changeLanguage(lang: string): void {
  // Change i18n language
  i18n.changeLanguage(lang);
  
  // Save to localStorage
  localStorage.setItem('language', lang);
  
  // Set RTL attribute if needed
  const isRTL = config.languages.info[lang]?.rtl || false;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  
  // Set language attribute on HTML element
  document.documentElement.lang = lang;
}

// Set initial language direction
const currentLang = i18n.language;
const isRTL = config.languages.info[currentLang]?.rtl || false;
document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

export default i18n;