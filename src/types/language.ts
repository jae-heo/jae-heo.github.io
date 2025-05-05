export interface Language {
  name: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  authorName?: string;
  authorBio?: string;
}

/**
 * Languages configuration
 */
export interface LanguagesConfig {
  available: string[];
  default: string;
  info: {
    [key: string]: Language;
  };
}