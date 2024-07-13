---
layout: post
title: "프로젝트 님블 (Nimble)"
subtitle: "디지털 마케팅의 자동화를 꿈꾸다."
date: 2024-06-11 02:00:00 +0900
last_modified_at: 2024-06-11 02:00:00 +0900
categories: ["project"]
tags: ["selenium", "docker", "gcp", "cicd", "infra"]
lang: ko
---

## 목차
1. [프로젝트 님블 소개](#프로젝트-님블-소개)
    1. [주요 기능](#주요-기능)
    2. [기대 효과](#기대-효과)
    3. [나의 역할 및 사용기술](#나의-역할-및-사용기술)
2. [프로젝트 구조](#프로젝트-구조)
    1. [1차 설계](#1차-설계)
    2. [2차 설계](#2차-설계)
    3. [3차 설계](#3차-설계)

<br><br>

## 프로젝트 님블 소개

프로젝트 님블(Nimble)은 디지털 마케팅 자동화를 목표로 하는 프로젝트입니다. 현대의 디지털 마케팅 환경은 AI의 도입으로 빠르게 변화하고 있으며, 이에 발맞추어 효율적이고 효과적인 마케팅 전략을 세우기 위해서는 자동화가 필수적입니다. 님블은 이러한 필요성에 부응하여 개발된 솔루션입니다.

### 주요 기능

1. **자동화된 마케팅 관리**
    - 프로젝트 님블은 다양한 디지털 마케팅을 End-to-end로 자동화합니다.

2. **생성형 AI 기반 마케팅**
    - 인공지능 기술을 활용하여 실시간으로 변화하는 SEO, Trends를 분석하고 적용합니다.

### 기대 효과

- **효율성 향상**
    - 자동화를 통해 클라이언트는 자신의 일에 집중할 수 있게됩니다.

- **정확한 마케팅**
    - 실시간 데이터 분석과 AI 기반 분석을 통해 효울적인 마케팅을 합니다.

- **비용 절감**
    - 자동화 및 인프라 고도화를 통해 인건비와 운영 비용이 절감됩니다.

### 나의 역할 및 사용기술

- **알고리즘 구현**
    - Python
    - Selenium

- **인프라 구축 및 관리**
    - Github Action
    - GCP
    - Docker
    - Airflow
    - Database (sqlite, postgresql)
    - Linux
    - Terraform

<br><br>

## 프로젝트 구조

### 1차 설계
{% include image.html src="/assets/img/nimble_architecture_phase1.png" alt="1차 설계" width="700" %}

**설계 포인트**
- 유저가 프로그램을 직접 실행하는 구조
- 사용자는 관리자에게 라이센스를 구입하거나 요청
- 관리자는 라이센스를 부여하고 클라이언트 프로그램을 제공
- 매일 실행되는 코어 로직(Client)은 실행할 때마다 라이센스 서버에 자신의 키값을 통해 유효성을 검증

**사용 기술**
- PYQT5, GCP, RDB, FastAPI, Selenium

**피드백**
- 사용자가 직접 프로그램을 구동하는 것의 어려움
- 기존 클라이언트 프로그램 업데이트 및 배포의 어려움
- 관리자가 라이센스를 직접 관리하는 것의 불편


### 2차 설계
{% include image.html src="/assets/img/nimble_architecture_phase2.png" alt="2차 설계" width="700" %}

**설계 포인트**
- 사용자가 결제 시 필요한 정보들을 입력하면, 결제 플랫폼에서 자동으로 API를 호출하는 구조
- 이후 모든 작업은 서버 상에서 자동으로 실행됨

**사용 기술**
- GCP, RDB, FastAPI, Selenium, Terraform, Docker, Airflow, Linux

**피드백**
- 인프라 유지 비용이 증가
- CI/CD 파이프라인이 없어 소스코드를 수정하고 적용하는데 모든 인프라 구조를 알아야함

### 3차 설계
{% include image.html src="/assets/img/nimble_architecture_phase3.png" alt="3차 설계" width="700" %}

**설계 포인트**
- Bucket을 통해 Database를 File로 관리함으로 비용 감소
- 유지보수성을 위해 Core Logic을 별도의 깃허브 저장소로 분리 후 Cloud Build로 CI/CD
- 기존 Airflow로 관리되던 작업을 Cloud Function으로 구현하여 관리소요 및 비용 감소

**사용 기술**
- GCP, RDB, FastAPI, Selenium, Docker, Terraform, Linux

**개선사항**
- 모니터링: 지금은 단순 TXT로 출력하고 있음 -> 오픈소스 모니터링 툴을 연결해서 적용
- CloudBuild w/ Terraform: 테라폼에서 cloud build trigger를 관리하는데 문제가 있음 (테라폼 버그로 추측) Fix예정
- Unit Test: Selenium 각 기능을 주기적으로(weekly) 테스트하는 환경 구축 필요