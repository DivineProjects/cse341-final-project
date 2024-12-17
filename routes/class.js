const express = require("express")
const router = new express.Router();
const classController = require('../controllers/classes');
const validate = require('../middleware/validation-middleware');

router.get("/", classController.getAll);
router.get("/:classId", classController.getSingle);
router.post(
    '/',
    // validate.saveClass,
    classController.createClass
);
router.put(
    '/:id',
    // validate.saveClass,
    classController.updateClass
);
router.delete(
    '/:id',
    classController.deleteClass);

module.exports = router;