const express = require("express")
const router = new express.Router();
const studentsController = require('../controllers/studentsController');
const validate = require('../middleware/validation-middleware');
const { isAuthenticated } = require("../middleware/authenticate")

router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getSingle);
router.post(
    '/',
    isAuthenticated, 
    validate.saveStudent,
    studentsController.createStudent
);
router.put(
    '/:id',
    isAuthenticated, 
    validate.saveStudent,
    studentsController.updateStudent
);
router.delete(
    '/:id',
    isAuthenticated, 
    studentsController.deleteStudent);

module.exports = router;