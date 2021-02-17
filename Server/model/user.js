const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
    farmerID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

mongoose.model('user', UserSchema);

exports.user = UserSchema;