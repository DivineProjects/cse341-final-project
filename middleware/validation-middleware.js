const validator = require('../helpers/validate');
const saveStudent = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "age": "required|string",
        "email": "required|string|email",
        "enrollmentDate": "required|date"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Invalid student info',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => {res.status(500).send({
        success: false,
        message: 'Internal server error'
    })})
}

const saveClass = async (req, res, next) => {
    const validationRule = {
        "classId": "required|string",
        "name": "required|string", 
        "email": "required|string|email",
        "teacher": "required|string", 
        "schedule" : "required|string", 
        "room": "required|integer", 
        "capacity": "required|integer",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Invalid class info',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => {res.status(500).send({
        success: false,
        message: 'Internal server error'
    })})
}

const saveClub = async (req, res, next) => {
    const validationRule = {
        "name": "required|string", 
        "description": "required|string", 
        "president": "required|string", 
        "meetingSchedule": "required|string", 
        "location": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Invalid club info',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    });
};


const saveGrade = async (req, res, next) => {
    const validationRule = {
        "studentId": "required|string", 
        "classId": "required|string",   
        "grade": "required|string",     
        "semester": "required|string",  
        "remarks": "required|string"    
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Invalid grade info',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    });
};

module.exports = {
    saveStudent,
    saveClass,
    saveClub,
    saveGrade
};