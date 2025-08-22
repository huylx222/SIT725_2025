const { Project } = require('../models');

const projectService = {
    // Get all projects from MongoDB
    getAllProjects: async () => {
        try {
            const projects = await Project.find({}).sort({ createdAt: -1 });
            return projects;
        } catch (error) {
            throw error;
        }
    },

    // Get project count from database
    getProjectCount: async () => {
        try {
            const count = await Project.countDocuments();
            return count;
        } catch (error) {
            throw error;
        }
    },

    // Create a new project (optional - for seeding)
    createProject: async (projectData) => {
        try {
            const newProject = new Project(projectData);
            const savedProject = await newProject.save();
            return savedProject;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = projectService;