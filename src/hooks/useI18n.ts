// src/hooks/useI18n.ts
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import config from '../config/blog';
import { formatDate } from '../utils/dateFormatter';
import { changeLanguage } from '../i18n';

/**
 * Custom hook that extends react-i18next with blog-specific i18n utilities
 */
export function useI18n() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  /**
   * Get localized author name based on current language
   */
  const getLocalizedAuthorName = useCallback((authorName: string = config.blog.author) => {
    // If author is the blog owner, use localized name
    if (authorName === config.blog.author) {
      return config.languages.info[currentLang]?.authorName || authorName;
    }
    
    return authorName;
  }, [currentLang]);

  /**
   * Format date according to current language format
   */
  const formatLocalizedDate = useCallback((dateString: string, customFormat?: string) => {
    return formatDate(dateString, customFormat, currentLang);
  }, [currentLang]);

  /**
   * Check if current language is RTL
   */
  const isRTL = useCallback(() => {
    return config.languages.info[currentLang]?.rtl || false;
  }, [currentLang]);

  /**
   * Switch language with proper side effects
   */
  const switchLanguage = useCallback((lang: string) => {
    changeLanguage(lang);
  }, []);

  /**
   * Get page title with site name
   */
  const getPageTitle = useCallback((titleKey: string, params?: Record<string, any>) => {
    const title = t(titleKey, params);
    return t('meta.pageTitle', { title });
  }, [t]);

  return {
    // Original react-i18next values
    t,
    i18n,
    
    // Extended functionality
    currentLang,
    getLocalizedAuthorName,
    formatLocalizedDate,
    isRTL,
    switchLanguage,
    getPageTitle,
    
    // Language info
    languages: config.languages
  };
}

export default useI18n;