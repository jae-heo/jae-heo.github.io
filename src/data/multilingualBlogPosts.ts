// src/data/multilingualBlogPosts.ts
import { MultilingualBlogPost } from '../utils/multilingualPostLoader';

export const multilingualBlogPosts: MultilingualBlogPost[] = [
  {
    // Base post in Korean
    id: '1',
    title: '리액트와 타입스크립트로 블로그 만들기',
    description: '리액트와 타입스크립트를 사용하여 개인 블로그를 만드는 방법을 알아봅니다.',
    content: `
# 리액트와 타입스크립트로 블로그 만들기

리액트는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 타입스크립트는 JavaScript에 타입 시스템을 추가한 언어로, 개발 과정에서 많은 오류를 방지할 수 있게 해줍니다.

## 왜 리액트와 타입스크립트를 함께 사용할까요?

- **타입 안정성**: 타입스크립트는 정적 타입 검사를 통해 많은 런타임 오류를 방지합니다.
- **개발자 경험**: 코드 자동 완성, 리팩토링 도구 등을 통해 개발 생산성을 높입니다.
- **유지보수성**: 타입을 통해 코드의 의도가 명확해지고, 문서화 효과가 있습니다.

## 블로그 프로젝트 시작하기

1. Vite를 사용하여 리액트 + 타입스크립트 프로젝트 생성
2. 라우팅 설정 (React Router)
3. 블로그 포스트 데이터 구조 정의
4. 메인 페이지 및 상세 페이지 컴포넌트 구현
5. 스타일링 (CSS, Styled Components 등)
6. 다국어 지원 (i18n)

다음 포스트에서는 각 단계를 자세히 살펴보겠습니다.
    `,
    date: '2023-05-15',
    author: '홍길동',
    tags: ['React', 'TypeScript', 'Web Development'],
    imageUrl: '/images/react-typescript.jpg',
    slug: 'creating-blog-with-react-and-typescript',
    // English translation
    translations: {
      en: {
        title: 'Creating a Blog with React and TypeScript',
        description: 'Learn how to create a personal blog using React and TypeScript.',
        content: `
# Creating a Blog with React and TypeScript

React is a JavaScript library for building user interfaces. TypeScript adds a type system to JavaScript, which helps prevent many errors during development.

## Why Use React and TypeScript Together?

- **Type Safety**: TypeScript provides static type checking that prevents many runtime errors.
- **Developer Experience**: Features like code completion and refactoring tools enhance productivity.
- **Maintainability**: Types make code intentions clearer and serve as documentation.

## Starting Your Blog Project

1. Create a React + TypeScript project using Vite
2. Set up routing (React Router)
3. Define blog post data structures
4. Implement main page and detail page components
5. Add styling (CSS, Styled Components, etc.)
6. Support multiple languages (i18n)

In the next post, we'll look at each step in detail.
        `
      }
    }
  },
  {
    // Base post in Korean
    id: '2',
    title: '웹 개발에서 다국어 지원하기',
    description: 'i18n을 활용하여 다양한 언어를 지원하는 웹사이트를 만드는 방법을 설명합니다.',
    content: `
# 웹 개발에서 다국어 지원하기

웹사이트에서 다국어를 지원하는 것은 글로벌 사용자 기반을 구축하는 데 중요합니다. i18n(internationalization)은 이를 가능하게 하는 프로세스입니다.

## i18n의 주요 개념

- **번역 파일**: 각 언어별로 키-값 쌍으로 구성된 번역 파일을 만듭니다.
- **언어 감지**: 사용자의 브라우저 설정이나 지리적 위치를 기반으로 기본 언어를 감지합니다.
- **언어 전환**: 사용자가 원하는 언어로 쉽게 전환할 수 있는 UI를 제공합니다.

## React에서 i18n 구현하기

React에서는 react-i18next 라이브러리를 사용하여 쉽게 다국어를 지원할 수 있습니다:

1. 필요한 패키지 설치: i18next, react-i18next
2. 번역 파일 구성 (JSON 형식)
3. i18n 초기화 설정
4. useTranslation 훅을 사용하여 컴포넌트에서 번역 사용

다국어 지원은 사용자 경험을 향상시키고, 더 넓은 사용자층에 접근할 수 있게 해줍니다.
    `,
    date: '2023-06-10',
    author: '홍길동',
    tags: ['i18n', 'Web Development', 'Localization'],
    imageUrl: '/images/i18n.jpg',
    slug: 'multilingual-support-in-web-development',
    // English translation
    translations: {
      en: {
        title: 'Multilingual Support in Web Development',
        description: 'Learn how to create websites that support multiple languages using i18n.',
        content: `
# Multilingual Support in Web Development

Supporting multiple languages on your website is crucial for building a global user base. i18n (internationalization) is the process that makes this possible.

## Key Concepts of i18n

- **Translation Files**: Create translation files with key-value pairs for each language.
- **Language Detection**: Detect the default language based on the user's browser settings or geographic location.
- **Language Switching**: Provide a UI that allows users to easily switch to their preferred language.

## Implementing i18n in React

In React, you can easily support multiple languages using the react-i18next library:

1. Install required packages: i18next, react-i18next
2. Configure translation files (JSON format)
3. Initialize i18n setup
4. Use the useTranslation hook in components

Multilingual support enhances the user experience and allows you to reach a wider audience.
        `
      }
    }
  },
  {
    // Base post in Korean
    id: '3',
    title: 'GitHub Actions로 블로그 자동 배포하기',
    description: 'GitHub Actions를 사용하여 블로그를 GitHub Pages에 자동으로 배포하는 방법을 알아봅니다.',
    content: `
# GitHub Actions로 블로그 자동 배포하기

CI/CD(지속적 통합/지속적 배포)는 현대 웹 개발의 중요한 부분입니다. GitHub Actions를 사용하면 코드 변경 사항을 자동으로 테스트하고 배포할 수 있습니다.

## GitHub Actions의 작동 방식

GitHub Actions는 레포지토리에서 특정 이벤트(예: push, pull request)가 발생했을 때 자동으로 실행되는 워크플로우를 정의할 수 있게 해줍니다.

## GitHub Pages에 블로그 배포하기

1. **워크플로우 파일 생성**: .github/workflows 디렉토리에 YAML 파일 생성
2. **빌드 단계 정의**: Node.js 설정, 의존성 설치, 빌드 명령 실행
3. **배포 단계 정의**: 빌드된 파일을 gh-pages 브랜치에 푸시

워크플로우 예시:
\`\`\`yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
\`\`\`

이 방식을 사용하면 main 브랜치에 변경 사항을 푸시할 때마다 블로그가 자동으로 배포됩니다.
    `,
    date: '2023-07-22',
    author: '김개발',
    tags: ['GitHub', 'CI/CD', 'DevOps'],
    imageUrl: '/images/github-actions.jpg',
    slug: 'auto-deploy-blog-with-github-actions',
    // English translation
    translations: {
      en: {
        title: 'Auto-Deploy Your Blog with GitHub Actions',
        description: 'Learn how to automatically deploy your blog to GitHub Pages using GitHub Actions.',
        content: `
# Auto-Deploy Your Blog with GitHub Actions

CI/CD (Continuous Integration/Continuous Deployment) is an important part of modern web development. GitHub Actions allows you to automatically test and deploy code changes.

## How GitHub Actions Works

GitHub Actions lets you define workflows that automatically run when specific events (e.g., push, pull request) occur in your repository.

## Deploying a Blog to GitHub Pages

1. **Create Workflow File**: Create a YAML file in the .github/workflows directory
2. **Define Build Steps**: Set up Node.js, install dependencies, run build command
3. **Define Deployment Step**: Push the built files to the gh-pages branch

Example workflow:
\`\`\`yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
\`\`\`

Using this approach, your blog will be automatically deployed whenever you push changes to the main branch.
        `
      }
    }
  }
];

// Export for use in your application
export default multilingualBlogPosts;