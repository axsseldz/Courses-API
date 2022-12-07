const express = require('express');

const { math } = require('../Data/Data');

const routerMath = express.Router();

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

module.exports = routerMath;

