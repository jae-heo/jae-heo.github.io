// src/i18n.ts - Enhanced configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
import translationKO from './locales/ko/translation.json';
import translationEN from './locales/en/translation.json';
import blogConfig from './config/blog';

// Initialize i18next
i18n
  // Detect browser language
  .use(LanguageDetector)
  // Initialize react-i18next
  .use(initReactI18next)
  // Initialize i18n
  .init({
    resources: {
      ko: {
        translation: translationKO
      },
      en: {
        translation: translationEN
      }
    },
    fallbackLng: blogConfig.languages.default,
    debug: import.meta.env.DEV, // Debug mode in development
    interpolation: {
      escapeValue: false // React already handles this
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang', // URL parameter (e.g., ?lang=en)
      lookupCookie: 'i18n', // Cookie name
      lookupLocalStorage: 'i18nLanguage',
      caches: ['localStorage', 'cookie']
    },
    react: {
      useSuspense: true,
    }
  });

// Function to change language - can be imported and used anywhere
export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  
  // Save language preference to localStorage
  localStorage.setItem('i18nLanguage', lang);
  
  // Update document dir attribute for RTL languages if needed
  const isRTL = blogConfig.languages.info[lang]?.rtl || false;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
};

// Initialize language direction based on current language
const currentLang = i18n.language;
const isRTL = blogConfig.languages.info[currentLang]?.rtl || false;
document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

export default i18n;