const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeEvent: {
        type: String,
        required: true
    },
    dateEvent:{
        type: Date,
        required: true,
    },
    team:{
        type: mongoose.Types.ObjectId,
        ref: "team"
    },
    linkEvent:{
        type: String,
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


module.exports = mongoose.model('Event', EventSchema);