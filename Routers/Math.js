const express = require('express');

const { math } = require('../Data/Data');

const routerMath = express.Router();

// Process request
routerMath.use(express.json());

//Math Courses
routerMath.get('/', (req, res) => {
    res.json(math);

});


//Math Courses - Languages
routerMath.get('/:subject', (req, res) => {
    const subject = req.params.subject;
    const results = math.filter(course => course.subject === subject);

    if (results.length === 0) {
        return res.status(404).end();
    }

    // Filter by beginner level
    if (req.query.level === 'beginner') {
        return res.send(results.filter(level => level.level === 'beginner'))
    }

    // Filter by advanced level 
    if (req.query.level === 'advanced') {
        return res.send(results.filter(level => level.level === 'intermediate'))
    }

    res.json(results);
});

routerMath.post('/', (req, res) => {
    let newCourse = req.body;
    math.push(newCourse)
    res.json(math)
})

routerMath.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = math.findIndex(course => course.id == id);

    if (index >= 0) {
        math.splice(index, 1);
    }
    res.json(math);
});


module.exports = routerMath;

