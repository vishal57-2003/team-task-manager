import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import CreateProjectModal from './CreateProjectModal';

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
    setShowCreateModal(false);
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects">
      <div className="projects-header">
        <h2>Projects</h2>
        {user.role === 'admin' && (
          <button 
            className="btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No projects found.</p>
          {user.role === 'admin' && (
            <button 
              className="btn"
              onClick={() => setShowCreateModal(true)}
              style={{ marginTop: '1rem' }}
            >
              Create Your First Project
            </button>
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>Created by:</strong> {project.createdBy.name}</p>
              <p><strong>Members:</strong> {project.members.length}</p>
              <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
              
              <div className="project-actions">
                <Link 
                  to={`/tasks/${project._id}`}
                  className="btn-small btn-primary"
                >
                  View Tasks
                </Link>
                <button className="btn-small btn-secondary">
                  Manage Members
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </div>
  );
};

export default Projects;