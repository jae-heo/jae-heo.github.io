// src/utils/dateFormatter.ts
import { format, Locale } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import blogConfig from '../config/blog';
import i18n from '../i18n';

/**
 * Get the appropriate date-fns locale object based on language code
 */
const getLocale = (language: string): Locale => {
  switch (language) {
    case 'ko':
      return ko;
    case 'en':
    default:
      return enUS;
  }
};

/**
 * Format a date string based on the current language
 */
export const formatDate = (dateString: string, customFormat?: string): string => {
  try {
    const date = new Date(dateString);
    const language = i18n.language;
    const locale = getLocale(language);
    
    // Use custom format or get format from language config
    const dateFormat = customFormat || 
      blogConfig.languages.info[language]?.dateFormat || 
      (language === 'ko' ? 'yyyy년 MM월 dd일' : 'MMMM d, yyyy');
    
    return format(date, dateFormat, { locale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if parsing fails
  }
};

/**
 * Format a date with relative time (e.g., "2 days ago")
 * This could be extended with a library like date-fns/formatDistance
 */
export const formatRelativeDate = (dateString: string): string => {
  // Basic implementation - could be enhanced with formatDistance from date-fns
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return i18n.language === 'ko' ? '오늘' : 'Today';
    } else if (diffInDays === 1) {
      return i18n.language === 'ko' ? '어제' : 'Yesterday';
    } else if (diffInDays < 7) {
      return i18n.language === 'ko' 
        ? `${diffInDays}일 전` 
        : `${diffInDays} days ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return dateString;
  }
};

export default {
  formatDate,
  formatRelativeDate
};