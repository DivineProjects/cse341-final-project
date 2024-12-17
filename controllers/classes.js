const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['classes']
    const result = mongodb.getDatabase().collection('classes').find();
    result.toArray().then(classes => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['classes']
    const classID = req.params.classId;
    const result = mongodb.getDatabase().collection('classes').find({ classId: classID });
    result.toArray().then(classes => {
        if (classes.length === 0) {
            return res.status(404).json({ message: `${classID} not found` });
          }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes[0]);
    }).catch(err => {
        res.status(500).json({ message: "Error Fetching class" });
    });
};

const createClass = async (req, res) => {
    //#swagger.tags=['classes']
    const { classId, name, email,teacher, schedule, room, capacity } = req.body;
    const newClass = {     
        classId, 
        name, 
        email,
        teacher, 
        schedule, 
        room, 
        capacity 
    };
    const result = await mongodb.getDatabase().collection('classes').insertOne(newClass);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the class');
    }
};

const updateClass = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid class ID to update employee');

    //#swagger.tags=['classes']
    const classDbId = new ObjectId(req.params.id);
    const { classId, name, email,teacher, schedule, room, capacity  } = req.body;
    const newClass = {     
        classId, 
        name, 
        email,
        teacher, 
        schedule, 
        room, 
        capacity 
    };
    const result = await mongodb.getDatabase().collection('classes').replaceOne({ _id: classDbId }, newClass);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating class');
    }
};

const deleteClass = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid class ID to delete class');

    //#swagger.tags=['classes']
    const classDbId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('classes').deleteOne({ _id: classDbId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the class');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createClass,
    updateClass,
    deleteClass
 };