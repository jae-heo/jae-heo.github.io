// src/types/config.d.ts

// Define language info structure
interface LanguageInfo {
  name: string;
  flag: string;
  rtl: boolean;
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
  name: string;
  path: string;
  icon: string;
  visible: boolean;
  order: number;
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
  features: Features;
}

// Export the types for use in other files
export type { 
  BlogConfig, 
  LanguagesConfig, 
  LanguageInfo, 
  MenuItem, 
  Features 
};