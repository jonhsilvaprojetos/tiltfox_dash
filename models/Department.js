const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    access: {
        type: Object,
        default: {
            home: true,
            events: true,
            createEvent: false,
            players: true,
            updatePlayer: false,
            createPlayer: false,
            teams: true,
            createTeam: false,
            game: false,
            createGame: false,
        }
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


module.exports = mongoose.model('Department', DepartmentSchema);