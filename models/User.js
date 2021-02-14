const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname: {
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
    route: {
        type: String,
        required: true
    },
    elo:{
        type:String,
        required: true
    },
    team:{
        type: mongoose.Types.ObjectId,
        ref: "team"
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "department"
    },
    status: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: Date,
        default: new Date()
    },
    lastUpdateTime: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model('User', UserSchema);