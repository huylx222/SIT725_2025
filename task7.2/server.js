var express = require("express")
var mongoose = require('mongoose')
var app = express()

// Create HTTP server from app - IMPORTANT: This is required for socket.io
const http = require('http').createServer(app);
// Pass http server to socket.io
const io = require('socket.io')(http);

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

    // Socket.io connection handling - Following the slides example
    io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        
        // Send random number every second to all connected clients
        setInterval(() => {
            socket.emit('number', parseInt(Math.random() * 10));
        }, 1000);
    });
    
    var port = process.env.PORT || 3000;
    
    http.listen(port, () => {
        console.log("Visit: http://localhost:" + port);
        console.log("API test: http://localhost:" + port + "/api/projects");
        console.log("Server test: http://localhost:" + port + "/test");
        console.log("Socket.io server ready!");
    })
    
} catch (error) {
    console.error("Error starting server:", error);
}