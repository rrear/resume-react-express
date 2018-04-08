const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    "id": String,
    name: String,
    "title": String,
    "email": String,
    "summary": { 
        "intro": String,
        "points": [ String ]
    },
    "education": [
        { "where": String, 
        "what": String, 
        "when": String }
    ],
    "experience": [
        { "what": String, 
        "where": String, 
        "when": String, 
        "how": String, 
        "points": [ String ] 
        }
    ]
});

module.exports = ResumeSchema;
