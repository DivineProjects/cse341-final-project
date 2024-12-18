const express = require("express")
const router = new express.Router();
const studentRouter = require('./studentRoute');
const swaggerRoute = require('./swagger');
const classRouter = require('./classRoute');
const clubRouter = require('./clubsRoute');
const gradeRouter = require('./gradeRoute');

router.use('/', swaggerRoute);

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Student Webservices');
});

router.use('/students', studentRouter);
router.use('/classes', classRouter);
router.use('/clubs', clubRouter);
router.use('/grades', gradeRouter);

module.exports = router;
