import React, { useState, useEffect } from 'react';
import { projectsAPI, tasksAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const projectsResponse = await projectsAPI.getAll();
      const projects = projectsResponse.data.projects;
      
      let totalTasks = 0;
      let completedTasks = 0;
      
      // Fetch tasks for each project
      for (const project of projects) {
        try {
          const tasksResponse = await tasksAPI.getByProject(project._id);
          const tasks = tasksResponse.data.tasks;
          totalTasks += tasks.length;
          completedTasks += tasks.filter(task => task.status === 'done').length;
        } catch (error) {
          console.error('Error fetching tasks for project:', project._id);
        }
      }
      
      setStats({
        totalProjects: projects.length,
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome back, {user.name}!</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalProjects}</h3>
          <p>Total Projects</p>
        </div>
        
        <div className="stat-card">
          <h3>{stats.totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
        
        <div className="stat-card">
          <h3>{stats.completedTasks}</h3>
          <p>Completed Tasks</p>
        </div>
        
        <div className="stat-card">
          <h3>{stats.pendingTasks}</h3>
          <p>Pending Tasks</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {user.role === 'admin' && (
            <a href="/projects" className="btn-small btn-primary">
              Create New Project
            </a>
          )}
          <a href="/projects" className="btn-small btn-secondary">
            View All Projects
            </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;