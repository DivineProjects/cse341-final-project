const { getSingle } = require('./studentsController');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Mock student data
const mockStudent = {
    _id: new ObjectId(),
    name: "John Doe",
    age: 20,
    email: "johndoe@example.com",
    classes: ["CS101", "PHY101"],
    grades: ["GRADE001", "GRADE004"],
    clubs: ["CLUB001"],
    enrollmentDate: "2023-08-25T00:00:00Z"
};

describe("getSingle Student Controller", () => {
    let req, res, collectionMock;

    beforeEach(() => {
        req = { params: { id: mockStudent._id.toString() } };
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        collectionMock = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([mockStudent]),
            }),
        };

        mongodb.getDatabase = jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue(collectionMock),
        });
    });

    it("should respond with a 200 status and return a single student", async () => {
        await getSingle(req, res);

        expect(mongodb.getDatabase).toHaveBeenCalled();
        expect(collectionMock.find).toHaveBeenCalledWith({ _id: new ObjectId(req.params.id) });
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockStudent);
    });
});