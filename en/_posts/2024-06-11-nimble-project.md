---
layout: post
title: "Project Nimble"
subtitle: "Pursuing Automation in Digital Marketing"
date: 2024-06-11 02:00:00 +0900
categories: ["project"]
lang: en
---

### Introduction to Project Nimble

Project Nimble aims to automate digital marketing. The modern digital marketing environment is rapidly evolving with the adoption of AI, and automation is essential to establish efficient and effective marketing strategies. Nimble is a solution developed to meet this need.

### Key Features

1. **Automated Marketing Management**
    - Project Nimble automates various digital marketing processes end-to-end.

2. **AI-Driven Marketing**
    - Utilizes AI technology to analyze and apply real-time changes in SEO and trends.

### Expected Benefits

- **Increased Efficiency**
    - Automation allows clients to focus on their core tasks.

- **Accurate Marketing**
    - Real-time data analysis and AI-driven insights enable effective marketing strategies.

- **Cost Reduction**
    - Automation and infrastructure optimization reduce labor and operational costs.

### My Role

- **Core Logic Development**
    - Implement the core logic used in the project.

- **Infrastructure Setup and Management**
    - Build and manage the infrastructure for the service.
    - Establish a development environment for maintenance.

### Project Structure

#### Phase 1 Design
{% include image.html src="/assets/img/nimble_architecture_phase1.png" alt="Phase 1 Design" width="700" %}
The initial design involves running the logic directly on the end-user's system. Users purchase or request licenses from the administrator, who then grants the licenses and provides the client program. The core logic, which runs daily, verifies its validity with the license server using its key upon each execution.

**Infrastructure Management**
- Code management using Git
- GCP instance management via console and SSH

**Feedback**
- Users find it burdensome to run the program themselves.
- It is challenging to distribute new programs to existing clients whenever updates are available.
- Administrators find it inconvenient to manage licenses manually.

#### Phase 2 Design
{% include image.html src="/assets/img/nimble_architecture_phase2.png" alt="Phase 2 Design" width="700" %}
The design evolved based on feedback from Phase 1. When users enter the necessary information at the point of purchase, the payment platform automatically calls the API. Subsequently, all necessary tasks are executed automatically on the server.

**Infrastructure Management**
- Code management using Git
- Deployment using GitHub Actions
- Code-based infrastructure management using GCP API Client

**Feedback**
- Increased infrastructure maintenance costs.
- Increased complexity, leading to a burden on developers.

#### Phase 3 Design (In Progress)
{% include image.html src="/assets/img/nimble_architecture_phase3.png" alt="Phase 3 Design" width="700" %}
The design has further evolved based on feedback from Phase 2. This phase is still in progress.

**Infrastructure Management**
- Code management using Git
- Deployment using GitHub Actions
- Introduction of IaC concepts using Terraform