---
layout: post
title: "Project Nimble"
subtitle: "Dreaming of Automation in Digital Marketing"
date: 2024-06-11 02:00:00 +0900
last_modified_at: 2024-06-11 02:00:00 +0900
categories: ["project"]
lang: en
---

### Introduction to Project Nimble

Project Nimble aims to automate digital marketing. The digital marketing environment is rapidly changing with the adoption of AI, and automation is essential for creating efficient and effective marketing strategies. Nimble is a solution developed to meet this need.

### Key Features

1. **Automated Marketing Management**
    - Project Nimble automates various digital marketing tasks end-to-end.

2. **Generative AI-based Marketing**
    - Utilizes AI technology to analyze and apply real-time SEO and trends.

### Expected Benefits

- **Increased Efficiency**
    - Automation allows clients to focus on their core tasks.

- **Accurate Marketing**
    - Conducts efficient marketing through real-time data analysis and AI-based insights.

- **Cost Reduction**
    - Reduces labor and operational costs through automation and advanced infrastructure.

### My Role and Technologies Used

- **Algorithm Implementation**
    - Selenium
    - GPT API

- **Infrastructure Setup and Management**
    - Github Action
    - GCP
    - Docker
    - Airflow
    - Database (sqlite, postgresql)
    - Linux
    - Terraform

### Project Structure

#### Phase 1 Design
{% include image.html src="/assets/img/nimble_architecture_phase1.png" alt="Phase 1 Design" width="700" %}
The system was designed to execute logic directly on the end-user's system. Users purchase or request a license from the administrator, who then grants the license and provides the client program. The core logic, executed daily, verifies its validity with the license server using its key each time it runs.

**Feedback**
- Users find it burdensome to run the program themselves.
- Distributing new programs to existing clients with each update is challenging.
- Administrators find manual license management inconvenient.

#### Phase 2 Design
{% include image.html src="/assets/img/nimble_architecture_phase2.png" alt="Phase 2 Design" width="700" %}
This design evolved from the feedback received in Phase 1. Users enter the required information during payment, and the payment platform automatically calls the API. Subsequent tasks are executed automatically on the server.

**Feedback**
- Increased infrastructure maintenance costs.
- Increased complexity burdens developers.

#### Phase 3 Design (In Progress)
{% include image.html src="/assets/img/nimble_architecture_phase3.png" alt="Phase 3 Design" width="700" %}
This design further evolves from the feedback received in Phase 2. It is currently being implemented.