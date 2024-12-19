const { getSingle } = require('./classesController');
const mongodb = require('../data/database');

describe("getSingle Class Controller", () => {
    let req, res, collectionMock;

    // Mock class data
    const mockClass = {
        _id: "675add29daa264092257d7c9",
        classId: "MATH204",
        name: "Advanced Mathematics",
        teacher: "Prof. John Smith",
        schedule: "Tuesday & Thursday, 11:00 AM - 12:30 PM",
        room: "Room 202",
        capacity: 25
    };

    beforeEach(() => {
        req = { params: { classId: mockClass.classId } };
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        collectionMock = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([mockClass]),
            }),
        };

        mongodb.getDatabase = jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue(collectionMock),
        });
    });

    it("should respond with a 200 status and return a single class by classId", async () => {
        await getSingle(req, res);

        expect(mongodb.getDatabase).toHaveBeenCalled();
        expect(collectionMock.find).toHaveBeenCalledWith({ classId: req.params.classId });
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockClass);
    });

    it("should respond with a 404 status if the class is not found", async () => {
        collectionMock.find.mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValue([]),
        });

        await getSingle(req, res);

        expect(collectionMock.find).toHaveBeenCalledWith({ classId: req.params.classId });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: `${req.params.classId} not found` });
    });

});