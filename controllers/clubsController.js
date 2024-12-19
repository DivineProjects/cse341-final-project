const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllClub = async (req, res) => {
    //#swagger.tags=['Club']
    const result = mongodb.getDatabase().collection('clubs').find();
    result.toArray().then(classes => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    }).catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const getSingleClub = async (req, res) => {
    //#swagger.tags=['Club']
    const nameId = req.params.name;
    const result = mongodb.getDatabase().collection('clubs').find({ name: nameId });
    result.toArray().then(clubs => {
        if (clubs.length === 0) {
            return res.status(404).json({ message: `${nameId} not found` });
          }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clubs[0]);
    }).catch(err => {
        res.status(500).json({ message: "Error Fetching clubs" });
    });
};

// Create a new Club
const createClub = async (req, res) => {
    //#swagger.tags=['Club']
  
    const {name, description, president, meetingSchedule, location} = req.body;
    const newClub = {     
        name, 
        description, 
        president, 
        meetingSchedule, 
        location
    };
    const result = await mongodb.getDatabase().collection('clubs').insertOne(newClub);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the club');
    }
};


// Update an exam
const updateClub = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid club ID to update');

    //#swagger.tags=['Club']
    const clubId = new ObjectId(req.params.id);
    const {name, description, president, meetingSchedule, location} = req.body;
    const newClub = {     
        name, 
        description, 
        president, 
        meetingSchedule, 
        location
    };
    const result = await mongodb.getDatabase().collection('clubs').replaceOne({ _id: clubId}, newClub);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating class');
    }
};


// Delete an club
const deleteClub = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid ID to delete club');

    //#swagger.tags=['Club']
    const clubId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('clubs').deleteOne({ _id: clubId });
    if (result.deletedCount > 0) {
        res.status(204).send().json({ message: 'Club deleted' });
    } else {
        res.status(500).json({message: 'Some error occured while deleting the class'});
    }
};

module.exports = { 
    getAllClub,
    getSingleClub,
    createClub,
    updateClub,
    deleteClub
 };