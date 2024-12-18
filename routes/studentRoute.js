const express = require("express")
const router = new express.Router();
const studentsController = require('../controllers/studentsController');
const validate = require('../middleware/validation-middleware');

router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getSingle);
router.post(
    '/',
    validate.saveStudent,
    studentsController.createStudent
);
router.put(
    '/:id',
    validate.saveStudent,
    studentsController.updateStudent
);
router.delete(
    '/:id',
    studentsController.deleteStudent);

module.exports = router;