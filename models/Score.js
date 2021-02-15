const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    point: {
        type: Number,
    },
    typeScore: {
        type: String
    },
    comments:{
        type:String
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


module.exports = mongoose.model('Score', ScoreSchema);