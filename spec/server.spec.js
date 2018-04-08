var request = require('request');

var requestURL = 'http://localhost:3000/resume/';

describe('get resume', () => {
    it('should return 200 Ok', (done) => {
        request.get(requestURL, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    });
    it('should return a list that is not empty', (done) => {
        request.get(requestURL, (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        })
    })
});

describe('get resume for user', () => {
    var user = "Rodney Rear";
    var id = "rodney.rear.test";

    beforeAll((done) => {
        var message = { name: user, id: id,
            "title": "Full Stack Developer looking for opportunities",
            "email": "rodney.rear@gmail.com",
            "summary": { 
                "intro": "A highly-motivated, well-spoken and self-reliant active listener who enjoys collaborating on creative and intellectual challenges and welcomes opportunities to expand his skill set.",
                "points": [ "Experienced Agile Full Stack Developer", "17 years as a database application developer", "16 years in Object-Oriented development and advanced design patterns", "10 years experience in Java", "three years experience working on an enterprise application with six teams", "Web Application experience using Java servlets, jQuery, Angular, API"]
            },
            "education": [
                {"where": "DeVry Institute of Technology", "what": "Bachelor's Degree, Computer Information Systems", "when": "1990 - 1994"}
            ]
        };
        request.post({
            url: requestURL, 
            form: message
        }, (err, res, body) => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    });

    it('should return 200 Ok', (done) => {
        request.get(requestURL+user, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    });
    it('name should be ' + user, (done) => {
         request.get(requestURL+id, (err, res) => {
            expect(JSON.parse(res.body)[0].name.toLowerCase()).toEqual(user.toLowerCase());
            done();
        })
    });

    afterAll((done) => {
        request.delete(requestURL+id, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
            request.get(requestURL+id, (err, res) => {
                var content = JSON.parse(res.body);
                expect(content.length).toEqual(0);
                done();
            })
        })
    });
});

describe('write resume for user', () => {
    var user = "Rodney Rear";
    var id = "rodney.rear.test";

    var message = { name: user, id: id,
        "title": "Full Stack Developer looking for opportunities",
        "email": "rodney.rear@gmail.com",
        "summary": { 
            "intro": "A highly-motivated, well-spoken and self-reliant active listener who enjoys collaborating on creative and intellectual challenges and welcomes opportunities to expand his skill set.",
            "points": [ "Experienced Agile Full Stack Developer", "17 years as a database application developer", "16 years in Object-Oriented development and advanced design patterns", "10 years experience in Java", "three years experience working on an enterprise application with six teams", "Web Application experience using Java servlets, jQuery, Angular, API"]
        },
        "education": [
            {"where": "DeVry Institute of Technology", "what": "Bachelor's Degree, Computer Information Systems", "when": "1990 - 1994"}
        ]
    };

    it('should create one resume entry', (done) => {
        request.post({
            url: requestURL, 
            form: message
        }, (err, res, body) => {
            expect(res.statusCode).toEqual(200);
            request.get(requestURL+id, (err, res) => {
                expect(JSON.parse(res.body).length).toEqual(1);
                done();
            })
        })
    });

    it('should update one resume entry', (done) => {
        message.name = "Rodney C Rear";
        request.post({
            url: requestURL, 
            form: message
        }, (err, res, body) => {
            expect(res.statusCode).toEqual(200);
            request.get(requestURL+id, (err, res) => {
                var content = JSON.parse(res.body);
                expect(content.length).toEqual(1);
                expect(content[0].name).toBe(message.name);
                done();
            })
        })
    });
    
    afterAll((done) => {
        request.delete(requestURL+id, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
            request.get(requestURL+id, (err, res) => {
                var content = JSON.parse(res.body);
                expect(content.length).toEqual(0);
                done();
            })
        })
    });
});
