const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Simple Calculator Server!');
});

// Add 
app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.send('Please provide valid numbers. Example: /add?a=5&b=3');
    }
    
    const result = a + b;
    res.send(`${a} + ${b} = ${result}`);
});

// Subtract 
app.get('/subtract', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.send('Please provide valid numbers. Example: /subtract?a=10&b=3');
    }
    
    const result = a - b;
    res.send(`${a} - ${b} = ${result}`);
});

// Multiply 
app.get('/multiply', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.send('Please provide valid numbers. Example: /multiply?a=4&b=7');
    }
    
    const result = a * b;
    res.send(`${a} × ${b} = ${result}`);
});

// Divide 
app.get('/divide', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.send('Please provide valid numbers. Example: /divide?a=15&b=3');
    }
    
    if (b === 0) {
        return res.send('Error: Cannot divide by zero');
    }
    
    const result = a / b;
    res.send(`${a} ÷ ${b} = ${result}`);
});

// POST method for addition
app.post('/add', (req, res) => {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.send('Please provide valid numbers in request body. Example: {"a": 5, "b": 3}');
    }
    
    const result = a + b;
    res.send(`${a} + ${b} = ${result}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try these endpoints:`);
    console.log(`- Addition: http://localhost:${PORT}/add?a=5&b=3`);
    console.log(`- Subtraction: http://localhost:${PORT}/subtract?a=10&b=3`);
    console.log(`- Multiplication: http://localhost:${PORT}/multiply?a=4&b=7`);
    console.log(`- Division: http://localhost:${PORT}/divide?a=15&b=3`);
    console.log(`- POST Addition: Use curl or Postman to send JSON to /add`);
});