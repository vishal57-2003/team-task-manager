# 🚀 Railway Deployment Guide

## Step-by-Step Railway Deployment

### 1. Deploy Backend to Railway

1. **Go to Railway.app** and sign up/login
2. **Create New Project** → **Deploy from GitHub repo**
3. **Connect your GitHub** account and select `team-task-manager` repository
4. **Select the root directory** (backend files are in root)
5. **Set Environment Variables** in Railway dashboard:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://taskmanager:Anuj69622giri@cluster0.idxy298.mongodb.net/team-task-manager?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
6. **Deploy** - Railway will automatically build and deploy
7. **Copy the backend URL** (e.g., `https://your-app.railway.app`)

### 2. Deploy Frontend to Railway

1. **Create another Railway service** for frontend
2. **Connect same GitHub repo** but select `frontend` folder as root directory
3. **Set Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
4. **Deploy** - Railway will build React app and serve it
5. **Copy the frontend URL**

### 3. Update CORS (Important!)

After deployment, update your backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.railway.app'],
  credentials: true
}));
```

### 4. Test Your Live Application

1. Visit your frontend URL
2. Sign up as admin user
3. Create projects and tasks
4. Verify all functionality works

## Alternative: Deploy Frontend to Vercel

If you prefer Vercel for frontend:

1. **Connect Vercel** to your GitHub repo
2. **Set root directory** to `frontend`
3. **Add environment variable**: `REACT_APP_API_URL=https://your-backend.railway.app/api`
4. **Deploy**

## Troubleshooting

### Common Issues:
- **CORS errors**: Update backend CORS settings
- **API not found**: Check environment variables
- **Build fails**: Ensure all dependencies are in package.json
- **Database connection**: Verify MongoDB URI is correct

### Environment Variables Checklist:
**Backend:**
- ✅ PORT
- ✅ MONGODB_URI  
- ✅ JWT_SECRET

**Frontend:**
- ✅ REACT_APP_API_URL

## Final URLs

After successful deployment, you'll have:
- **Backend API**: `https://your-backend.railway.app`
- **Frontend App**: `https://your-frontend.railway.app`
- **GitHub Repo**: `https://github.com/vishal57-2003/team-task-manager`