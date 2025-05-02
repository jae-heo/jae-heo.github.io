// src/config.js
const blogConfig = {
  // 블로그 기본 정보
  blog: {
    title: "My Tech Blog",
    description: "프로그래밍, 웹 개발, 그리고 기술에 관한 이야기",
    author: "홍길동",
    authorBio: "프론트엔드 개발자이자 블로거. React와 JavaScript에 관심이 많으며 개발 경험을 공유하고 있습니다.",
    authorImageUrl: "/api/placeholder/100/100",
    copyright: `© ${new Date().getFullYear()} My Tech Blog. All rights reserved.`
  },
  
  // 사이드바 구성 (섹션 및 항목 관리)
  sidebar: {
    // 사이드바 섹션 설정
    sections: [
      {
        id: "menu",
        title: "메뉴",
        type: "menu",
        order: 1,
        visible: true
      },
      {
        id: "categories",
        title: "카테고리",
        type: "categories",
        order: 2,
        visible: true
      },
      {
        id: "recent-posts",
        title: "최근 포스트",
        type: "recent-posts",
        order: 3,
        visible: true,
        count: 3 // 표시할 최근 포스트 수
      },
      {
        id: "tags",
        title: "태그 클라우드",
        type: "tags",
        order: 4,
        visible: true,
        count: 10 // 표시할 태그 수
      },
      {
        id: "social",
        title: "소셜 미디어",
        type: "social",
        order: 5,
        visible: true
      },
      {
        id: "archives",
        title: "아카이브",
        type: "archives",
        order: 6,
        visible: true
      }
    ],
    
    // 사이드바 표시 설정
    display: {
      showProfile: true,
      showCategories: true,
      showRecentPosts: true,
      showSocialLinks: true,
      showTags: true,
      showArchives: true
    }
  },
  
  // 메인 메뉴 항목
  mainMenu: [
    { id: 1, name: "홈", path: "/", icon: "home", visible: true, order: 1 },
    { id: 2, name: "소개", path: "/about", icon: "user", visible: true, order: 2 },
    { id: 3, name: "포트폴리오", path: "/portfolio", icon: "briefcase", visible: true, order: 3 },
    { id: 4, name: "연락처", path: "/contact", icon: "mail", visible: true, order: 4 }
  ],
  
  // 카테고리 목록
  categories: [
    { 
      id: 1, 
      name: "프로그래밍", 
      path: "/category/programming", 
      slug: "programming", 
      icon: "code", 
      description: "프로그래밍 관련 포스트",
      visible: true,
      order: 1,
      subCategories: [
        { id: 101, name: "자바스크립트", path: "/category/programming/javascript", slug: "javascript", visible: true, order: 1 },
        { id: 102, name: "리액트", path: "/category/programming/react", slug: "react", visible: true, order: 2 },
        { id: 103, name: "노드JS", path: "/category/programming/nodejs", slug: "nodejs", visible: true, order: 3 }
      ]
    },
    { 
      id: 2, 
      name: "웹 개발", 
      path: "/category/web-dev", 
      slug: "web-dev", 
      icon: "globe", 
      description: "웹 개발 관련 포스트",
      visible: true,
      order: 2,
      subCategories: [
        { id: 201, name: "프론트엔드", path: "/category/web-dev/frontend", slug: "frontend", visible: true, order: 1 },
        { id: 202, name: "백엔드", path: "/category/web-dev/backend", slug: "backend", visible: true, order: 2 },
        { id: 203, name: "데브옵스", path: "/category/web-dev/devops", slug: "devops", visible: true, order: 3 }
      ]
    },
    { 
      id: 3, 
      name: "알고리즘", 
      path: "/category/algorithm", 
      slug: "algorithm", 
      icon: "cpu", 
      description: "알고리즘 관련 포스트",
      visible: true,
      order: 3,
      subCategories: []
    },
    { 
      id: 4, 
      name: "생산성", 
      path: "/category/productivity", 
      slug: "productivity", 
      icon: "clock", 
      description: "생산성 향상 관련 포스트",
      visible: true,
      order: 4,
      subCategories: []
    },
    { 
      id: 5, 
      name: "리뷰", 
      path: "/category/review", 
      slug: "review", 
      icon: "star", 
      description: "도서 및 도구 리뷰",
      visible: true,
      order: 5,
      subCategories: []
    }
  ],
  
  // 소셜 미디어 링크
  socialMedia: [
    { id: 1, name: "GitHub", url: "https://github.com/username", icon: "github", visible: true, order: 1 },
    { id: 2, name: "Twitter", url: "https://twitter.com/username", icon: "twitter", visible: true, order: 2 },
    { id: 3, name: "LinkedIn", url: "https://linkedin.com/in/username", icon: "linkedin", visible: true, order: 3 },
    { id: 4, name: "Instagram", url: "https://instagram.com/username", icon: "instagram", visible: true, order: 4 },
    { id: 5, name: "YouTube", url: "https://youtube.com/c/username", icon: "youtube", visible: true, order: 5 },
    { id: 6, name: "Facebook", url: "https://facebook.com/username", icon: "facebook", visible: false, order: 6 }
  ],
  
  // 태그 클라우드
  tags: [
    { id: 1, name: "React", count: 15, path: "/tag/react", visible: true },
    { id: 2, name: "JavaScript", count: 20, path: "/tag/javascript", visible: true },
    { id: 3, name: "CSS", count: 8, path: "/tag/css", visible: true },
    { id: 4, name: "Node.js", count: 12, path: "/tag/nodejs", visible: true },
    { id: 5, name: "TypeScript", count: 7, path: "/tag/typescript", visible: true },
    { id: 6, name: "MongoDB", count: 5, path: "/tag/mongodb", visible: true },
    { id: 7, name: "Redux", count: 6, path: "/tag/redux", visible: true },
    { id: 8, name: "Next.js", count: 4, path: "/tag/nextjs", visible: true },
    { id: 9, name: "GraphQL", count: 3, path: "/tag/graphql", visible: true },
    { id: 10, name: "Docker", count: 2, path: "/tag/docker", visible: true }
  ],
  
  // 아카이브 (월별)
  archives: [
    { id: 1, date: "2023-05", label: "2023년 5월", count: 5, path: "/archive/2023/05", visible: true },
    { id: 2, date: "2023-04", label: "2023년 4월", count: 4, path: "/archive/2023/04", visible: true },
    { id: 3, date: "2023-03", label: "2023년 3월", count: 6, path: "/archive/2023/03", visible: true },
    { id: 4, date: "2023-02", label: "2023년 2월", count: 3, path: "/archive/2023/02", visible: true },
    { id: 5, date: "2023-01", label: "2023년 1월", count: 7, path: "/archive/2023/01", visible: true }
  ],
  
  // 상단 네비게이션 바 설정
  navbar: {
    enableSearch: true,
    enableDarkMode: true,
    enableNotifications: true,
    enableUserProfile: true
  },
  
  // 블로그 기능 설정
  features: {
    enableComments: true,
    enableSocialSharing: true,
    enableDarkMode: true,
    enableSubscription: true,
    enableRelatedPosts: true,
    enableCategoriesPage: true,
    enableTagsPage: true,
    enableArchivePage: true,
    postsPerPage: 5
  },
  
  // 포스트 관련 설정
  posts: {
    showAuthor: true,
    showDate: true,
    showReadingTime: true,
    showViews: true,
    showLikes: true,
    showShareButtons: true,
    showTags: true,
    showRelatedPosts: true,
    showTableOfContents: true,
    relatedPostsCount: 3
  }
};

export default blogConfig;