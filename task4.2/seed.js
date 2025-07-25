const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the same schema
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Sample data to insert
const sampleProjects = [
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
    },
    {
        title: "Kitten 4",
        image: "images/kitten-4.jpg",
        link: "About Kitten 4",
        description: "Demo description about kitten 4"
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        // Insert sample data
        const insertedProjects = await Project.insertMany(sampleProjects);
        console.log('Sample projects inserted:', insertedProjects.length);
        
        mongoose.connection.close();
        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

// Run the seeding
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB for seeding');
    seedDatabase();
});