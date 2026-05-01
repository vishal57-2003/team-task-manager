# Team Task Manager - Full Stack Application

A complete team task management application with React frontend and Node.js backend, featuring user authentication, project management, and Kanban-style task tracking.

## 🚀 Live Demo

- **Frontend:** [Coming Soon - Railway Deployment]
- **Backend API:** [Coming Soon - Railway Deployment]
- **GitHub Repository:** https://github.com/vishal57-2003/team-task-manager

## 🛠 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Role-based access control

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design
- Kanban board interface

## ✨ Features

### Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Role-based access (Admin/Member)
- Secure password hashing

### Project Management
- Create projects (Admin only)
- Add team members to projects
- View project statistics
- Project-based task organization

### Task Management
- Create, update, and delete tasks
- Kanban board (Todo → In Progress → Done)
- Task assignment to team members
- Due date tracking
- Task descriptions and metadata

### User Interface
- Responsive design for all devices
- Modern, clean interface
- Real-time status updates
- Dashboard with statistics
- Intuitive navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/vishal57-2003/team-task-manager.git
cd team-task-manager
```

2. Install backend dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the frontend development server:
```bash
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Projects
- `POST /api/projects` - Create project (Admin only)
- `GET /api/projects` - Get user's projects
- `POST /api/projects/:id/add-member` - Add member to project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:projectId` - Get project tasks
- `PUT /api/tasks/:id` - Update task

## 🌐 Deployment

### Railway Deployment

#### Backend Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy backend service

#### Frontend Deployment
1. Build the React application
2. Deploy to Railway or Vercel
3. Update API URL in environment variables

## 📁 Project Structure

```
team-task-manager/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   └── App.js       # Main application
│   ├── public/
│   └── package.json
└── README.md
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Environment variable protection

## 🎯 Usage Examples

### Creating an Admin User
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### Creating a Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "My Project"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vishal Giri**
- GitHub: [@vishal57-2003](https://github.com/vishal57-2003)
- Project: [Team Task Manager](https://github.com/vishal57-2003/team-task-manager)