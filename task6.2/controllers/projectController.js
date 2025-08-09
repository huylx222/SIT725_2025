// controllers/projectController.js - Business logic for kitten projects with database
const { projectService } = require('../services');

const projectController = {
    // Get all projects - now with database operations
    getAllProjects: async (req, res) => {
        try {
            // Get data from database via service
            const projects = await projectService.getAllProjects();
            
            // Business logic: format response exactly as your original code
            res.json({
                statusCode: 200, 
                data: projects, 
                message: "Success"
            });
        } catch (error) {
            console.error('Error in getAllProjects:', error);
            // Error handling
            res.status(500).json({
                statusCode: 500,
                data: [],
                message: "Error fetching projects"
            });
        }
    }
};

module.exports = projectController;