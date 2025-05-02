// src/config/blog.ts
import type { BlogConfig } from '../types/config';

const blogConfig: BlogConfig = {
  // Basic blog information with language-specific overrides in i18n files
  blog: {
    title: "Jae's Blog", // Default fallback title
    description: "Stories about programming", // Default fallback description
    author: "허재영", // Author name (will be shown in UI based on language)
    authorBio: "DES 기반 시뮬레이션 개발을 하고 있습니다.", // Default bio (will use i18n)
    authorImageUrl: "/images/profile/profile.jpeg",
    copyright: `© ${new Date().getFullYear()} Jae's Tech Blog. All rights reserved.`
  },
  
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
        dateFormat: 'MMMM d, yyyy', // English date format
        authorName: 'Jae-young Heo', // English name spelling
        authorBio: 'Working on DES-based simulation development.'
      }
    }
  },
  
  mainMenu: [
    { id: 1, name: "home", path: "/", icon: "home", visible: true, order: 1 },
    { id: 2, name: "about", path: "/about", icon: "user", visible: true, order: 2 },
    { id: 3, name: "blog", path: "/blog", icon: "file-text", visible: true, order: 3 },
    { id: 4, name: "portfolio", path: "/portfolio", icon: "briefcase", visible: true, order: 4 },
    { id: 5, name: "contact", path: "/contact", icon: "mail", visible: true, order: 5 }
  ],
  
  socialMedia: {
    github: "https://github.com/jae-heo",
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username"
  },
  
  // Features configuration
  features: {
    enableComments: true,
    enableSocialSharing: true,
    enableDarkMode: true,
    enableSubscription: true,
    postsPerPage: 5
  }
};

export default blogConfig;