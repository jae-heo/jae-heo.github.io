import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 언어 리소스 파일들
import translationKO from './locales/ko/translation.json';
import translationEN from './locales/en/translation.json';

// 언어 리소스
const resources = {
  ko: {
    translation: translationKO
  },
  en: {
    translation: translationEN
  }
};

i18n
  // 브라우저의 언어 감지
  .use(LanguageDetector)
  // react-i18next 초기화
  .use(initReactI18next)
  // i18n 초기화
  .init({
    resources,
    fallbackLng: 'ko', // 기본 언어
    debug: import.meta.env.DEV, // 개발 환경에서만 디버그 모드 활성화
    interpolation: {
      escapeValue: false // XSS 방지를 위한 이스케이프 비활성화 (React에서는 기본적으로 처리함)
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang', // URL에서 언어 파라미터 (예: ?lang=en)
      lookupCookie: 'i18n', // 쿠키에 저장될 이름
      lookupLocalStorage: 'i18nLanguage',
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;