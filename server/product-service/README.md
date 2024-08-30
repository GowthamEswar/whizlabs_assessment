# Product Service

This is a Product Service built with Node.js and TypeScript, following Domain-Driven Design (DDD) principles.

## Introduction

The Product Service is part of a microservices architecture, focusing on managing products within an e-commerce platform. It handles tasks like creating, updating, fetching, and deleting products. The service is built using Node.js, TypeScript, and adheres to Domain-Driven Design (DDD) principles to ensure a well-structured and maintainable codebase.

## Features

- **Create Product**: Allows creating new products.
- **Update Product**: Provides functionality to update existing products.
- **Get Product**: Fetches product details by ID.
- **Delete Product**: Removes a product from the catalog.
- **Domain-Driven Design (DDD)**: The service is structured according to DDD principles, ensuring a clean separation of concerns.

## Architecture

This service is designed using Domain-Driven Design (DDD) principles, which include:

- **Domain Layer**: Contains the business logic and rules.
- **Application Layer**: Handles use cases and orchestrates tasks.
- **Infrastructure Layer**: Manages data access and external service integrations.
- **Interface Layer**: Exposes APIs and handles user interactions.

### Directory Structure
```
├── node_modules (.gitignore)
├── src
│ ├── modules
│ │ │ ├── cart
| | | ├── common
│ │ │ ├──  product
│ | | │ ├── controller
│ | | │ ├── model
│ | | │ ├── respositry
│ | | │ ├── service
│ | | │ ├── validation
│ ├── test
│ │ └── product.test.ts
│ ├── index.tsx
├── .env
├── jest.config.json
├── Dockerfile
├── .dockerignore
└── tsconfig.json
├── .gitignore
├── package.json
└── README.md
└── package-lock.json
```

## For Run Project in local
cearte .env file 
MONGO_URI=mongodb+srv://username:password@cluster0.ovgstfb.mongodb.net/ecommerce?retryWrites=true&w=majority

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the unit test result.

### `npm run build`

Builds the app for production to the `dist` folder.\

### `API Documentation`

GET /api/products: Retrieve all products. \
POST /api/products: Add a new product. \
GET /api/products/ 
: Retrieve a product by ID. \
PUT /api/products/
: Update a product by ID. \
DELETE /api/products/
: Delete a product by ID. \

