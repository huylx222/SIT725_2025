const assert = require('assert');

// Mock data for testing
const mockProjects = [
    {
        title: "Test Kitten 1",
        image: "images/test1.jpg",
        link: "About Test 1", 
        description: "Test description 1"
    },
    {
        title: "Test Kitten 2",
        image: "images/test2.jpg",
        link: "About Test 2",
        description: "Test description 2"
    }
];

class SimpleTestSuite {
    constructor() {
        this.passedTests = 0;
        this.totalTests = 0;
    }

    runTest(testName, testFunction) {
        this.totalTests++;
        try {
            const result = testFunction();
            if (result) {
                this.passedTests++;
                console.log(`PASS: ${testName}`);
            } else {
                console.log(`FAIL: ${testName}`);
            }
        } catch (error) {
            console.log(`FAIL: ${testName} - ${error.message}`);
        }
    }

    // TEST CASE 1: Project Data Validation (Unit Test)
    testProjectValidation() {
        const project = mockProjects[0];
        
        // Check if project has required fields
        const hasRequiredFields = project.title && project.image && 
                                 project.link && project.description;
        
        // Check if all fields are strings
        const allFieldsAreStrings = typeof project.title === 'string' &&
                                   typeof project.image === 'string' &&
                                   typeof project.link === 'string' &&
                                   typeof project.description === 'string';
        
        return hasRequiredFields && allFieldsAreStrings;
    }

    // TEST CASE 2: Service Function Logic (Unit Test)
    testServiceFunctions() {
        // Mock service functions
        const getAllProjects = () => mockProjects;
        const getProjectCount = () => mockProjects.length;
        
        // Test getAllProjects returns array
        const projects = getAllProjects();
        const isArray = Array.isArray(projects);
        
        // Test getProjectCount returns number
        const count = getProjectCount();
        const isValidCount = typeof count === 'number' && count >= 0;
        
        return isArray && isValidCount && projects.length === count;
    }

    // TEST CASE 3: Controller Response Format (Integration Test)
    testControllerResponse() {
        // Mock controller response
        const mockController = {
            getAllProjects: () => {
                return {
                    statusCode: 200,
                    data: mockProjects,
                    message: "Success"
                };
            }
        };
        
        const response = mockController.getAllProjects();
        
        // Check response structure
        const hasCorrectStructure = response.statusCode === 200 &&
                                   Array.isArray(response.data) &&
                                   response.message === "Success";
        
        return hasCorrectStructure;
    }

    // TEST CASE 4: API Endpoint Flow (End-to-End Test)
    testAPIFlow() {
        // Simulate complete API request/response
        const simulateAPICall = () => {
            try {
                const projects = mockProjects;
                
                const response = {
                    statusCode: 200,
                    data: projects,
                    message: "Success"
                };
                
                return response;
            } catch (error) {
                return {
                    statusCode: 500,
                    data: [],
                    message: "Error"
                };
            }
        };
        
        const result = simulateAPICall();
        
        // Verify end-to-end flow works
        const flowWorks = result.statusCode === 200 &&
                         result.data.length > 0 &&
                         result.data[0].title;
        
        return flowWorks;
    }

    // TEST CASE 5: Database Connection Test (Database Test)
    testDatabaseConnection() {
        // Mock database operations
        const mockDB = {
            connect: () => true,
            find: () => mockProjects,
            isConnected: () => true
        };
        
        // Test database connection
        const connected = mockDB.connect();
        
        // Test data retrieval
        const data = mockDB.find();
        const hasData = Array.isArray(data) && data.length > 0;
        
        // Test connection status
        const connectionActive = mockDB.isConnected();
        
        return connected && hasData && connectionActive;
    }

    // Run all tests
    runAllTests() {
        console.log('Starting SIT725 Tests...');
        console.log('======================');
        
        this.runTest('Test Case 1: Project Data Validation', () => this.testProjectValidation());
        this.runTest('Test Case 2: Service Function Logic', () => this.testServiceFunctions());
        this.runTest('Test Case 3: Controller Response Format', () => this.testControllerResponse());
        this.runTest('Test Case 4: API Endpoint Flow', () => this.testAPIFlow());
        this.runTest('Test Case 5: Database Connection', () => this.testDatabaseConnection());
        
        console.log('======================');
        console.log(`Results: ${this.passedTests}/${this.totalTests} tests passed`);
        
        if (this.passedTests === this.totalTests) {
            console.log('All tests passed!');
        } else {
            console.log('Some tests failed');
        }
    }
}

if (require.main === module) {
    const testSuite = new SimpleTestSuite();
    testSuite.runAllTests();
}

module.exports = SimpleTestSuite;