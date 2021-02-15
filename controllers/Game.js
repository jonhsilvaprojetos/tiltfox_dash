const Game = require("../models/Game");

module.exports = {

    async list(req, res){
        let games = await Game.find({});
        res.json(games);
    },
    
    async create(req, res){
        let gameName = req.body.name;
        let gameVerify = await Game.find({name: gameName});

        if(gameVerify.length > 0){
            res.json({msg: "Já existe um game com este nome"});
        }

        let saveGame = await Game.create({name: gameName});
        res.json(saveGame);
    },

    async update(req, res){
        let gameId = req.params.id;
        let gameName = req.body.name;

        let updateGame = await Game.findOneAndUpdate({_id: gameId}, {name: gameName});

        res.json(updateGame);
    },

    async delete(req, res){
        let gameId = req.params.id;
        let gameDelete = await Game.findOneAndDelete({_id: gameId});

        res.json(gameDelete);
    }
}