# Team Task Manager Backend

A Node.js + Express backend for a team task management application with user authentication, project management, and task tracking.

## Features

- User authentication (signup/login with JWT)
- MongoDB database using Mongoose
- Role-based access control (admin/member)
- Project management
- Task management with status tracking

## Models

### User
- name, email, password, role (admin/member)

### Project
- name, createdBy, members

### Task
- title, description, projectId, assignedTo, status (todo, in-progress, done), dueDate

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Projects
- `POST /api/projects` - Create project (admin only)
- `GET /api/projects` - Get user's projects
- `POST /api/projects/:id/add-member` - Add member to project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:projectId` - Get project tasks
- `PUT /api/tasks/:id` - Update task

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

## Usage

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Example Requests

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"admin"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### Create Project (Admin only)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"name":"My Project"}'
```

#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"title":"Task 1","description":"Task description","projectId":"<project-id>","dueDate":"2024-12-31"}'
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- Protected routes with middleware