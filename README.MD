# CodeSynth Backend

A backend service for CodeSynth that powers authentication, code workspace storage, collaborative rooms, whiteboard persistence, and real-time notifications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites)
  - [Environment](#environment)
  - [Run locally](#run-locally)
- [API Endpoints](#api-endpoints)

## Overview

This repository contains the backend API for the CodeSynth application. It is built with Node.js, Express, MongoDB, Mongoose, and Socket.IO. The backend also exposes a Yjs websocket endpoint at `/yjs` for collaborative editor synchronization.

## Features

- JWT authentication for user registration and login
- Code workspace create/read/update/delete operations
- Room creation, participant tracking, and room lifecycle management
- Whiteboard save and update support for persisted drawing state
- Socket.IO real-time events for room joins, leaves, file operations, and workspace save notifications
- Yjs websocket server for shared editor sync using `/yjs`

## Architecture

- `Express` serves REST API routes under `/api/v1/*`
- `Mongoose` handles MongoDB models for users, code documents, and rooms
- `Socket.IO` manages real-time room events and collaboration notifications
- `y-websocket` provides a Yjs websocket endpoint for collaborative editor state sync

## Screenshots

Add screenshots for the current backend flow once available. Suggested placeholders:

- `screenshots/backend-api.png`
- `screenshots/socket-events.png`
- `screenshots/yjs-sync.png`

## Local Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB instance or MongoDB Atlas cluster

### Environment

Copy the environment sample file and set required values:

```powershell
copy .env.example .env
```

Required variables:

- `PORT` - server port
- `MONGO_URI` - MongoDB connection string
- `TOKEN_SECRET` - JWT secret key

Optional legacy variable:

- `COHERE_KEY` - included in `.env.example`, but not required for the current frontend-backed experience

### Run locally

Install dependencies:

```powershell
npm install
```

Start the server in development mode:

```powershell
npm run dev
```

Or start normally:

```powershell
npm start
```

The backend listens on the configured `PORT` and accepts collaborative websocket upgrades at `/yjs`.

## API Endpoints

- `POST /api/v1/users/register` - register a new user
- `POST /api/v1/users/login` - login and receive a JWT token
- `GET /api/v1/codes` - list user code documents
- `POST /api/v1/codes` - create a new code document
- `PUT /api/v1/codes/:id` - update a code document
- `PUT /api/v1/codes/:id/whiteboard` - save whiteboard content for a code document
- `GET /api/v1/rooms` - list rooms for the current user
- `POST /api/v1/rooms/create` - create a new collaboration room
- `DELETE /api/v1/rooms/:id` - delete a room

For full details, inspect the `routes/` and `controllers/` directories.
