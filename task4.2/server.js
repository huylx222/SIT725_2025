var express = require("express")
var app = express()
var port = process.env.PORT || 3000
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Define your schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// REST API route 
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: 'Success' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error fetching projects' });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.json({ statusCode: 201, data: savedProject, message: 'Project created successfully' });
    } catch (error) {
        res.json({ statusCode: 500, data: null, message: 'Error creating project' });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});