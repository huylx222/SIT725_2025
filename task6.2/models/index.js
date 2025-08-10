const mongoose = require('mongoose');

// Define the Project Schema - blueprint for kitten cards
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
    timestamps: true 
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Project
};