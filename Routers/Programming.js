const express = require('express');

const { programming } = require('../Data/Data');

const routerProgramming = express.Router();

// Process request
routerProgramming.use(express.json());


//Programming Courses
routerProgramming.get('/', (req, res) => {
    res.json(programming);

});


//Programming Courses - Languages
routerProgramming.get('/:language', (req, res) => {
    const language = req.params.language;
    const results = programming.filter(course => course.language === language);

    if (results.length === 0) {
        return res.status(404).end();
    }

    // Filter by level
    if (req.query.level === 'beginner') {
        res.send(results.filter(level => level.level === 'beginner'))

    } else if (req.query.level === 'advanced') {
        res.send(results.filter(level => level.level === 'advanced'))
    } else {
        res.status(404).end();
    }

    res.json(results);
});


routerProgramming.post('/', (req, res) => {
    let newCourse = req.body;
    programming.push(newCourse)
    res.json(programming)
})

routerProgramming.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = programming.findIndex(course => course.id == id);

    if (index >= 0) {
        programming.splice(index, 1);
    }
    res.json(programming);
});



module.exports = routerProgramming;