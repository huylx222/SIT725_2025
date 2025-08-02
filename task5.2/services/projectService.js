const { cardListModel } = require('../models');

const projectService = {
    // Get all projects 
    getAllProjects: () => {
        return cardListModel;
    },

    // Get project count
    getProjectCount: () => {
        return cardListModel.length;
    }
};

module.exports = projectService;