const express = require('express');

const { programming } = require('../Data/Data');

const routerProgramming = express.Router();


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

    // Filter by beginner level
    if (req.query.level === 'beginner') {
        return res.send(results.filter(level => level.level === 'beginner'))
    }

    // Filter by advanced level 
    if (req.query.level === 'advanced') {
        return res.send(results.filter(level => level.level === 'advanced'))
    }

    res.json(results);
});

module.exports = routerProgramming;