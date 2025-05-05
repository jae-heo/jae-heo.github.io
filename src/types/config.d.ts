/**
 * Social media links interface
 */
export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

/**
 * Feature toggles interface
 */
export interface Features {
  darkMode: boolean;
  comments: boolean;
  socialSharing: boolean;
  postsPerPage: number;
}

/**
 * Blog configuration interface
 */
export interface BlogConfig {
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
  socialLinks?: SocialLinks;
  features: Features;
}