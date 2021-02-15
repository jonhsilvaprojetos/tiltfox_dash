const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipationSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    confimation: {
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


module.exports = mongoose.model('Participation', ParticipationSchema);