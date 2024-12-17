const { getAll } = require('./students');
const mongodb = require('../data/database'); 
const { ObjectId } = require('mongodb');

// Mock MongoDB collection for 'student'
const mockStudents = [
    {
        _id: new ObjectId(),
        "name": "John Doe",
        "age": 20,
        "email": "johndoe@example.com",
        "classes": [
            "CS101",
            "PHY101"
        ],
        "grades": [
            "GRADE001",
            "GRADE004"
        ],
        "clubs": [
            "CLUB001"
        ],
        "enrollmentDate": "2023-08-25T00:00:00Z"
    },
    {
        _id: new ObjectId(),
        "name": "Jane Smith",
        "age": 22,
        "email": "janesmith@example.com",
        "classes": [
            "MATH204",
            "ENG150"
        ],
        "grades": [
            "GRADE002"
        ],
        "clubs": [],
        "enrollmentDate": "2023-08-26T00:00:00Z"
    },
];

describe("getAll Students Controller", () => {
    let req, res;

    beforeEach(() => {
        // Mock req and res objects
        req = {};
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock MongoDB getDatabase().collection('student').find()
        const collectionMock = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue(mockStudents),
            }),
        };
        mongodb.getDatabase = jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue(collectionMock),
        });
    });

    it("should respond with a 200 status and return all students", async () => {
        await getAll(req, res);

        expect(mongodb.getDatabase).toHaveBeenCalled();
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockStudents);
    });
});
