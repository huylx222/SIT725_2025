const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers');

// GET /api/projects 
router.get('/', projectController.getAllProjects);

module.exports = router;