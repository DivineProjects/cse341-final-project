const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['students']
    const result = mongodb.getDatabase().collection('student').find();
    result.toArray().then(students => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid student ID to find student');

    //#swagger.tags=['students']
    const studentId = new ObjectId(req.params.id.toString());
    const result = mongodb.getDatabase().collection('student').find({ _id: studentId });
    result.toArray().then(students => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    }).catch(err => {
       console.log(err);
    });
};

const createStudent = async (req, res) => {
    //#swagger.tags=['students']
    const { name, age, email, classes, grades, clubs, enrollmentDate } = req.body;
    const student = {     
        name,
        age,
        email,
        classes,
        grades,
        clubs,
        enrollmentDate
    };
    const result = await mongodb.getDatabase().collection('student').insertOne(student);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the student');
    }
};

const updateStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid student ID to update employee');

    //#swagger.tags=['students']
    const studentDbId = new ObjectId(req.params.id);
    const { name, age, email, classes, grades, clubs, enrollmentDate } = req.body;
    const student = {     
        name,
        age,
        email,
        classes,
        grades,
        clubs,
        enrollmentDate
    };
    const result = await mongodb.getDatabase().collection('student').replaceOne({ _id: studentDbId }, student);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating student');
    }
};

const deleteStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid student ID to delete student');

    //#swagger.tags=['students']
    const studentDbId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('student').deleteOne({ _id: studentDbId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the student');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
 };