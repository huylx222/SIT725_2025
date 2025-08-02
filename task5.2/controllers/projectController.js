const { projectService } = require('../services');

const projectController = {
    // Get all projects 
    getAllProjects: (req, res) => {
        try {
            // Get data from service
            const projects = projectService.getAllProjects();
           
            res.json({
                statusCode: 200, 
                data: projects, 
                message: "Success"
            });
        } catch (error) {
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