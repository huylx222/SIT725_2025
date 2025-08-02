var express = require("express")
var app = express()

// Import routes using MVC structure
const { projectsRoute } = require('./routes');

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the routes 
app.use('/api/projects', projectsRoute);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})