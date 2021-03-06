const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
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


module.exports = mongoose.model('Team', TeamSchema);