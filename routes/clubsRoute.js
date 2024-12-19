const express = require('express');
const clubController = require('../controllers/clubsController');
const router = express.Router();
const validate = require('../middleware/validation-middleware');
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', clubController.getAllClub);           // Fetch all exams
router.get('/:name', clubController.getSingleClub)
router.post('/', isAuthenticated, validate.saveClub, clubController.createClub);        // Create a new exam
router.put('/:id', isAuthenticated, validate.saveClub, clubController.updateClub);      // Update an exam
router.delete('/:id', isAuthenticated, clubController.deleteClub);   // Delete an exam

module.exports = router;
