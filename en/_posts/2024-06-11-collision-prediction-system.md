---
layout: post
title: "Collision Prediction System"
subtitle: "A Real-time Collision Prediction Alert System Using Monocular Cameras"
date: 2024-06-11 13:00:00 +0900
last_modified_at: 2024-06-11 13:00:00 +0900
categories: ["project"]
tags: ["opencv", "python", "deeplearning"]
lang: en
---
{% include image.html src="/assets/img/cps_demo.gif" alt="cps_demo_gif" width="500" %}

### Background
- The commercialization of delivery robots utilizing autonomous driving technology has significantly increased the demand for depth estimation technology.
- Traditional distance estimation is possible with Lidar sensors, but they are expensive.
- Videos captured on the streets often include people's faces, making it difficult to use such data.

### Expected Benefits
- Prevent safety accidents through distance measurement technology using monocular cameras.
- Overcome the limitations of monocular cameras in adverse weather conditions using deep learning.
- Reduce costs by using monocular cameras instead of expensive Lidar sensors.

### My Role
- Implementation of Python GUI app.
- Implementation of real-time model serving server.

### Models Used
- YoloWorld
- Depth Anything

### Project Structure
{% include image.html src="/assets/img/cps_architecture.png" alt="cps structure" width="700" %}

### Technologies Used
- PYQT5
- OpenCV
- WebSockets
- FastAPI
- Lock
- ONNX
- Pytorch

### Project Link
<a href="https://github.com/boostcampaitech6/level2-3-cv-finalproject-cv-12" target="_blank">GitHub Repository</a>