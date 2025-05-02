// src/types/index.ts
// Consolidated type definitions for the blog application

/**
 * Blog post interface
 */
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
  translations?: Record<string, Partial<BlogPost>>;
}

/**
 * Category interface
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

/**
 * Language information interface
 */
export interface Language {
  name: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  authorName?: string;
  authorBio?: string;
}

/**
 * Menu item interface
 */
export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon?: string;
  visible: boolean;
  order: number;
}

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
  languages: {
    available: string[];
    default: string;
    info: Record<string, Language>;
  };
  mainMenu: MenuItem[];
  socialLinks?: SocialLinks;
  features: Features;
}