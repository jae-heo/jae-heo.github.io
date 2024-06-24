---
layout: post
title: "충돌 예측 시스템"
subtitle: "단안 카메라로 실시간 충돌을 예측하는 알림 시스템"
date: 2024-06-11 13:00:00 +0900
last_modified_at: 2024-06-11 13:00:00 +0900
categories: ["project"]
tags: ["opencv", "python", "deeplearning"]
lang: ko
---
{% include image.html src="/assets/img/cps_demo.gif" alt="cps_demo_gif" width="500" %}

### 배경
- 자율 주행 기술이 적용된 배달 로봇 등의 상용화로 깊이 추정 기술에 대한 수요가 급증하고 있음
- 기존 거리 추정은 Lidar 센서를 이용하여 가능하나 비용이 비쌈
- 길거리에서 촬영된 영상은 사람들의 얼굴이 나오기 때문에 데이터로써 활용되기 어려움

### 기대 효과
- 단안 카메라 거리 측정 기술을 통한 안전 사고 방지
- 단안 카메라의 단점인 기상 악화 상황에서의 한계를 딥러닝을 이용해서 극복
- 비싼 Lidar 센서 대신 단안 카메라를 사용하여 비용 절감

### 나의 역할
- Python GUI 앱 구현
- 실시간 모델 서빙 서버 구현

### 사용 모델
- YoloWorld
- Depth Anything

### 프로젝트 구조
{% include image.html src="/assets/img/cps_architecture.png" alt="cps 구조" width="700" %}

### 사용 기술
- PYQT5
- OpenCV
- WebSockets
- FastAPI
- Lock
- ONNX
- Pytorch

### 프로젝트 자료
<a href="https://github.com/boostcampaitech6/level2-3-cv-finalproject-cv-12" target="_blank">GitHub Repository</a>