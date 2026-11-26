# Task Management REST API

A backend REST API built using **Node.js, Express.js, and MongoDB** with Mongoose. This project provides complete task management functionality, including CRUD operations, filtering, searching, sorting, pagination, and task statistics.

## Overview

The Task Management API allows users to manage tasks efficiently through RESTful endpoints. Each task contains information such as title, description, status, priority, assigned person, and due date.

This project was developed as part of a Backend Development Coding Test at Dice Academy.

## Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Language:** JavaScript
- **API Testing:** Postman
- **Development Tool:** Nodemon

## Features

- Create new tasks
- Retrieve all tasks
- Retrieve a single task by ID
- Update existing tasks
- Delete tasks
- Filter tasks by status
- Filter tasks by priority
- Apply multiple filters simultaneously
- Search tasks by title (case-insensitive)
- Sort tasks by creation date
- Paginate task results
- Combine filtering, searching, sorting, and pagination
- Generate task statistics using MongoDB aggregation
- Validate required fields and allowed enum values
- Handle errors with meaningful HTTP responses

## Project Structure

```text
backend-test/
│
├── config/
│   └── db.js
│
├── models/
│   └── task.model.js
│
├── controllers/
│   └── task.controller.js
│
├── routes/
│   └── task.routes.js
│
├── middleware/
│   └── error.middleware.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Task Schema

| Field | Type | Description |
|---|---|---|
| title | String | Task title (required) |
| description | String | Task description (required) |
| status | String | Task status |
| priority | String | Task priority |
| assignedTo | String | Assigned person |
| dueDate | Date | Task deadline |
| createdAt | Date | Automatically generated |
| updatedAt | Date | Automatically generated |

### Allowed Values

**Status**
- `pending`
- `in-progress`
- `completed`

**Priority**
- `low`
- `medium`
- `high`

## Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to Project

```bash
cd backend-test
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanagement
```

Make sure your local MongoDB server is running.

### 5. Start Development Server

```bash
npm run dev
```

The server will run at:

`http://localhost:5000`

## API Documentation

**Base URL**

```text
http://localhost:5000/api/tasks
```

### 1. Create Task

`POST /api/tasks`

Request Body:

```json
{
  "title": "Learn Node.js",
  "description": "Complete Express.js CRUD APIs",
  "status": "pending",
  "priority": "high",
  "assignedTo": "Parth",
  "dueDate": "2026-12-10"
}
```

### 2. Get All Tasks

`GET /api/tasks`

Returns all available tasks.

### 3. Get Single Task

`GET /api/tasks/:id`

Fetches a task using its MongoDB ObjectId.

### 4. Update Task

`PUT /api/tasks/:id`

Request Body:

```json
{
  "title": "Learn Advanced Node.js",
  "description": "Complete REST API development",
  "status": "in-progress",
  "priority": "medium"
}
```

### 5. Delete Task

`DELETE /api/tasks/:id`

Deletes a task using its ID.

### 6. Filter by Status

`GET /api/tasks?status=pending`

### 7. Filter by Priority

`GET /api/tasks?priority=high`

### 8. Multiple Filters

`GET /api/tasks?status=pending&priority=high`

### 9. Search Tasks by Title

`GET /api/tasks?search=node`

Uses MongoDB regex with case-insensitive matching.

### 10. Sort Tasks

Ascending:

`GET /api/tasks?sortBy=createdAt&order=asc`

Descending:

`GET /api/tasks?sortBy=createdAt&order=desc`

### 11. Pagination

`GET /api/tasks?page=1&limit=5`

Response includes:

- currentPage
- totalPages
- totalTasks
- limit
- data

### 12. Combined Query

`GET /api/tasks?status=pending&priority=high&search=node&sortBy=createdAt&order=desc&page=1&limit=5`

Combines filtering, searching, sorting, and pagination in one request.

### 13. Task Statistics

`GET /api/tasks/stats`

Returns task counts grouped by status using MongoDB aggregation.

Example Response:

```json
{
  "success": true,
  "data": {
    "totalTasks": 50,
    "pending": 20,
    "inProgress": 15,
    "completed": 15
  }
}
```

## Error Handling

The API handles common errors, including:

- Missing required fields
- Invalid status and priority values
- Invalid MongoDB ObjectIds
- Tasks that do not exist
- Database and server errors

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## Testing

All API endpoints can be tested using **Postman**.

Testing includes:
- CRUD operations
- Filtering and searching
- Sorting and pagination
- Combined query parameters
- Task statistics
- Error handling and validation

## Project Scope

This project focuses on backend development and REST API functionality.

- No frontend interface
- No authentication system
- MongoDB database integration
- RESTful API architecture

---

**Developed as a Backend Development Coding Test Project at Dice Academy.**