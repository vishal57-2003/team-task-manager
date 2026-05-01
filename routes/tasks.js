const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');

const router = express.Router();

// POST /tasks - Create new task
router.post('/tasks', auth, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    // Check if project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this project.' });
    }

    // If assignedTo is provided, check if that user is a project member
    if (assignedTo && !project.members.includes(assignedTo)) {
      return res.status(400).json({ message: 'Cannot assign task to user who is not a project member' });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    await task.save();
    await task.populate('assignedTo', 'name email');
    await task.populate('projectId', 'name');

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /tasks/:projectId - Get all tasks for a project
router.get('/tasks/:projectId', auth, async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Check if project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this project.' });
    }

    const tasks = await Task.find({ projectId })
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /tasks/:id - Update task
router.put('/tasks/:id', auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, assignedTo, status, dueDate } = req.body;

    // Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is a member of the project
    const project = await Project.findById(task.projectId);
    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this project.' });
    }

    // If assignedTo is being changed, check if new user is a project member
    if (assignedTo && !project.members.includes(assignedTo)) {
      return res.status(400).json({ message: 'Cannot assign task to user who is not a project member' });
    }

    // Update task fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;

    await task.save();
    await task.populate('assignedTo', 'name email');
    await task.populate('projectId', 'name');

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;