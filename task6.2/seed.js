const mongoose = require('mongoose');
const { projectService } = require('./services');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const kittenProjects = [
    {
        title: "Kitten 2",
        image: "images/kitten-2.jpg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/kitten-3.jpg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        const existingProjects = await projectService.getAllProjects();
        console.log(`📊 Found ${existingProjects.length} existing projects`);
        
        if (existingProjects.length === 0) {
            console.log('Inserting kitten projects...');
            const createdProjects = [];
            
            for (const projectData of kittenProjects) {
                const newProject = await projectService.createProject(projectData);
                createdProjects.push(newProject);
                console.log(`Created project: ${newProject.title}`);
            }
            
            console.log(`🎉 Successfully seeded database with ${createdProjects.length} kitten projects`);
            
            // Display created projects
            console.log('\n🐾 Kitten Projects in Database:');
            createdProjects.forEach((project, index) => {
                console.log(`${index + 1}. ${project.title} - ${project.description}`);
            });
        } else {
            console.log('Database already has projects. Skipping seeding.');
            console.log('To re-seed, delete existing projects first or drop the collection.');
        }
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed');
        console.log('Seeding process completed!');
    }
};

// Run the seeding when connected
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB for seeding');
    seedDatabase();
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});