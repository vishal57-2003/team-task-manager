import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tasksAPI, projectsAPI } from '../services/api';
import CreateTaskModal from './CreateTaskModal';

const Tasks = ({ user }) => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchProjectAndTasks = useCallback(async () => {
    try {
      // Fetch project details
      const projectsResponse = await projectsAPI.getAll();
      const currentProject = projectsResponse.data.projects.find(p => p._id === projectId);
      setProject(currentProject);

      // Fetch tasks
      const tasksResponse = await tasksAPI.getByProject(projectId);
      setTasks(tasksResponse.data.tasks);
    } catch (error) {
      console.error('Error fetching project and tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectAndTasks();
  }, [fetchProjectAndTasks]);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowCreateModal(false);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await tasksAPI.update(taskId, { status: newStatus });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.task : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (!project) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Project not found or you don't have access to it.</p>
        <Link to="/projects" className="btn">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="tasks">
      <div className="tasks-header">
        <div>
          <h2>{project.name} - Tasks</h2>
          <Link to="/projects" style={{ color: '#667eea' }}>← Back to Projects</Link>
        </div>
        <button 
          className="btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Task
        </button>
      </div>

      <div className="task-columns">
        <div className="task-column todo-column">
          <h3>To Do ({getTasksByStatus('todo').length})</h3>
          {getTasksByStatus('todo').map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        <div className="task-column progress-column">
          <h3>In Progress ({getTasksByStatus('in-progress').length})</h3>
          {getTasksByStatus('in-progress').map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        <div className="task-column done-column">
          <h3>Done ({getTasksByStatus('done').length})</h3>
          {getTasksByStatus('done').map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateTaskModal
          projectId={projectId}
          projectMembers={project.members}
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
};

const TaskCard = ({ task, onStatusChange }) => {
  const getStatusOptions = (currentStatus) => {
    const statuses = ['todo', 'in-progress', 'done'];
    return statuses.filter(status => status !== currentStatus);
  };

  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      
      <div className="task-meta">
        <span>
          {task.assignedTo ? `Assigned to: ${task.assignedTo.name}` : 'Unassigned'}
        </span>
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
      
      <div style={{ marginTop: '0.5rem' }}>
        <select 
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={{ fontSize: '12px', padding: '0.25rem' }}
        >
          <option value={task.status}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </option>
          {getStatusOptions(task.status).map(status => (
            <option key={status} value={status}>
              Move to {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Tasks;