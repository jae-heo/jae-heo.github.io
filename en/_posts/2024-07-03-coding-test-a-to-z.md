---
layout: post
title: "All-in-One Guide to Coding Tests"
subtitle: "Sharing the process of preparing for coding tests."
date: 2024-07-03 22:00:00 +0900
last_modified_at: 2024-07-03 22:00:00 +0900
categories: ["tutorial"]
tags: ["algorithm"]
lang: en
---

## Table of Contents
1. [Introduction to Coding Tests](#introduction-to-coding-tests)
   - [What is a Coding Test?](#what-is-a-coding-test)
   - [Benefits of Coding Tests](#benefits-of-coding-tests)
   - [Types of Coding Tests](#types-of-coding-tests)
2. [Preparing for Coding Tests](#preparing-for-coding-tests)
   - [Learning Basic Concepts](#learning-basic-concepts)
   - [Data Structures and Algorithms](#data-structures-and-algorithms)
   - [Practicing Problem-Solving](#practicing-problem-solving)
   - [Recommended Learning Resources and Websites](#recommended-learning-resources-and-websites)
3. [Essential Algorithms and Data Structures](#essential-algorithms-and-data-structures)
   - [Arrays and Strings](#arrays-and-strings)
   - [Linked Lists](#linked-lists)
   - [Stacks and Queues](#stacks-and-queues)
   - [Trees and Graphs](#trees-and-graphs)
   - [Hash Tables](#hash-tables)
   - [Sorting and Searching Algorithms](#sorting-and-searching-algorithms)
   - [Dynamic Programming](#dynamic-programming)
4. [Coding Test Checklist](#coding-test-checklist)
   - [Arrays](#arrays)
   - [Strings](#strings)
   - [Two Pointers](#two-pointers)
   - [Sliding Window](#sliding-window)
   - [Matrix](#matrix)
   - [HashMap](#hashmap)
   - [Intervals](#intervals)
   - [Stack](#stack)
   - [Linked List](#linked-list)
   - [Binary Tree](#binary-tree)
   - [Binary Tree Search](#binary-tree-search)
   - [Graph](#graph)
   - [BFS/DFS](#bfsdfs)
   - [Graph BFS](#graph-bfs)
   - [Trie](#trie)
   - [Backtracking](#backtracking)
   - [Divide & Conquer](#divide--conquer)
   - [Kadane's Algorithm](#kadanes-algorithm)
   - [Binary Search](#binary-search)
   - [Heap](#heap)
   - [Bit Manipulation](#bit-manipulation)
   - [Math](#math)
   - [1D DP](#1d-dp)
   - [Multidimensional DP](#multidimensional-dp)

<br>
<br>

## Before You Start

If you are already somewhat familiar with coding tests, it's best to skip ahead to the [Coding Test Checklist](#coding-test-checklist).

<br>
<br>

## Introduction to Coding Tests

### What is a Coding Test?

A coding test is an exam designed to evaluate an applicant's programming skills. It is mainly required for technical positions, including software development. In a coding test, candidates solve given problems by determining and implementing algorithms in code, assessing their problem-solving skills, coding ability, and understanding of algorithms. Coding tests can be conducted online via platforms or on-site. They are a crucial part of technical interviews in the hiring process, used to verify the candidate's basic coding skills.

### Benefits of Coding Tests

- **Skill Assessment**: An effective way to evaluate a candidate's basic programming skills, ensuring they can perform coding tasks required in actual work.
- **Problem-Solving Ability**: Assesses the candidate's ability to solve problems efficiently and think algorithmically.
- **Fair Evaluation**: Provides an objective and fair method to evaluate candidates, minimizing subjective bias.
- **Preparation Evaluation**: Shows how well-prepared a candidate is, reflecting their study efforts and readiness.
- **Cultural Fit**: Helps evaluate how well a candidate fits with the company's tech stack and culture, ensuring they can adapt and contribute effectively.

### Types of Coding Tests

- **Online Coding Tests**: Candidates solve and submit problems on an online platform, often with time limits and automatic grading systems.
- **Whiteboard Coding Tests**: Conducted during on-site interviews, where candidates solve problems and write code on a whiteboard, allowing interviewers to observe their thought process.
- **Programming Assignments**: Candidates are given a few days to complete a programming task, allowing in-depth problem-solving.
- **Pair Programming Tests**: Candidates work with an interviewer to solve problems, evaluating their collaboration and communication skills.
- **Algorithm and Data Structure Tests**: Tests that evaluate the candidate's understanding of specific algorithms and data structures, focusing on problem-solving and optimization skills.

<br>
<br>

## Preparing for Coding Tests

### Learning Basic Concepts

Building a solid foundation is crucial when preparing for coding tests. Understanding basic syntax, functions, variables, and data types is essential. Common programming languages include Python, Java, C++, and JavaScript. It's recommended to choose one and study it in-depth.

#### Basic Concepts to Learn:
- Variables and Data Types
- Conditional Statements and Loops
- Functions and Scope
- List, Array, and String Manipulation
- Input/Output Handling

### Data Structures and Algorithms

The core of coding tests lies in data structures and algorithms. Solving problems requires selecting appropriate data structures and implementing efficient algorithms. It's important to fully understand commonly used data structures and algorithms and practice using them.

#### Key Data Structures:
- Arrays
- Linked Lists
- Stacks and Queues
- Hash Tables
- Trees and Graphs
- Heaps

#### Key Algorithms:
- Sorting (Bubble, Selection, Insertion, Quick, Merge Sort)
- Searching (Binary Search, BFS, DFS)
- Recursion and Backtracking
- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer

### Practicing Problem-Solving

Understanding theory alone is not enough. Practicing by solving various problems is crucial. Using online coding platforms to practice is highly effective.

#### Practice Methods:
- Solve problems daily for a consistent period.
- After solving, review other people's solutions to learn new approaches.
- Practice problems of varying difficulty levels.
- Review and re-solve problems you found difficult or made mistakes on.

### Recommended Learning Resources and Websites

Utilizing good learning resources and websites is important for effective preparation. Here are some recommended resources and sites for coding test preparation.

#### Online Coding Platforms:
- **[LeetCode](https://leetcode.com/)**: Provides problems of various difficulty levels, optimized for interview preparation.
- **[HackerRank](https://www.hackerrank.com/)**: Offers problems in algorithms, databases, AI, and more.
- **[CodeSignal](https://codesignal.com/)**: Allows practice in environments similar to real coding tests.
- **[Codewars](https://www.codewars.com/)**: Offers various coding challenges to improve programming skills.
- **[AtCoder](https://atcoder.jp/)**: A well-known Japanese online judge site with a variety of algorithm problems.

#### Other Learning Resources:
- **[GeeksforGeeks](https://www.geeksforgeeks.org/)**: Provides tutorials and problems on various data structures and algorithms.
- **[Coursera](https://www.coursera.org/)**, **[edX](https://www.edx.org/)**: Platforms offering online courses on data structures and algorithms.
- **[YouTube](https://www.youtube.com/)**: A source for various programming lectures and algorithm explanation videos.

<br>
<br>

## Essential Algorithms and Data Structures

Understanding and utilizing algorithms and data structures frequently tested in coding tests is essential. Below are the key algorithms and data structures to master.

### Arrays and Strings

#### Arrays
Arrays are data structures that store elements of the same type in contiguous memory locations. Key features of arrays include fast element access via indexing and fixed size, requiring resizing for element insertion or deletion.

#### Strings
Strings are sequences of characters stored as arrays. Key operations on strings include length measurement, character access, substring extraction, and comparison. Common algorithms for handling strings include string searching (KMP, Rabin-Karp) and string sorting.

### Linked Lists

Linked lists are data structures where each node contains data and a reference to the next node. The key advantage of linked lists is dynamic resizing and fast insertion/deletion.

- **Singly Linked List**: Each node has a reference to the next node.
- **Doubly Linked List**: Each node has references to both the previous and next nodes.
- **Circular Linked List**: The last node references the first node, forming a circle.

### Stacks and Queues

#### Stacks
Stacks follow Last-In-First-Out (LIFO) order. They are used for function call storage, reverse string creation, and parentheses validation. Key operations include push, pop, and peek.

#### Queues
Queues follow First-In-First-Out (FIFO) order. They are used for breadth-first search (BFS) and task scheduling. Key operations include enqueue, dequeue, and front.

### Trees and Graphs

#### Trees
Trees are hierarchical data structures with root and child nodes. Binary trees have nodes with at most two children. Key operations include insertion, deletion, and traversal (DFS, BFS).

- **Binary Search Tree (BST)**: Left subtree contains values less than the root, and the right subtree contains values greater than the root.
- **Heaps**: Complete binary trees that allow fast retrieval of maximum or minimum values.

#### Graphs
Graphs consist of nodes and edges connecting them. Types include directed/undirected and weighted/unweighted graphs. Key operations include traversal (DFS, BFS), shortest path finding (Dijkstra, Bellman-Ford), and minimum spanning tree (Prim, Kruskal).

### Hash Tables

Hash tables map keys to values, supporting fast lookup, insertion, and deletion. Hash functions convert keys to hash values, determining storage locations. Collision resolution methods include chaining and open addressing.

### Sorting and Searching Algorithms

#### Sorting Algorithms
Sorting algorithms arrange data in a specific order. Key sorting algorithms include:
- **Bubble Sort**: Compares and swaps adjacent elements.
- **Selection Sort**: Finds the minimum value and swaps it with the first element.
- **Insertion Sort**: Inserts elements into the correct position in a sorted part.
- **Quick Sort**: Divides based on a pivot and sorts recursively.
- **Merge Sort**: Divides and merges sorted parts.
- **Heap Sort**: Uses heap data structure for sorting.

#### Searching Algorithms
Searching algorithms find desired values within data. Key searching algorithms include:
- **Linear Search**: Sequentially checks each element.
- **Binary Search**: Searches by repeatedly dividing a sorted array in half.

### Dynamic Programming

Dynamic programming solves complex problems by breaking them into smaller subproblems. It uses memoization to store results of subproblems and reduce calculations. Dynamic programming is useful for optimization problems, such as Fibonacci sequence, knapsack problem, and longest common subsequence (LCS).

<br>
<br>

## Coding Test Checklist

Wondering if you're well-prepared for coding tests? Review the content below and fill in any gaps or areas of weakness.

### Arrays
- Array declaration
  ```python
  arr = []
  arr = [1, 2, 3]
  ```

- Adding elements
  ```python
  arr = [1, 2, 3]
  arr.append(4)  # [1, 2, 3, 4]
  ```

- Removing elements
  ```python
  arr = [1, 2, 3, 4]
  arr.remove(2)  # [1, 3, 4]
  del arr[1]     # [1, 4]
  ```

- Finding length
  ```python
  arr = [1, 2]
  length = len(arr)  # 2
  ```

- Slicing
  ```python
  arr = [1, 2, 3, 4]
  sub_arr = arr[0:2]  # [1, 2]
  ```

- Iterating
  ```python
  arr = [1, 2, 3]
  for element in arr:
      print(element)
  # Output:
  # 1
  # 2
  # 3
  ```

- Reversing
  ```python
  arr = [1, 2, 3]
  arr.reverse()   # [3, 2, 1]
  arr = arr[::-1] # [1, 2, 3]
  ```

- Sorting
  ```python
  arr = [3, 1, 2]
  arr.sort()  # [1, 2, 3]
  sorted_arr = sorted(arr)  # [1, 2, 3]
  ```

### Strings
- String declaration
  ```python
  s = "hello"
  ```

- Substring extraction
  ```python
  s = "hello"
  sub_str = s[1:4]  # "ell"
  ```

- Finding length
  ```python
  s = "hello"
  length = len(s)  # 5
  ```

- String concatenation
  ```python
  s = "hello"
  s2 = "world"
  s3 = s + " " + s2  # "hello world"
  ```

- Splitting strings
  ```python
  s = "hello world"
  words = s.split()  # ['hello', 'world']
  ```

- Joining strings
  ```python
  strs = ["hi", "hello", "bye"]
  "".join(strs) # hihellobye
  " ".join(strs) # hi hello bye
  "-".join(strs) # hi-hello-bye
  ```

- Searching strings
  ```python
  s = "hello"
  index = s.find("e")  # 1
  ```

- Replacing in strings
  ```python
  s = "hello"
  s1 = s.replace("l", "r")  # "herro"
  ```

- Reversing strings
  ```python
  s = "hello"
  s_rev = s[::-1]  # "olleh"
  ```

### Two Pointers
- [Palindrome](https://leetcode.com/problems/valid-palindrome/)
- [Subsequence](https://leetcode.com/problems/is-subsequence/)
- [Two Sum (with sorted array)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [Water Container](https://leetcode.com/problems/container-with-most-water/)

### Sliding Window
- [Maximum Sum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/)

### Matrix
- [Rotate Matrix](https://leetcode.com/problems/rotate-image/)
- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- [Number of Islands](https://leetcode.com/problems/number-of-islands/)

### HashMap
- [Two Sum](https://leetcode.com/problems/two-sum/)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

### Intervals
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

### Stack
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [Min Stack](https://leetcode.com/problems/min-stack/)
- [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

### Linked List
- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

### Binary Tree
- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [Path Sum](https://leetcode.com/problems/path-sum/)
- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

### Binary Tree Search
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)
- [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

### Graph
- [Clone Graph](https://leetcode.com/problems/clone-graph/)
- [Course Schedule](https://leetcode.com/problems/course-schedule/)
- [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
- [Redundant Connection](https://leetcode.com/problems/redundant-connection/)

### BFS/DFS
- [Word Ladder](https://leetcode.com/problems/word-ladder/)
- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Clone Graph](https://leetcode.com/problems/clone-graph/)
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

### Graph BFS
- [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)
- [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/)
- [Open the Lock](https://leetcode.com/problems/open-the-lock/)
- [Minimum Knight Moves](https://leetcode.com/problems/minimum-knight-moves/)

### Trie
- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Add and Search Word](https://leetcode.com/problems/add-and-search-word-data-structure-design/)
- [Word Search II](https://leetcode.com/problems/word-search-ii/)
- [Replace Words](https://leetcode.com/problems/replace-words/)

### Backtracking
- [Permutations](https://leetcode.com/problems/permutations/)
- [Combination Sum](https://leetcode.com/problems/combination-sum/)
- [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)
- [Word Search](https://leetcode.com/problems/word-search/)

### Divide & Conquer
- [Merge Sort](https://leetcode.com/problems/sort-an-array/)
- [Quick Sort](https://leetcode.com/problems/sort-an-array/)
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

### Kadane's Algorithm
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/)
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [Minimum Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

### Binary Search
- [Binary Search](https://leetcode.com/problems/binary-search/)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

### Heap
- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

### Bit Manipulation
- [Single Number](https://leetcode.com/problems/single-number/)
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- [Missing Number](https://leetcode.com/problems/missing-number/)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/)

### Math
- [Sieve of Eratosthenes](https://leetcode.com/problems/count-primes/)
- [GCD and LCM](https://leetcode.com/problems/greatest-common-divisor-of-strings/)
- [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)
- [Power of Three](https://leetcode.com/problems/power-of-three/)

### 1D DP
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [House Robber](https://leetcode.com/problems/house-robber/)
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Coin Change](https://leetcode.com/problems/coin-change/)

### Multidimensional DP
- [Unique Paths](https://leetcode.com/problems/unique-paths/)
- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [Edit Distance](https://leetcode.com/problems/edit-distance/)
- [Maximal Square](https://leetcode.com/problems/maximal-square/)