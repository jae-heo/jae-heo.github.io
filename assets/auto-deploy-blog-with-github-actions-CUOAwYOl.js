const n=`---
id: "3"
title: "GitHub Actions로 블로그 자동 배포하기"
description: "GitHub Actions를 사용하여 블로그를 GitHub Pages에 자동으로 배포하는 방법을 알아봅니다."
date: "2023-07-22"
author: "김개발"
tags: ["GitHub", "CI/CD", "DevOps"]
imageUrl: "/images/github-actions.jpg"
slug: "auto-deploy-blog-with-github-actions"
---

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

이 방식을 사용하면 main 브랜치에 변경 사항을 푸시할 때마다 블로그가 자동으로 배포됩니다.`;export{n as default};
