const express = require('express');
const app = express();

const infoCourses = require('./Data/Data');


// Programming Router
const routerProgramming = require('./Routers/Programming');
app.use('/api/courses/programming', routerProgramming);



// Math Router
const routerMath = require('./Routers/Math');
app.use('/api/courses/math', routerMath);



//Home Page
app.get('/', (req, res) => {
    res.send('Courses for everyone 👨‍💻 🧬 🧮');
});



//Courses
app.get('/api/courses', (req, res) => {
    res.json(infoCourses);
});




const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});




