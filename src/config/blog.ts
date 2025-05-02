// src/config/blog.ts
import type { BlogConfig } from '../types/config';

const blogConfig: BlogConfig = {
  // 블로그 기본 정보
  blog: {
    title: "My Tech Blog",
    description: "프로그래밍, 웹 개발, 그리고 기술에 관한 이야기",
    author: "홍길동",
    authorBio: "프론트엔드 개발자이자 블로거. React와 JavaScript에 관심이 많으며 개발 경험을 공유하고 있습니다.",
    authorImageUrl: "/placeholder-profile.jpg",
    copyright: `© ${new Date().getFullYear()} My Tech Blog. All rights reserved.`
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