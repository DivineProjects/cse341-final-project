const express = require('express');
const clubController = require('../controllers/clubsController');
const router = express.Router();
const validate = require('../middleware/validation-middleware')

router.get('/', clubController.getAllClub);           // Fetch all exams
router.get('/:name', clubController.getSingleClub)
router.post('/', validate.saveClub, clubController.createClub);        // Create a new exam
router.put('/:id', validate.saveClub, clubController.updateClub);      // Update an exam
router.delete('/:id', clubController.deleteClub);   // Delete an exam

module.exports = router;
