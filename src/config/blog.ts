// src/config/blog.ts
import type { BlogConfig } from '../types/config';

const blogConfig: BlogConfig = {
  // 블로그 기본 정보
  blog: {
    title: "Jae's Blog",
    description: "개발과 일상",
    author: "허재영",
    authorBio: "DES 기반 시뮬레이션 개발을 하고 있습니다.",
    authorImageUrl: "/images/profile/profile.jpeg",
    copyright: `© ${new Date().getFullYear()} Jae's Tech Blog. All rights reserved.`
  },
  
  // 다국어 설정
  languages: {
    available: ['ko', 'en'],
    default: 'ko',
    // 각 언어별 정보
    info: {
      ko: {
        name: '한국어',
        flag: '🇰🇷',
        rtl: false
      },
      en: {
        name: 'English',
        flag: '🇬🇧',
        rtl: false
      }
    }
  },
  
  // 메인 메뉴 항목
  mainMenu: [
    { id: 1, name: "홈", path: "/", icon: "home", visible: true, order: 1 },
    { id: 2, name: "소개", path: "/about", icon: "user", visible: true, order: 2 },
    { id: 3, name: "포트폴리오", path: "/portfolio", icon: "briefcase", visible: true, order: 3 },
    { id: 4, name: "연락처", path: "/contact", icon: "mail", visible: true, order: 4 }
  ],
  
  // 기능 설정
  features: {
    enableComments: true,
    enableSocialSharing: true,
    enableDarkMode: true,
    enableSubscription: true,
    postsPerPage: 5
  }
};

export default blogConfig;