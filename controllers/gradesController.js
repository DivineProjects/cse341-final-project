const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['grades']
    const result = mongodb.getDatabase().collection('grades').find();
    result.toArray().then(grades => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(grades);
    }).catch(err => {
      res.status(500).json(result.error || 'Some error occured while creating the class');

    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['grades']
    const gradeId = req.params.classId;
    const result = mongodb.getDatabase().collection('grades').find({ classId: gradeId });
    result.toArray().then(grades => {
        if (grades.length === 0) {
            return res.status(404).json({ message: `${gradeId} not found` });
          }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(grades[0]);
    }).catch(err => {
        res.status(500).json({ message: "Error Fetching grade" });
    });
};

const createGrade = async (req, res) => {
    //#swagger.tags=['grades']
    const { studentId, classId, grade, semester, remarks } = req.body;
    const newGrade = {     
        studentId, 
        classId, 
        grade, 
        semester, 
        remarks
    };
    const result = await mongodb.getDatabase().collection('grades').insertOne(newGrade);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the grade');
    }
};

const updateGrade = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid grade ID to update employee');

    //#swagger.tags=['grades']
    const gradeId = new ObjectId(req.params.id);
    const { studentId, classId, grade, semester, remarks } = req.body;
    const newGrade = {     
        studentId, 
        classId, 
        grade, 
        semester, 
        remarks
    };
    const result = await mongodb.getDatabase().collection('grades').replaceOne({ _id: gradeId }, newGrade);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating grade');
    }
};

const deleteGrade = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid grade ID to delete grade');

    //#swagger.tags=['grades']
    const gradeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('grades').deleteOne({ _id: gradeId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the grade');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createGrade,
    updateGrade,
    deleteGrade
 };