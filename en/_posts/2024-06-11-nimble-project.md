---
layout: post
title: "Project Nimble"
subtitle: "Dreaming of Automation in Digital Marketing"
date: 2024-06-11 02:00:00 +0900
last_modified_at: 2024-06-11 02:00:00 +0900
categories: ["project"]
tags: ["selenium", "docker", "gcp", "cicd", "infra"]
lang: en
---

## Table of Contents
1. [Introduction to Project Nimble](#introduction-to-project-nimble)
    1. [Key Features](#key-features)
    2. [Expected Benefits](#expected-benefits)
    3. [My Role and Technologies Used](#my-role-and-technologies-used)
2. [Project Architecture](#project-architecture)
    1. [Phase 1 Design](#phase-1-design)
    2. [Phase 2 Design](#phase-2-design)
    3. [Phase 3 Design](#phase-3-design)

<br><br>

## Introduction to Project Nimble

Project Nimble aims to automate digital marketing. The modern digital marketing environment is rapidly evolving with the introduction of AI. To keep up and develop efficient and effective marketing strategies, automation is essential. Nimble is a solution developed to meet this need.

### Key Features

1. **Automated Marketing Management**
    - Project Nimble automates various digital marketing processes end-to-end.

2. **Generative AI-Based Marketing**
    - Utilizes AI technology to analyze and apply real-time changes in SEO and trends.

### Expected Benefits

- **Increased Efficiency**
    - Automation allows clients to focus on their core tasks.

- **Accurate Marketing**
    - Efficient marketing through real-time data analysis and AI-based insights.

- **Cost Savings**
    - Reduced labor and operational costs through automation and infrastructure enhancement.

### My Role and Technologies Used

- **Algorithm Implementation**
    - Python
    - Selenium

- **Infrastructure Setup and Management**
    - GitHub Actions
    - GCP
    - Docker
    - Airflow
    - Database (SQLite, PostgreSQL)
    - Linux
    - Terraform

<br><br>

## Project Architecture

### Phase 1 Design
{% include image.html src="/assets/img/nimble_architecture_phase1.png" alt="Phase 1 Design" width="700" %}

**Design Highlights**
- Users directly run the program.
- Users purchase or request a license from the administrator.
- Administrators grant licenses and provide the client program.
- The core logic (Client), which runs daily, verifies its validity with the license server using its key.

**Technologies Used**
- PYQT5, GCP, RDB, FastAPI, Selenium

**Feedback**
- Users find it challenging to run the program themselves.
- Difficulty in updating and distributing new client programs to existing clients.
- Inconvenience for administrators to manage licenses directly.

### Phase 2 Design
{% include image.html src="/assets/img/nimble_architecture_phase2.png" alt="Phase 2 Design" width="700" %}

**Design Highlights**
- Users enter necessary information upon payment, and the payment platform automatically calls the API.
- All subsequent tasks are executed automatically on the server.

**Technologies Used**
- GCP, RDB, FastAPI, Selenium, Terraform, Docker, Airflow, Linux

**Feedback**
- Increased infrastructure maintenance costs.
- No CI/CD pipeline, requiring developers to understand the entire infrastructure structure to modify and apply source code.

### Phase 3 Design
{% include image.html src="/assets/img/nimble_architecture_phase3.png" alt="Phase 3 Design" width="700" %}

**Design Highlights**
- Reducing costs by managing the database as a file through Buckets.
- For maintainability, core logic is separated into a separate GitHub repository and CI/CD is implemented with Cloud Build.
- Tasks previously managed by Airflow are implemented with Cloud Function, reducing management effort and costs.

**Technologies Used**
- GCP, RDB, FastAPI, Selenium, Docker, Terraform, Linux

**Improvements**
- Monitoring: Currently outputting simple TXT -> Apply by connecting open-source monitoring tools.
- CloudBuild w/ Terraform: Managing cloud build triggers with Terraform is problematic (suspected Terraform bug) - Fix planned.
- Unit Test: Need to establish an environment for periodically (weekly) testing each function of Selenium.