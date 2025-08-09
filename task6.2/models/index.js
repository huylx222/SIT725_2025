// models/index.js - MongoDB model for our kitten projects
const mongoose = require('mongoose');

// Define the Project Schema - blueprint for our kitten cards
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Project model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Project
};