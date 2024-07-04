---
layout: post
title: "코딩테스트의 모든것"
subtitle: "코딩테스트를 준비하는 과정을 함께 나눕니다."
date: 2024-07-03 22:00:00 +0900
last_modified_at: 2024-07-03 22:00:00 +0900
categories: ["tutorial"]
tags: ["algorithm"]
lang: ko
---

## 목차
1. [코딩 테스트 소개](#코딩-테스트-소개)
   - [코딩 테스트란 무엇인가?](#코딩-테스트란-무엇인가)
   - [코딩 테스트의 이점](#코딩-테스트의-이점)
   - [코딩 테스트의 유형](#코딩-테스트의-유형)
2. [코딩 테스트 준비](#코딩-테스트-준비)
   - [기초 개념 학습](#기초-개념-학습)
   - [자료 구조와 알고리즘](#자료-구조와-알고리즘)
   - [문제 풀이 연습](#문제-풀이-연습)
   - [추천 학습 자료 및 사이트](#추천-학습-자료-및-사이트)
3. [필수 알고리즘 및 자료 구조](#필수-알고리즘-및-자료-구조)
   - [배열과 문자열](#배열과-문자열)
   - [연결 리스트](#연결-리스트)
   - [스택과 큐](#스택과-큐)
   - [트리와 그래프](#트리와-그래프)
   - [해시 테이블](#해시-테이블)
   - [정렬과 탐색 알고리즘](#정렬과-탐색-알고리즘)
   - [동적 프로그래밍](#동적-프로그래밍)
4. [코딩 테스트 점검하기](#코딩-테스트-점검하기)
   - [배열(Array)](#배열array)
   - [문자열(String)](#문자열string)
   - [투 포인터(Two Pointers)](#투-포인터two-pointers)
   - [슬라이딩 윈도우(Sliding Window)](#슬라이딩-윈도우sliding-window)
   - [행렬(Matrix)](#행렬matrix)
   - [해시맵(HashMap)](#해시맵hashmap)
   - [구간(Intervals)](#구간intervals)
   - [스택(Stack)](#스택stack)
   - [연결 리스트(Linked List)](#연결-리스트linked-list)
   - [이진 트리(Binary Tree)](#이진-트리binary-tree)
   - [이진 탐색 트리(Binary Tree Search)](#이진-탐색-트리binary-tree-search)
   - [그래프(Graph)](#그래프graph)
   - [BFS/DFS](#bfsdfs)
   - [그래프 BFS(Graph BFS)](#그래프-bfsgraph-bfs)
   - [트라이(Trie)](#트라이트rie)
   - [백트래킹(Backtracking)](#백트래킹backtracking)
   - [분할 정복(Divide & Conquer)](#분할-정복divide--conquer)
   - [카데인 알고리즘(Kadane's Algorithm)](#카데인-알고리즘kadanes-algorithm)
   - [이진 탐색(Binary Search)](#이진-탐색binary-search)
   - [힙(Heap)](#힙heap)
   - [비트 조작(Bit Manipulation)](#비트-조작bit-manipulation)
   - [수학(Math)](#수학math)
   - [1차원 동적 프로그래밍(1D DP)](#1차원-동적-프로그래밍1d-dp)
   - [다차원 동적 프로그래밍(Multidimensional DP)](#다차원-동적-프로그래밍multidimensional-dp)

<br>
<br>

## 시작하기 전에

만약 코딩테스트에 어느정도 익숙하신 분들은 바로 [코딩 테스트 점검하기](#코딩-테스트-점검하기) 로 넘어가시는 것이 좋습니다.

<br>
<br>

## 코딩 테스트 소개

### 코딩 테스트란 무엇인가?

코딩 테스트는 응시자의 프로그래밍 능력을 평가하기 위해 주어지는 시험입니다. 주로 소프트웨어 개발을 포함하는 기술 직군에서 요구됩니다. 코딩 테스트는 주어진 문제를 해결하기 위해 알고리즘을 결정하고, 이를 코드로 구현하는 과정을 통해 지원자의 문제 해결 능력, 코드 작성 능력, 알고리즘 이해도 등을 평가합니다.<br>코딩 테스트는 온라인 플랫폼을 통해 비대면으로 진행되기도 하고, 현장에서 직접 주어지는 경우도 있습니다. 주로 기업의 채용 과정에서 기술 면접의 일부로 활용되며, 지원자의 기본적인 코딩 능력을 확인하는 중요한 단계입니다.

### 코딩 테스트의 이점

- **역량 평가**: 응시자의 기본적인 프로그래밍 능력을 평가하는 데 효과적인 방법입니다. 실제 업무에서 요구되는 코딩 작업을 수행할 수 있는지 확인하는 중요한 기준이 됩니다.
- **문제 해결 능력**: 응시자의 문제 해결 능력과 알고리즘적 사고를 평가할 수 있습니다. 복잡한 문제를 효율적으로 해결하는 능력을 확인하는 데 도움을 줍니다.
- **공정한 평가**: 응시자들을 공정하게 평가할 수 있는 도구입니다. 주관적인 요소가 개입될 가능성을 최소화하고, 객관적인 기준에 따라 응시자의 능력을 평가할 수 있습니다.
- **준비도 평가**: 코딩 테스트를 통해 지원자가 얼마나 준비되어 있는지를 평가할 수 있습니다. 지원자가 얼마나 열심히 공부하고 준비했는지를 보여주는 중요한 지표가 됩니다.
- **문화 적합성**: 코딩 테스트는 지원자가 회사의 기술 스택과 문화에 얼마나 적합한지 평가하는 데도 사용됩니다. 회사의 개발 환경에 잘 적응하고 기여할 수 있는 인재를 찾는 데 도움을 줍니다.

### 코딩 테스트의 유형

- **온라인 코딩 테스트**: 인터넷을 통해 온라인 플랫폼에서 문제를 풀고 제출하는 방식입니다. 이 유형은 시간 제한이 있으며, 자동 채점 시스템을 통해 빠르게 결과를 확인할 수 있습니다.
- **화이트보드 코딩 테스트**: 현장 인터뷰에서 진행되며, 지원자가 화이트보드에 문제를 풀고 코드를 작성하는 방식입니다. 이는 지원자의 사고 과정을 면접관이 직접 관찰할 수 있는 장점이 있습니다.
- **프로그래밍 과제**: 지원자에게 며칠 동안 해결해야 하는 프로그래밍 과제를 주는 방식입니다. 이는 지원자가 충분한 시간을 가지고 문제를 깊이 있게 해결할 수 있는 기회를 제공합니다.
- **페어 프로그래밍 테스트**: 면접관과 지원자가 함께 문제를 해결하는 방식입니다. 이는 지원자의 협업 능력과 커뮤니케이션 스킬을 평가하는 데 유용합니다.
- **알고리즘 및 자료 구조 테스트**: 특정 알고리즘과 자료 구조에 대한 이해도를 평가하는 테스트입니다. 이는 문제 해결 능력과 더불어 알고리즘 최적화 능력을 확인하는 데 중점을 둡니다.

<br>
<br>

## 코딩 테스트 준비

### 기초 개념 학습

코딩 테스트를 준비할 때, 기초를 다지는 것이 중요합니다. 기본적인 문법, 함수, 변수, 자료형 등을 잘 이해하고 있어야 합니다. 주요 프로그래밍 언어로는 Python, Java, C++, JavaScript 등이 있으며, 이 중 하나를 선택하여 깊이 있게 학습하는 것이 좋습니다.

#### 학습할 기초 개념:
- 변수와 자료형
- 조건문과 반복문
- 함수와 스코프
- 리스트, 배열, 문자열 조작
- 입출력 처리

### 자료 구조와 알고리즘

코딩 테스트의 핵심은 자료 구조와 알고리즘입니다. 문제를 해결하기 위해서는 적절한 자료 구조를 선택하고, 효율적인 알고리즘을 구현할 수 있어야 합니다. 자주 사용되는 자료 구조와 알고리즘을 충분히 이해하고, 이를 활용할 수 있도록 연습해야 합니다.

#### 주요 자료 구조:
- 배열
- 연결 리스트
- 스택과 큐
- 해시 테이블
- 트리와 그래프
- 힙

#### 주요 알고리즘:
- 정렬 (버블, 선택, 삽입, 퀵, 병합 정렬)
- 탐색 (이진 탐색, 너비 우선 탐색, 깊이 우선 탐색)
- 재귀와 백트래킹
- 동적 프로그래밍
- 그리디 알고리즘
- 분할 정복

### 문제 풀이 연습

이론을 이해하는 것만으로는 충분하지 않습니다. 다양한 문제를 직접 풀어보며 연습하는 것이 중요합니다. 온라인 코딩 플랫폼에서 제공하는 문제를 풀면서 연습하는 것이 효과적입니다.

#### 연습 방법:
- 매일 일정 시간을 정해 꾸준히 문제를 풀기
- 문제를 풀고 나서 다른 사람의 풀이를 참고하여 새로운 접근법 익히기
- 다양한 난이도의 문제를 골고루 풀어보기
- 틀린 문제나 어려웠던 문제를 복습하고 다시 풀어보기

### 추천 학습 자료 및 사이트

효과적으로 코딩 테스트를 준비하기 위해서는 좋은 학습 자료와 사이트를 활용하는 것이 중요합니다. 다음은 코딩 테스트 준비에 유용한 추천 학습 자료 및 사이트입니다.

#### 온라인 코딩 플랫폼:
- **[Baekjoon](https://www.acmicpc.net/)**: 한국의 대표적인 사이트로, 다양한 난이도의 알고리즘 문제를 제공합니다.
- **[LeetCode](https://leetcode.com/)**: 다양한 난이도의 코딩 문제를 제공하며, 인터뷰 준비에 최적화된 플랫폼입니다.
- **[HackerRank](https://www.hackerrank.com/)**: 알고리즘, 데이터베이스, AI 등 다양한 분야의 문제를 풀 수 있는 플랫폼입니다.
- **[CodeSignal](https://codesignal.com/)**: 실전 코딩 테스트와 유사한 환경에서 연습할 수 있는 플랫폼입니다.
- **[Codewars](https://www.codewars.com/)**: 다양한 코딩 챌린지를 통해 프로그래밍 실력을 향상시킬 수 있는 플랫폼입니다.
- **[AtCoder](https://atcoder.jp/)**: 일본의 유명한 온라인 저지 사이트로, 다양한 알고리즘 문제를 제공합니다.

#### 기타 학습 자료:
- **[GeeksforGeeks](https://www.geeksforgeeks.org/)**: 다양한 자료 구조와 알고리즘에 대한 튜토리얼과 문제를 제공합니다.
- **[Coursera](https://www.coursera.org/)**, **[edX](https://www.edx.org/)**: 데이터 구조와 알고리즘에 대한 온라인 강의를 수강할 수 있는 플랫폼입니다.
- **[YouTube](https://www.youtube.com/)**: 다양한 프로그래밍 강의와 알고리즘 설명 동영상을 찾을 수 있습니다.

## 필수 알고리즘 및 자료 구조

코딩 테스트에서 자주 출제되는 알고리즘과 자료 구조를 이해하고, 이를 활용할 수 있는 능력을 갖추는 것이 중요합니다. 아래는 코딩 테스트 준비를 위해 반드시 학습해야 하는 주요 알고리즘과 자료 구조입니다.

### 배열과 문자열

#### 배열
배열은 동일한 타입의 요소들이 연속적으로 저장된 자료 구조입니다. 배열의 주요 특징은 인덱스를 통해 요소에 빠르게 접근할 수 있다는 점입니다. 배열은 고정된 크기를 가지며, 요소를 삽입하거나 삭제할 때는 크기를 재조정해야 합니다.

#### 문자열
문자열은 문자들이 연속적으로 저장된 배열로 볼 수 있습니다. 문자열의 주요 연산으로는 길이 측정, 특정 문자 접근, 부분 문자열 추출, 문자열 비교 등이 있습니다. 문자열을 다루기 위해 자주 사용하는 알고리즘으로는 문자열 검색(KMP, Rabin-Karp), 문자열 정렬 등이 있습니다.

### 연결 리스트

연결 리스트는 각 노드가 데이터와 다음 노드에 대한 참조를 가지고 있는 자료 구조입니다. 연결 리스트의 주요 장점은 동적으로 크기를 조정할 수 있으며, 삽입과 삭제가 빠르다는 점입니다.

- **단일 연결 리스트**: 각 노드가 다음 노드에 대한 참조를 가집니다.
- **이중 연결 리스트**: 각 노드가 이전 노드와 다음 노드에 대한 참조를 가집니다.
- **원형 연결 리스트**: 마지막 노드가 첫 번째 노드를 가리켜 원형으로 연결된 리스트입니다.

### 스택과 큐

#### 스택
스택은 후입선출(LIFO) 방식의 자료 구조입니다. 주로 함수 호출의 저장, 역순 문자열 생성, 괄호 검증 등에 사용됩니다. 스택의 주요 연산은 푸시(push), 팝(pop), 피크(peek)입니다.

#### 큐
큐는 선입선출(FIFO) 방식의 자료 구조입니다. 주로 너비 우선 탐색(BFS), 작업 스케줄링 등에 사용됩니다. 큐의 주요 연산은 인큐(enqueue), 디큐(dequeue), 프런트(front)입니다.

### 트리와 그래프

#### 트리
트리는 계층적인 자료 구조로, 루트 노드와 자식 노드로 구성됩니다. 이진 트리는 각 노드가 최대 두 개의 자식을 가지는 트리입니다. 트리의 주요 연산으로는 삽입, 삭제, 탐색 등이 있으며, 깊이 우선 탐색(DFS)과 너비 우선 탐색(BFS)이 자주 사용됩니다.

- **이진 탐색 트리(BST)**: 왼쪽 서브트리는 루트보다 작고, 오른쪽 서브트리는 루트보다 큰 값을 가지는 트리입니다.
- **힙(Heap)**: 최대값이나 최소값을 빠르게 찾을 수 있는 완전 이진 트리입니다.

#### 그래프
그래프는 노드와 노드를 연결하는 간선으로 구성된 자료 구조입니다. 방향 그래프와 무방향 그래프, 가중 그래프와 비가중 그래프가 있습니다. 그래프의 주요 연산으로는 탐색(DFS, BFS), 최단 경로 찾기(Dijkstra, Bellman-Ford), 최소 신장 트리(Prim, Kruskal) 등이 있습니다.

### 해시 테이블

해시 테이블은 키를 값에 매핑하는 자료 구조로, 빠른 탐색, 삽입, 삭제를 지원합니다. 해시 함수는 키를 해시값으로 변환하여 저장 위치를 결정합니다. 충돌 해결 방법으로는 체이닝(Chaining)과 개방 주소법(Open Addressing)이 있습니다.

### 정렬과 탐색 알고리즘

#### 정렬 알고리즘
정렬 알고리즘은 데이터를 일정한 순서대로 정렬하는 방법입니다. 주요 정렬 알고리즘으로는 다음과 같습니다:
- **버블 정렬**: 인접한 두 요소를 비교하여 정렬합니다.
- **선택 정렬**: 매번 최솟값을 찾아 첫 번째 요소와 교환합니다.
- **삽입 정렬**: 정렬된 부분과 비교하여 적절한 위치에 삽입합니다.
- **퀵 정렬**: 피벗을 기준으로 분할하여 정렬합니다.
- **병합 정렬**: 분할 후 병합하여 정렬합니다.
- **힙 정렬**: 힙 자료 구조를 이용하여 정렬합니다.

#### 탐색 알고리즘
탐색 알고리즘은 데이터 내에서 원하는 값을 찾는 방법입니다. 주요 탐색 알고리즘으로는 다음과 같습니다:
- **선형 탐색**: 처음부터 끝까지 순차적으로 탐색합니다.
- **이진 탐색**: 정렬된 배열에서 반씩 나누어 탐색합니다.

### 동적 프로그래밍

동적 프로그래밍은 복잡한 문제를 작은 부분 문제로 나누어 해결하는 방법입니다. 중복되는 부분 문제를 저장하여 계산을 줄이는 메모이제이션(Memoization)과 상향식 접근법을 사용합니다. 동적 프로그래밍은 최적화 문제를 해결하는 데 유용하며, 대표적인 예제로는 피보나치 수열, 배낭 문제, 최장 공통 부분 수열(LCS) 등이 있습니다.

<br>
<br>

## 코딩 테스트 점검하기

내가 코딩테스트를 잘 준비했을까? 라는 의문점이 든다면 아래 정리된 내용중 부족하거나 모르는 부분을 보충합니다.
예시는 Python을 기준으로 설명됩니다.

### 배열(Array)
- 배열 선언
  ```python
  arr = []
  arr = [1, 2, 3]
  ```

- 엘리먼트 추가
  ```python
  arr = [1, 2, 3]
  arr.append(4)  # [1, 2, 3, 4]
  ```

- 엘리먼트 삭제
  ```python
  arr = [1, 2, 3, 4]
  arr.remove(2)  # [1, 3, 4]
  del arr[1]     # [1, 4]
  ```

- 길이 알아내기 (len 함수 등)
  ```python
  arr = [1, 2]
  length = len(arr)  # 2
  ```

- 슬라이싱
  ```python
  arr = [1, 2, 3, 4]
  sub_arr = arr[0:2]  # [1, 2]
  ```

- 순환참조
  ```python
  arr = [1, 2, 3]
  for element in arr:
      print(element)
  # 출력:
  # 1
  # 2
  # 3
  ```

- 배열 뒤집기
  ```python
  arr = [1, 2, 3]
  # 뒤집는 두 가지 방법
  arr.reverse()   # [3, 2, 1]
  arr = arr[::-1] # [1, 2, 3]
  ```

- 정렬하기
  ```python
  # in-place 정렬
  arr = [3, 1, 2]
  arr.sort()  # [1, 2, 3]

  # non in-place 정렬
  arr = [3, 1, 2]
  sorted_arr = sorted(arr)  # [1, 2, 3]
  ```

### 문자열(String)
- 문자열 선언
  ```python
  s = "hello"
  ```

- 부분 문자열 추출
  ```python
  s = "hello"
  sub_str = s[1:4]  # "ell"
  ```

- 문자열 길이 알아내기
  ```python
  s = "hello"
  length = len(s)  # 5
  ```

- 문자열 연결
  ```python
  s = "hello"
  s2 = "world"
  s3 = s + " " + s2  # "hello world"
  ```

- 문자열 분리
  ```python
  s = "hello world"
  words = s.split()  # ['hello', 'world']
  ```

- 문자열 배열 합치기
  ```python
  strs = ["hi", "hello", "bye"]
  "".join(strs) # hihellobye
  " ".join(strs) # hi hello bye
  "-".join(strs) # hi-hello-bye
  ```

- 문자열 검색
  ```python
  s = "hello"
  index = s.find("e")  # 1
  ```

- 문자열 대체
  ```python
  s = "hello"
  s1 = s.replace("l", "r")  # "herro"
  ```

- 문자열 역순
  ```python
  s = "hello"
  s_rev = s[::-1]  # "olleh"
  ```

### 투 포인터(Two Pointers)
- [회문 검사 (Palindrome)](https://leetcode.com/problems/valid-palindrome/)
- [부분 수열 (Subsequence)](https://leetcode.com/problems/is-subsequence/)
- [두 수의 합 (정렬된 배열) (Two Sum with sorted array)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [물통 문제 (Water Container)](https://leetcode.com/problems/container-with-most-water/)

### 슬라이딩 윈도우(Sliding Window)
- [최대 부분합 (Maximum Sum Subarray)](https://leetcode.com/problems/maximum-subarray/)
- [반복되지 않는 가장 긴 부분 문자열 (Longest Substring Without Repeating Characters)](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [최소 윈도우 부분 문자열 (Minimum Window Substring)](https://leetcode.com/problems/minimum-window-substring/)
- [K개의 다른 정수를 가진 부분 배열 (Subarrays with K Different Integers)](https://leetcode.com/problems/subarrays-with-k-different-integers/)

### 행렬(Matrix)
- [행렬 회전 (Rotate Matrix)](https://leetcode.com/problems/rotate-image/)
- [나선형 행렬 (Spiral Matrix)](https://leetcode.com/problems/spiral-matrix/)
- [2D 행렬 검색 (Search a 2D Matrix)](https://leetcode.com/problems/search-a-2d-matrix/)
- [섬의 개수 (Number of Islands)](https://leetcode.com/problems/number-of-islands/)

### 해시맵(HashMap)
- [두 수의 합 (Two Sum)](https://leetcode.com/problems/two-sum/)
- [애너그램 그룹 (Group Anagrams)](https://leetcode.com/problems/group-anagrams/)
- [부분 배열의 합이 K인 경우의 수 (Subarray Sum Equals K)](https://leetcode.com/problems/subarray-sum-equals-k/)
- [가장 긴 연속 수열 (Longest Consecutive Sequence)](https://leetcode.com/problems/longest-consecutive-sequence/)

### 구간(Intervals)
- [구간 병합 (Merge Intervals)](https://leetcode.com/problems/merge-intervals/)
- [구간 삽입 (Insert Interval)](https://leetcode.com/problems/insert-interval/)
- [회의실 배정 (Meeting Rooms)](https://leetcode.com/problems/meeting-rooms/)
- [겹치지 않는 구간 (Non-overlapping Intervals)](https://leetcode.com/problems/non-overlapping-intervals/)

### 스택(Stack)
- [유효한 괄호 (Valid Parentheses)](https://leetcode.com/problems/valid-parentheses/)
- [최소 스택 (Min Stack)](https://leetcode.com/problems/min-stack/)
- [후위 표기법 계산 (Evaluate Reverse Polish Notation)](https://leetcode.com/problems/evaluate-reverse-polish-notation/)
- [일일 온도 (Daily Temperatures)](https://leetcode.com/problems/daily-temperatures/)

### 연결 리스트(Linked List)
- [연결 리스트 뒤집기 (Reverse Linked List)](https://leetcode.com/problems/reverse-linked-list/)
- [두 정렬된 리스트 병합 (Merge Two Sorted Lists)](https://leetcode.com/problems/merge-two-sorted-lists/)
- [연결 리스트 사이클 (Linked List Cycle)](https://leetcode.com/problems/linked-list-cycle/)
- [뒤에서 N번째 노드 제거 (Remove Nth Node From End of List)](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

### 이진 트리(Binary Tree)
- [이진 트리 중위 순회 (Binary Tree Inorder Traversal)](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [이진 트리의 최대 깊이 (Maximum Depth of Binary Tree)](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [경로 합 (Path Sum)](https://leetcode.com/problems/path-sum/)
- [이진 트리 직렬화 및 역직렬화 (Serialize and Deserialize Binary Tree)](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

### 이진 탐색 트리(Binary Tree Search)
- [이진 탐색 트리 유효성 검사 (Validate Binary Search Tree)](https://leetcode.com/problems/validate-binary-search-tree/)
- [이진 탐색 트리의 최소 공통 조상 (Lowest Common Ancestor of a BST)](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [이진 탐색 트리에 노드 삽입 (Insert into a Binary Search Tree)](https://leetcode.com/problems/insert-into-a-binary-search-tree/)
- [이진 탐색 트리에서 노드 삭제 (Delete Node in a BST)](https://leetcode.com/problems/delete-node-in-a-bst/)

### 그래프(Graph)
- [그래프 복제 (Clone Graph)](https://leetcode.com/problems/clone-graph/)
- [강의 계획표 (Course Schedule)](https://leetcode.com/problems/course-schedule/)
- [무방향 그래프의 연결 요소 개수 (Number of Connected Components in an Undirected Graph)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
- [중복 간선 (Redundant Connection)](https://leetcode.com/problems/redundant-connection/)

### BFS/DFS
- [단어 사다리 (Word Ladder)](https://leetcode.com/problems/word-ladder/)
- [섬의 개수 (Number of Islands)](https://leetcode.com/problems/number-of-islands/)
- [그래프 복제 (Clone Graph)](https://leetcode.com/problems/clone-graph/)
- [태평양 대서양 수류 (Pacific Atlantic Water Flow)](https://leetcode.com/problems/pacific-atlantic-water-flow/)

### 그래프 BFS(Graph BFS)
- [이진 행렬에서의 최단 경로 (Shortest Path in Binary Matrix)](https://leetcode.com/problems/shortest-path-in-binary-matrix/)
- [단어 사다리 II (Word Ladder II)](https://leetcode.com/problems/word-ladder-ii/)
- [자물쇠 열기 (Open the Lock)](https://leetcode.com/problems/open-the-lock/)
- [최소 나이트 이동 (Minimum Knight Moves)](https://leetcode.com/problems/minimum-knight-moves/)

### 트라이(Trie)
- [트라이 구현 (Implement Trie, Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [단어 추가 및 검색 (Add and Search Word)](https://leetcode.com/problems/add-and-search-word-data-structure-design/)
- [단어 검색 II (Word Search II)](https://leetcode.com/problems/word-search-ii/)
- [단어 치환 (Replace Words)](https://leetcode.com/problems/replace-words/)

### 백트래킹(Backtracking)
- [순열 (Permutations)](https://leetcode.com/problems/permutations/)
- [조합 합 (Combination Sum)](https://leetcode.com/problems/combination-sum/)
- [스도쿠 해결 (Sudoku Solver)](https://leetcode.com/problems/sudoku-solver/)
- [단어 검색 (Word Search)](https://leetcode.com/problems/word-search/)

### 분할 정복(Divide & Conquer)
- [병합 정렬 (Merge Sort)](https://leetcode.com/problems/sort-an-array/)
- [퀵 정렬 (Quick Sort)](https://leetcode.com/problems/sort-an-array/)
- [최대 부분합 (Maximum Subarray)](https://leetcode.com/problems/maximum-subarray/)
- [배열에서 K번째 큰 요소 (Kth Largest Element in an Array)](https://leetcode.com/problems/kth-largest-element-in-an-array/)

### 카데인 알고리즘(Kadane's Algorithm)
- [최대 부분합 (Maximum Subarray)](https://leetcode.com/problems/maximum-subarray/)
- [최대 합 원형 부분 배열 (Maximum Sum Circular Subarray)](https://leetcode.com/problems/maximum-sum-circular-subarray/)
- [최대 곱 부분 배열 (Maximum Product Subarray)](https://leetcode.com/problems/maximum-product-subarray/)
- [최소 비용 계단 오르기 (Minimum Cost Climbing Stairs)](https://leetcode.com/problems/min-cost-climbing-stairs/)

### 이진 탐색(Binary Search)
- [이진 탐색 (Binary Search)](https://leetcode.com/problems/binary-search/)
- [회전된 정렬 배열에서 검색 (Search in Rotated Sorted Array)](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [회전된 정렬 배열에서 최소값 찾기 (Find Minimum in Rotated Sorted Array)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [두 정렬된 배열의 중앙값 찾기 (Median of Two Sorted Arrays)](https://leetcode.com/problems/median-of-two-sorted-arrays/)

### 힙(Heap)
- [배열에서 K번째 큰 요소 (Kth Largest Element in an Array)](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [K개의 정렬된 리스트 병합 (Merge k Sorted Lists)](https://leetcode.com/problems/merge-k-sorted-lists/)
- [가장 빈번한 요소들 (Top K Frequent Elements)](https://leetcode.com/problems/top-k-frequent-elements/)
- [데이터 스트림에서 중앙값 찾기 (Find Median from Data Stream)](https://leetcode.com/problems/find-median-from-data-stream/)

### 비트 조작(Bit Manipulation)
- [유일한 수 (Single Number)](https://leetcode.com/problems/single-number/)
- [1의 개수 (Number of 1 Bits)](https://leetcode.com/problems/number-of-1-bits/)
- [누락된 숫자 (Missing Number)](https://leetcode.com/problems/missing-number/)
- [비트 뒤집기 (Reverse Bits)](https://leetcode.com/problems/reverse-bits/)

### 수학(Math)
- [에라토스테네스의 체 (Sieve of Eratosthenes)](https://leetcode.com/problems/count-primes/)
- [최대공약수(GCD)와 최소공배수(LCM)](https://leetcode.com/problems/greatest-common-divisor-of-strings/)
- [피보나치 수 (Fibonacci Number)](https://leetcode.com/problems/fibonacci-number/)
- [3의 제곱 여부 판별 (Power of Three)](https://leetcode.com/problems/power-of-three/)

### 1차원 동적 프로그래밍(1D DP)
- [계단 오르기 (Climbing Stairs)](https://leetcode.com/problems/climbing-stairs/)
- [집 도둑 (House Robber)](https://leetcode.com/problems/house-robber/)
- [가장 긴 증가하는 부분 수열 (Longest Increasing Subsequence)](https://leetcode.com/problems/longest-increasing-subsequence/)
- [동전 교환 (Coin Change)](https://leetcode.com/problems/coin-change/)

### 다차원 동적 프로그래밍(Multidimensional DP)
- [유일한 경로 (Unique Paths)](https://leetcode.com/problems/unique-paths/)
- [가장 긴 공통 부분 수열 (Longest Common Subsequence)](https://leetcode.com/problems/longest-common-subsequence/)
- [편집 거리 (Edit Distance)](https://leetcode.com/problems/edit-distance/)
- [최대 정사각형 (Maximal Square)](https://leetcode.com/problems/maximal-square/)