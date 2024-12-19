const express = require("express")
const router = new express.Router();
const classController = require('../controllers/classesController');
const validate = require('../middleware/validation-middleware');
const { isAuthenticated } = require('../middleware/authenticate')

router.get("/", classController.getAll);
router.get("/:classId", classController.getSingle);
router.post(
    '/',
    isAuthenticated,
    validate.saveClass,
    classController.createClass
);
router.put(
    '/:id',
    isAuthenticated,
    validate.saveClass,
    classController.updateClass
);
router.delete(
    '/:id',
    isAuthenticated,
    classController.deleteClass);

module.exports = router;