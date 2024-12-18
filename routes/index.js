const express = require("express")
const router = new express.Router();
const students = require('./students');
const classes = require("./class")
const swaggerRoute = require('./swagger');
const classRouter = require('./class')

router.use('/', swaggerRoute);

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Student Webservices');
});

router.use('/students', students);
<<<<<<< HEAD
router.use('/classes', classRouter);
=======
router.use('/classes', classes);
>>>>>>> mark-branch

module.exports = router;
