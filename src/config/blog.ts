// src/config/blog.ts
import { BlogConfig } from '../types';

/**
 * Blog configuration
 * Central place for all blog settings
 */
const config: BlogConfig = {
  // Basic blog information
  blog: {
    title: "Jae's Blog", 
    description: "Stories about programming", 
    author: "허재영", 
    authorBio: "DES 기반 시뮬레이션 개발을 하고 있습니다.", 
    authorImageUrl: "/images/profile/profile.jpeg",
    copyright: `© ${new Date().getFullYear()} Jae's Tech Blog. All rights reserved.`
  },
  
  // Language configuration
  languages: {
    available: ['ko', 'en'],
    default: 'ko',
    info: {
      ko: {
        name: '한국어',
        flag: '🇰🇷',
        rtl: false,
        dateFormat: 'yyyy년 MM월 dd일',
        authorName: '허재영',
        authorBio: 'DES 기반 시뮬레이션 개발을 하고 있습니다.'
      },
      en: {
        name: 'English',
        flag: '🇬🇧',
        rtl: false,
        dateFormat: 'MMMM d, yyyy',
        authorName: 'Jae-young Heo',
        authorBio: 'Working on DES-based simulation development.'
      }
    }
  },
  
  // Main navigation menu
  mainMenu: [
    { id: 1, name: "home", path: "/", icon: "home", visible: true, order: 1 },
    { id: 2, name: "about", path: "/about", icon: "user", visible: true, order: 2 },
    { id: 3, name: "blog", path: "/blog", icon: "file-text", visible: true, order: 3 },
    { id: 4, name: "portfolio", path: "/portfolio", icon: "briefcase", visible: true, order: 4 },
    { id: 5, name: "contact", path: "/contact", icon: "mail", visible: true, order: 5 }
  ],
  
  // Social media links
  socialLinks: {
    github: "https://github.com/jae-heo",
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username"
  },
  
  // Feature flags
  features: {
    darkMode: true,
    comments: true,
    socialSharing: true,
    postsPerPage: 6
  }
};

export default config;