const Player = require("../models/User");
const Team = require("../models/Team");
const Department = require("../models/Department");
const Score = require("../models/Score");

module.exports = {

    async list(req, res){
        let playerList = await Player.find().populate(["team", "department", "score"]);
        res.json(playerList);
    },

    async details(req, res){
        let playerId = req.params.id;

        let findPlayer = await Player.find({_id: playerId});

        res.json(findPlayer);
    },

    async changeStatus(req, res){
        let playerId = req.params.id;
        let status = req.body.status;

        if(status == 1){
            let changeStatus = await Player.find({_id: playerId}, {status: 1});
            res.json(changeStatus);
        }
        
        let changeStatus = await Player.find({_id: playerId}, {status: 0});
        res.json(changeStatus);
    },

    async update(req, res){
        let playerId = req.params.id;
        let {nickname, email, route, elo, team, department, status} = req.body;
        let findTeam = await Team.findOne({name: team});
        let findDepartment = await Department.findOne({name: department});

        let updatePlayer = await Player.findOneAndUpdate({_id: playerId}, {nickname, email, route, elo, team: findTeam._id, department: findDepartment._id, status});

        res.json(updatePlayer);
    },

    async delete(req, res){
        let playerId = req.params.id;
        let playerDelete = await Player.findOneAndDelete({_id: playerId});

        res.json(playerDelete);
    }
}