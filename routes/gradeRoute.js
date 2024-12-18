const express = require('express');
const gradeController = require('../controllers/gradesController');
const validate = require('../middleware/validation-middleware');

const router = express.Router();

// Fetch all grades
router.get('/', gradeController.getAll);

router.get('/:classId', gradeController.getSingle);

// Add a new grade
router.post('/', validate.saveGrade, gradeController.createGrade);

// Update an existing grade
router.put('/:id', validate.saveGrade, gradeController.updateGrade);

// Delete a grade
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
