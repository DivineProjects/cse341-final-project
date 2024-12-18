const { getAll } = require('./classes');
const mongodb = require('../data/database'); 
const { ObjectId } = require('mongodb');

const mockClasses = [
    {
        _id: new ObjectId(),
        "classId": "CS101",
        "name": "Introduction to Computer Science",
        "teacher": "Dr. Emily Carter",
        "schedule": "Monday & Wednesday, 9:00 AM - 10:30 AM",
        "room": "Room 101",
        "capacity": 30
    },
    {
        _id: new ObjectId(),
        "classId": "MATH204",
        "name": "Advanced Mathematics",
        "teacher": "Prof. John Smith",
        "schedule": "Tuesday & Thursday, 11:00 AM - 12:30 PM",
        "room": "Room 202",
        "capacity": 25
    },
];

describe("getAll Classes Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const collectionMock = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue(mockClasses),
            }),
        };
        mongodb.getDatabase = jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue(collectionMock),
        });
    });

    it("should respond with a 200 status and return all classes", async () => {
        await getAll(req, res);

        expect(mongodb.getDatabase).toHaveBeenCalled();
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockClasses);
    });
});
