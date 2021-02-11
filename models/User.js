const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    access_level: {
        type: Number,
        default: 1
    },
    createdTime: {
        type: Date,
        default: Date.now()
    },
    lastUpdateTime: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('User', UserSchema);