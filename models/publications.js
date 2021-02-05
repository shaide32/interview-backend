const mongoose = require('mongoose');
const { Schema } = mongoose;

const Publications = new Schema({
    title: String,
    year: String
});

module.exports = mongoose.model('Publications', Publications);