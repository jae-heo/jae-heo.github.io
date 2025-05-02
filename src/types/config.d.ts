// src/types/config.d.ts

// Define language info structure with extended properties
interface LanguageInfo {
  name: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  authorName?: string;
  authorBio?: string;
}

// Define languages configuration
interface LanguagesConfig {
  available: string[];
  default: string;
  info: {
    [key: string]: LanguageInfo;
  };
}

// Define menu item
interface MenuItem {
  id: number;
  name: string; // This is the i18n key for translation
  path: string;
  icon: string;
  visible: boolean;
  order: number;
}

// Social media links
interface SocialMediaLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

// Define features
interface Features {
  enableComments: boolean;
  enableSocialSharing: boolean;
  enableDarkMode: boolean;
  enableSubscription: boolean;
  postsPerPage: number;
}

// Define blog config
interface BlogConfig {
  blog: {
    title: string;
    description: string;
    author: string;
    authorBio: string;
    authorImageUrl: string;
    copyright: string;
  };
  languages: LanguagesConfig;
  mainMenu: MenuItem[];
  socialMedia?: SocialMediaLinks;
  features: Features;
}

// Export the types for use in other files
export type { 
  BlogConfig, 
  LanguagesConfig, 
  LanguageInfo, 
  MenuItem, 
  Features,
  SocialMediaLinks
};