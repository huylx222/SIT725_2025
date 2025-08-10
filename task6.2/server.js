var express = require("express")
var mongoose = require('mongoose')
var app = express()

console.log("Starting server with database...");

try {
    const { projectsRoute } = require('./routes');
    console.log("Routes loaded successfully");
    
    app.use(express.static(__dirname+'/public'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    console.log("Middleware configured");

    // MongoDB connection
    mongoose.connect('mongodb://localhost:27017/myprojectDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB - myprojectDB');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error:', err);
    });

    // Mount the routes
    app.use('/api/projects', projectsRoute);
    console.log("API routes mounted");

    // Test route to check if server is working
    app.get('/test', (req, res) => {
        res.send('Server with database is working!');
    });

    var port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log("Visit: http://localhost:" + port);
        console.log("API test: http://localhost:" + port + "/api/projects");
        console.log("Server test: http://localhost:" + port + "/test");
    })
    
} catch (error) {
    console.error("Error starting server:", error);
}