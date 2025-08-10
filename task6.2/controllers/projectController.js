const { projectService } = require('../services');

const projectController = {
    // Get all projects 
    getAllProjects: async (req, res) => {
        try {
            // Get data from database via service
            const projects = await projectService.getAllProjects();
            
            res.json({
                statusCode: 200, 
                data: projects, 
                message: "Success"
            });
        } catch (error) {
            console.error('Error in getAllProjects:', error);
            res.status(500).json({
                statusCode: 500,
                data: [],
                message: "Error fetching projects"
            });
        }
    }
};

module.exports = projectController;