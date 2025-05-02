// src/utils/dateFormatter.ts
import { format, Locale } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import config from '../config/blog';

/**
 * Map of language codes to date-fns locale objects
 */
const localeMap: Record<string, Locale> = {
  ko: ko,
  en: enUS
};

/**
 * Get the appropriate date-fns locale based on language code
 */
function getLocale(language: string): Locale {
  return localeMap[language] || enUS;
}

/**
 * Format a date string based on the specified language
 */
export function formatDate(
  dateString: string, 
  customFormat?: string,
  language?: string
): string {
  try {
    const date = new Date(dateString);
    const lang = language || document.documentElement.lang || config.languages.default;
    const locale = getLocale(lang);
    
    // Use custom format or get format from language config
    const dateFormat = customFormat || 
      config.languages.info[lang]?.dateFormat || 
      'MMM d, yyyy';
    
    return format(date, dateFormat, { locale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
}

/**
 * Format a date with relative time (e.g., "2 days ago")
 */
export function formatRelativeDate(
  dateString: string,
  language?: string
): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const lang = language || document.documentElement.lang || config.languages.default;
    
    // Simple relative date formatting
    if (diffInDays === 0) {
      return lang === 'ko' ? '오늘' : 'Today';
    } else if (diffInDays === 1) {
      return lang === 'ko' ? '어제' : 'Yesterday';
    } else if (diffInDays < 7) {
      return lang === 'ko' 
        ? `${diffInDays}일 전` 
        : `${diffInDays} days ago`;
    } else {
      return formatDate(dateString, undefined, lang);
    }
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return dateString;
  }
}