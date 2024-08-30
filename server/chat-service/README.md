# Socket.IO Chat Application

This is a real-time chat application built using Node.js and Socket.IO, following the MVC (Model-View-Controller) architecture.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This chat application allows users to join chat rooms and exchange messages in real time. It leverages Socket.IO for real-time communication and is structured following the MVC architecture, which separates the application logic into Models, Views, and Controllers.

## Features

- **Real-Time Communication**: Instant messaging using Socket.IO.
- **Multiple Chat Rooms**: Users can join different chat rooms.
- **User Notifications**: Displays user join/leave notifications in the chat.
- **MVC Architecture**: Clean separation of concerns with Models, Views, and Controllers.

## Architecture

The application is structured following the MVC architecture:

- **Model**: Manages data and business logic.
- **View**: Handles the presentation layer.
- **Controller**: Processes user input and interacts with the Model.

### Directory Structure
```
├── node_modules (.gitignore)
├── src
│ ├── routes
│ │ │ ├── chatRoute
| | | ├── messageRoute
│ ├── controllers
│ │ │ ├── chatController
| | | ├── messageController
│ ├── middleware
│ | | ├── auth
│ ├── models
│ | | ├── chat
│ | | ├── message
│ ├── server.tsx
├── .env
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
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

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

