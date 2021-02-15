const Game = require("../models/Game");
const Team = require("../models/Team");

module.exports = {

    async list(req, res){
        let teamList = await Team.find().populate("game");
        res.json(teamList);
    },
    
    async create(req, res){
        let teamName = req.body.name;
        let gameName = req.body.game;
        let findGame = await Game.findOne({name: gameName});
        let teamVerify = await Team.find({name: teamName});

        if(teamVerify.length > 0){
            res.json({msg: "Já existe um time com este nome"});
        }

        let saveTeam = await Team.create({name: teamName, game: findGame._id});
        res.json(saveTeam);
    },

    async update(req, res){
        let teamId = req.params.id;
        let teamName = req.body.name;
        let gameName = req.body.game;
        let findGame = await Game.findOne({name: gameName});

        let updateTeam = await Team.findOneAndUpdate({_id: teamId}, {name: teamName, game: findGame._id});

        res.json(updateTeam);
    },

    async delete(req, res){
        let teamId = req.params.id;
        let teamDelete = await Team.findOneAndDelete({_id: teamId});

        res.json(teamDelete);
    }
}