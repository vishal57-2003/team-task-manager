const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /projects - Create new project (admin only)
router.post('/projects', auth, adminOnly, async (req, res) => {
  try {
    const { name } = req.body;

    const project = new Project({
      name,
      createdBy: req.user._id,
      members: [req.user._id] // Creator is automatically a member
    });

    await project.save();
    await project.populate('createdBy', 'name email');
    await project.populate('members', 'name email');

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /projects - Get all projects for authenticated user
router.get('/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id
    })
    .populate('createdBy', 'name email')
    .populate('members', 'name email')
    .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /projects/:id/add-member - Add member to project
router.post('/projects/:id/add-member', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const projectId = req.params.id;

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project creator or admin
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only project creator or admin can add members.' });
    }

    // Check if user exists
    const userToAdd = await User.findById(userId);
    if (!userToAdd) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already a member
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of this project' });
    }

    // Add user to project
    project.members.push(userId);
    await project.save();
    await project.populate('members', 'name email');

    res.json({
      message: 'Member added successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;