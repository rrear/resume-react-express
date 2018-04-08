const mongoose = require('mongoose');

const LogIPSchema = new mongoose.Schema({
    "id": String,
    "count": Number
});

module.exports = LogIPSchema;
