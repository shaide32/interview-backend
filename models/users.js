const mongoose = require('mongoose');

const Publications = require('./publications');
const { Schema } = mongoose;

const Users = new Schema({
    firstName: String,
    publications:  [{ type: Schema.Types.ObjectId, ref: 'Publications' }],
    lastName: String,
    email: String
});

module.exports = mongoose.model('Users', Users);
