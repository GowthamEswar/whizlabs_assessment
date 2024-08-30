# Microservices Project

This project consists of three separate services: User, Product, and Chat. Each service is designed and implemented with different architectural patterns and technologies to demonstrate various approaches to building scalable and maintainable applications.

## Table of Contents

- [Introduction](#introduction)
- [Services Overview](#services-overview)
  - [User Service](#user-service)
  - [Product Service](#product-service)
  - [Chat Service](#chat-service)


## Introduction

This project showcases three distinct services, each with a different focus and architectural approach:

- **User Service**: A serverless service built using AWS Lambda, focusing on user management.
- **Product Service**: A domain-driven design (DDD) service for managing products in an e-commerce platform.
- **Chat Service**: A real-time chat application built using the MVC (Model-View-Controller) architecture.

## Services Overview

### User Service

The User Service is a serverless application implemented using AWS Lambda. It handles user-related functionalities such as registration, authentication, and profile management.

- **Architecture**: Serverless
- **Technology Stack**: AWS Lambda, Node.js, DynamoDB
- **Features**:
  - User registration and login
  - Password management
  - Profile updates

### Chat Service

The Chat Service is a real-time chat application built using the MVC architecture. It allows users to join chat rooms and communicate in real time.

- **Architecture**: MVC (Model-View-Controller)
- **Technology Stack**: Node.js, Express, Socket.IO, MongoDB
- **Features**:
  - Real-time messaging
  - Multiple chat rooms
  - User presence notifications

### Product Service

### Product Service

The Product Service is built using the Domain-Driven Design (DDD) pattern, providing a robust foundation for managing products within the system.

- **Architecture**: Domain-Driven Design (DDD)
- **Technology Stack**: Node.js, TypeScript, PostgreSQL
- **Features**:
  - Create, update, and delete products
  - Fetch product details
  - Product inventory management